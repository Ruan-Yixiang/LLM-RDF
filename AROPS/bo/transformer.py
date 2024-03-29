# Transform from origin data to one-hot encoding, and reverse transformation
import numpy as np


# Transform from origin data to one-hot encoding
def transform(x, space):
    x = space.transform(x)
    nparam = 0
    cate = []
    for j, i in enumerate(space):
        nparam += 1
        if str(i)[0:4] != 'Real':
            cate.append([i, j])
    x_trans = np.array([])
    for j in x:
        x_cate = np.array([])
        for i in cate:
            cate_encode = np.zeros(len(i[0].bounds))
            cate_encode[int(j[i[1]] * (len(i[0].bounds) - 1))] += 1
            x_cate = np.concatenate((x_cate, cate_encode))

        x_new = np.concatenate((j[0: nparam - (len(cate))], x_cate))
        x_trans = np.concatenate((x_trans, x_new))
    return x_trans.reshape(x.shape[0], int(len(x_trans) / x.shape[0]))


# Transform from one-hot encoding to origin data
def i_transform(x, space):
    nparam = 0
    cate = []
    for j, i in enumerate(space):
        nparam += 1
        if str(i)[0:4] != 'Real':
            cate.append([i, j])
    ncv = nparam - len(cate)
    x_trans = np.array([])
    for j in x:
        index0 = ncv
        index1 = ncv
        x_cate = np.array([])
        for i in cate:
            cate_encode = np.argmax(j[index0:index1 + len(i[0].bounds)]) / (len(i[0].bounds) - 1)
            cate_encode = np.array([cate_encode])
            x_cate = np.concatenate((x_cate, cate_encode))
            index1 = index1 + len(i[0].bounds)
            index0 = index0 + len(i[0].bounds)
        x_new = np.concatenate((j[0: ncv], x_cate))
        x_trans = np.concatenate((x_trans, x_new))
    return space.inverse_transform(x_trans.reshape(x.shape[0], nparam))