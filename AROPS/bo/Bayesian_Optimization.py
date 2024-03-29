from __future__ import annotations
import numpy as np
from botorch.models import SingleTaskGP
from botorch.fit import fit_gpytorch_model
from gpytorch.mlls import ExactMarginalLogLikelihood
from botorch.acquisition import ExpectedImprovement, qExpectedImprovement, ProbabilityOfImprovement
from botorch.optim import optimize_acqf_mixed, optimize_acqf
from botorch.acquisition.objective import ScalarizedObjective
from botorch.sampling.samplers import SobolQMCNormalSampler
from torch.distributions import Normal
from bo.Kernel import MixedSingleTaskGP
from sklearn.metrics import r2_score
from botorch.models import ModelListGP
from botorch.acquisition.multi_objective.monte_carlo import qExpectedHypervolumeImprovement
from itertools import combinations
from typing import Callable, List, Optional, Union
import torch
from botorch.acquisition.multi_objective.objective import MCMultiOutputObjective
from botorch.models.model import Model
from botorch.sampling.samplers import MCSampler
from botorch.utils.multi_objective.box_decompositions.non_dominated import NondominatedPartitioning
from botorch.utils.objective import apply_constraints_nonnegative_soft
from botorch.utils.torch import BufferDict
from botorch.utils.transforms import (
    concatenate_pending_points,
    t_batch_mode_transform,
)
from torch import Tensor
from botorch.acquisition.multi_objective.monte_carlo import MultiObjectiveMCAcquisitionFunction


class Bo:
    def __init__(self, space, train_x, train_y, n_goal, ref_point, num_samples: int = 2048,
                 seed: Optional[int] = None):
        self.space = space
        self.train_x = train_x
        self.train_y = train_y
        self.n_goal = n_goal
        self.ref_point = ref_point
        self.x_dim = train_x.size()[1]
        self.x_dim = train_x.size()[1]
        if not space.is_real:
            cat_index = []
            n_real = 0
            for j, i in enumerate(space.dimensions):
                para_type = str(type(i)).split('.')[-1][0:-2]
                if para_type == 'Categorical':
                    cat_index.append([j, len(i.bounds)])
                elif para_type == 'Real':
                    n_real += 1
            n_cat = n_real
            for i in cat_index:
                n_cat += i[1]
            cat_mat = np.eye(cat_index[0][1])
            if len(cat_index) > 1:
                for i in cat_index[1:]:
                    cat_mat_temp = np.ones((cat_mat.shape[0] * i[1], cat_mat.shape[1] + i[1]))
                    for k, j in enumerate(cat_mat):
                        cat_mat_temp[k * i[1]: (k + 1) * i[1], :] = np.hstack(
                            (np.repeat(np.array([j]), repeats=i[1], axis=0), np.eye(i[1])))
                    cat_mat = cat_mat_temp
            self.fixed_features_list = []
            for m in cat_mat:
                cat_dict = {}
                for o, n in enumerate(range(n_real, n_cat)):
                    cat_dict[n] = m[o]
                self.fixed_features_list.append(cat_dict)
            self.n_real = n_real
            self.n_cat = n_cat
        self.sampler = SobolQMCNormalSampler(num_samples, seed=seed)
        self.bounds = torch.stack([torch.zeros(self.x_dim), torch.ones(self.x_dim)])
        if self.ref_point:
            self.partitioning = NondominatedPartitioning(
                ref_point=self.ref_point,
                Y=self.train_y)

    def fit_gp(self):
        if self.n_goal == 1:
            if self.space.is_categorical:
                length = 3.0
                sign = -1
                i = 0
                while 1:
                    if 0 < length < 6:
                        length += i * sign * 0.5
                        sign = sign * -1
                    else:
                        length = (i + 1) * 0.5
                    self.gp = MixedSingleTaskGP(self.train_x, self.train_y,
                                                cat_dims=list(range(self.n_real, self.n_cat)), prior_l=length)
                    mll = ExactMarginalLogLikelihood(self.gp.likelihood, self.gp)
                    fit_gpytorch_model(mll)
                    mean = self.gp(self.train_x).mean
                    train_y_n = self.train_y.detach().numpy().flatten()
                    mean = mean.detach().numpy()
                    loss = r2_score(train_y_n, mean)
                    i += 1
                    if loss > 0.999 or length >= 15:
                        break
            elif self.space.is_real:
                self.gp = SingleTaskGP(self.train_x, self.train_y)
                mll = ExactMarginalLogLikelihood(self.gp.likelihood, self.gp)
                fit_gpytorch_model(mll)
            else:
                self.gp = MixedSingleTaskGP(self.train_x, self.train_y, cat_dims=list(range(self.n_real, self.n_cat)))
                mll = ExactMarginalLogLikelihood(self.gp.likelihood, self.gp)
                fit_gpytorch_model(mll)
        else:
            individual_models = []
            for i in range(self.n_goal):
                train_y_i = self.train_y[:, i].unsqueeze(1)
                gp_i = MixedSingleTaskGP(self.train_x, train_y_i, cat_dims=list(range(self.n_real, self.n_cat)))
                mll_i = ExactMarginalLogLikelihood(gp_i.likelihood, gp_i)
                fit_gpytorch_model(mll_i)
                individual_models.append(gp_i)
            self.gp = ModelListGP(*individual_models)
        return self.gp

    def pi(self):
        if self.n_goal == 1:
            PI = ProbabilityOfImprovementXi(self.gp, best_f=torch.max(self.train_y), maximize=True)
        else:
            PI = ProbabilityHypervolumeImprovement(model=self.gp,
                                                   ref_point=self.ref_point,  # use known reference point
                                                   partitioning=self.partitioning, sampler=SobolQMCNormalSampler(2**14))#self.sampler)
        return PI

    def ei(self):
        if self.n_goal == 1:
            EI = ExpectedImprovement(self.gp, best_f=torch.max(self.train_y), maximize=True)
        else:
            EI = qExpectedHypervolumeImprovement(
                model=self.gp,
                ref_point=self.ref_point,  # use known reference point
                partitioning=self.partitioning, sampler=self.sampler)
        return EI

    def hv(self):
        return self.partitioning.compute_hypervolume()

    def pareto(self):
        return self.partitioning.pareto_Y

    def get_next_exps(self, q):
        PI = Bo.pi(self)
        if self.n_goal == 1:
            qEI = qExpectedImprovement(self.gp, best_f=torch.max(self.train_y), sampler=self.sampler)

        else:
            qEI = Bo.ei(self)
        if not self.space.is_real:
            input = [qEI, self.bounds, q, self.fixed_features_list]
            import pickle
            f = open('input.pkl', 'wb')
            pickle.dump(input, f)
            f.close()
            candidate, acq_value = optimize_acqf_mixed(
                qEI, bounds=self.bounds, q=q, fixed_features_list=self.fixed_features_list, num_restarts=20,
                raw_samples=200)

        else:
            candidate, acq_value = optimize_acqf(qEI, bounds=self.bounds, q=q, num_restarts=20, raw_samples=200)
        qei = []
        qpi = []
        for i in candidate:
            qei.append(qEI(i.resize(1, self.x_dim)))
        qei = torch.tensor(qei)
        candidate_sort = torch.ones((q, self.train_x.size()[1]))
        qei_sort = torch.argsort(-qei)
        for i, j in enumerate(qei_sort):
            candidate_sort[i, :] = candidate[j, :]
        for j, i in enumerate(candidate_sort):
            qpi.append(PI(i.resize(1, self.x_dim)))
        qpi = torch.tensor(qpi)
        print('ei', qei)
        return candidate_sort, qpi


# Rewrite the ProbabilityOfImprovement class in botorch to add the Xi parameter
class ProbabilityOfImprovementXi(ProbabilityOfImprovement):

    def __init__(
            self,
            model: Model,
            best_f: Union[float, Tensor],
            objective: Optional[ScalarizedObjective] = None,
            maximize: bool = True,
    ) -> None:

        super().__init__(model=model, best_f=best_f, objective=objective, maximize=maximize)
        self.maximize = maximize
        if not torch.is_tensor(best_f):
            best_f = torch.tensor(best_f)
        self.register_buffer("best_f", best_f)

    @t_batch_mode_transform(expected_q=1)
    def forward(self, X: Tensor) -> Tensor:
        self.best_f = self.best_f.to(X)
        posterior = self._get_posterior(X=X)
        mean, sigma = posterior.mean, posterior.variance.sqrt()
        batch_shape = X.shape[:-2]
        mean = posterior.mean.view(batch_shape)
        sigma = posterior.variance.sqrt().clamp_min(1e-9).view(batch_shape)
        u = mean - self.best_f.expand_as(mean)
        xi = self.best_f / 20
        if not self.maximize:
            u = -u
        u = (u - xi) / sigma
        normal = Normal(torch.zeros_like(u), torch.ones_like(u))
        return normal.cdf(u)


class ProbabilityHypervolumeImprovement(MultiObjectiveMCAcquisitionFunction):
    def __init__(
            self,
            model: Model,
            ref_point: Union[List[float], Tensor],
            partitioning: NondominatedPartitioning,
            sampler: Optional[MCSampler] = None,
            objective: Optional[MCMultiOutputObjective] = None,
            constraints: Optional[List[Callable[[Tensor], Tensor]]] = None,
            X_pending: Optional[Tensor] = None,
            eta: float = 1e-3,
    ) -> None:
        r"""
        Args:
            model: A fitted model.
            ref_point: A list or tensor with `m` elements representing the reference
                point (in the outcome space) w.r.t. to which compute the hypervolume.
                This is a reference point for the objective values (i.e. after
                applying`objective` to the samples).
            partitioning: A `NondominatedPartitioning` module that provides the non-
                dominated front and a partitioning of the non-dominated space in hyper-
                rectangles. If constraints are present, this partitioning must only
                include feasible points.
            sampler: The sampler used to draw base samples. Defaults to
                `SobolQMCNormalSampler(num_samples=128, collapse_batch_dims=True)`.
            objective: The MCMultiOutputObjective under which the samples are evaluated.
                Defaults to `IdentityMultiOutputObjective()`.
            constraints: A list of callables, each mapping a Tensor of dimension
                `sample_shape x batch-shape x q x m` to a Tensor of dimension
                `sample_shape x batch-shape x q`, where negative values imply
                feasibility. The acqusition function will compute expected feasible
                hypervolume.
            X_pending: A `batch_shape x m x d`-dim Tensor of `m` design points that have
                points that have been submitted for function evaluation but have not yet
                been evaluated. Concatenated into `X` upon forward call. Copied and set
                to have no gradient.
            eta: The temperature parameter for the sigmoid function used for the
                differentiable approximation of the constraints.
        """
        if len(ref_point) != partitioning.num_outcomes:
            raise ValueError(
                "The length of the reference point must match the number of outcomes. "
                f"Got ref_point with {len(ref_point)} elements, but expected "
                f"{partitioning.num_outcomes}."
            )
        ref_point = torch.as_tensor(
            ref_point,
            dtype=partitioning.pareto_Y.dtype,
            device=partitioning.pareto_Y.device,
        )
        super().__init__(
            model=model, sampler=sampler, objective=objective, X_pending=X_pending
        )
        self.constraints = constraints
        self.eta = eta
        self.register_buffer("ref_point", ref_point)
        cell_bounds = partitioning.get_hypercell_bounds()
        self.register_buffer("cell_lower_bounds", cell_bounds[0])
        self.register_buffer("cell_upper_bounds", cell_bounds[1])
        self.q = -1
        self.q_subset_indices = BufferDict()
        self.xi = partitioning.compute_hypervolume()/1000

    def _cache_q_subset_indices(self, q: int) -> None:
        r"""Cache indices corresponding to all subsets of `q`.

        This means that consecutive calls to `forward` with the same
        `q` will not recompute the indices for all (2^q - 1) subsets.

        Note: this will use more memory than regenerating the indices
        for each i and then deleting them, but it will be faster for
        repeated evaluations (e.g. during optimization).

        Args:
            q: batch size
        """
        if q != self.q:
            indices = list(range(q))
            tkwargs = {"dtype": torch.long, "device": self.cell_lower_bounds.device}
            self.q_subset_indices = BufferDict(
                {
                    f"q_choose_{i}": torch.tensor(
                        list(combinations(indices, i)), **tkwargs
                    )
                    for i in range(1, q + 1)
                }
            )
            self.q = q

    def _compute_qehvi(self, samples: Tensor, X: Optional[Tensor] = None) -> Tensor:
        r"""Compute the expected (feasible) hypervolume improvement given MC samples.

        Args:
            samples: A `n_samples x batch_shape x q x m`-dim tensor of samples.
            X: A `batch_shape x q x d`-dim tensor of inputs.

        Returns:
            A `batch_shape x (model_batch_shape)`-dim tensor of expected hypervolume
            improvement for each batch.
        """
        q = samples.shape[-2]
        # Note that the objective may subset the outcomes (e.g. this will usually happen
        # if there are constraints present).
        obj = self.objective(samples, X=X)
        if self.constraints is not None:
            feas_weights = torch.ones(
                obj.shape[:-1], device=obj.device, dtype=obj.dtype
            )
            feas_weights = apply_constraints_nonnegative_soft(
                obj=feas_weights,
                constraints=self.constraints,
                samples=samples,
                eta=self.eta,
            )
        self._cache_q_subset_indices(q=q)
        batch_shape = samples.shape[:-2]
        # this is n_samples x input_batch_shape x
        areas_per_segment = torch.zeros(
            *batch_shape,
            self.cell_lower_bounds.shape[-2],
            dtype=obj.dtype,
            device=obj.device,
        )
        cell_batch_ndim = self.cell_lower_bounds.ndim - 2
        sample_batch_view_shape = torch.Size(
            [
                batch_shape[0] if cell_batch_ndim > 0 else 1,
                *[1 for _ in range(len(batch_shape) - max(cell_batch_ndim, 1))],
                *self.cell_lower_bounds.shape[1:-2],
            ]
        )
        view_shape = (
            *sample_batch_view_shape,
            self.cell_upper_bounds.shape[-2],
            1,
            self.cell_upper_bounds.shape[-1],
        )
        for i in range(1, q + 1):
            # TODO: we could use batches to compute (q choose i) and (q choose q-i)
            # simulataneously since subsets of size i and q-i have the same number of
            # elements. This would decrease the number of iterations, but increase
            # memory usage.
            q_choose_i = self.q_subset_indices[f"q_choose_{i}"]
            # this tensor is mc_samples x batch_shape x i x q_choose_i x m
            obj_subsets = obj.index_select(dim=-2, index=q_choose_i.view(-1))
            obj_subsets = obj_subsets.view(
                obj.shape[:-2] + q_choose_i.shape + obj.shape[-1:]
            )
            # since all hyperrectangles share one vertex, the opposite vertex of the
            # overlap is given by the component-wise minimum.
            # take the minimum in each subset
            overlap_vertices = obj_subsets.min(dim=-2).values
            # add batch-dim to compute area for each segment (pseudo-pareto-vertex)
            # this tensor is mc_samples x batch_shape x num_cells x q_choose_i x m
            overlap_vertices = torch.min(
                overlap_vertices.unsqueeze(-3), self.cell_upper_bounds.view(view_shape)
            )
            # substract cell lower bounds, clamp min at zero
            lengths_i = (
                    overlap_vertices - self.cell_lower_bounds.view(view_shape)
            ).clamp_min(0.0)
            # take product over hyperrectangle side lengths to compute area
            # sum over all subsets of size i
            areas_i = lengths_i.prod(dim=-1)
            # if constraints are present, apply a differentiable approximation of
            # the indicator function
            if self.constraints is not None:
                feas_subsets = feas_weights.index_select(
                    dim=-1, index=q_choose_i.view(-1)
                ).view(feas_weights.shape[:-1] + q_choose_i.shape)
                areas_i = areas_i * feas_subsets.unsqueeze(-3).prod(dim=-1)
            areas_i = areas_i.sum(dim=-1)
            # Using the inclusion-exclusion principle, set the sign to be positive
            # for subsets of odd sizes and negative for subsets of even size
            areas_per_segment += (-1) ** (i + 1) * areas_i
        # sum over segments and average over MC samples
        return areas_per_segment.sum(dim=-1)  # compute the HVI for each MC sample

    @concatenate_pending_points
    @t_batch_mode_transform()
    def forward(self, X: Tensor) -> Tensor:
        posterior = self.model.posterior(X)
        samples = self.sampler(posterior)
        hvi_per_sample = self._compute_qehvi(samples=samples)  # compute the HVI for each MC sample
        n_sample = hvi_per_sample.size()[0]  # the number of MC sample
        hvi_per_sample = torch.tensor(hvi_per_sample - self.xi).clamp_min(0)  # filter the tiny positive HVI
        sample_impr = torch.nonzero(hvi_per_sample).size()[0]
        # the proportion greater than a tiny number (xi) in the HVI for MC samples
        return torch.tensor(sample_impr / n_sample)
