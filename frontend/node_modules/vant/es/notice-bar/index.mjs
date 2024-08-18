import { withInstall } from "../utils/index.mjs";
import _NoticeBar from "./NoticeBar.mjs";
const NoticeBar = withInstall(_NoticeBar);
var stdin_default = NoticeBar;
import { noticeBarProps } from "./NoticeBar.mjs";
export {
  NoticeBar,
  stdin_default as default,
  noticeBarProps
};
