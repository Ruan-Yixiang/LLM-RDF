import _SkeletonParagraph from "./SkeletonParagraph.mjs";
import { withInstall } from "../utils/index.mjs";
const SkeletonParagraph = withInstall(_SkeletonParagraph);
var stdin_default = SkeletonParagraph;
import { skeletonParagraphProps, DEFAULT_ROW_WIDTH } from "./SkeletonParagraph.mjs";
export {
  DEFAULT_ROW_WIDTH,
  SkeletonParagraph,
  stdin_default as default,
  skeletonParagraphProps
};
