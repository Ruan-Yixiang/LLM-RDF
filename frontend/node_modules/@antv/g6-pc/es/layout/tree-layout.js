import Hierarchy from '@antv/hierarchy';
import Util from '../util';
var radialLayout = Util.radialLayout;
var TreeLayout = /** @class */function () {
  function TreeLayout(cfg) {
    this.type = cfg.type;
    this.radial = cfg.radial;
    this.config = cfg;
  }
  TreeLayout.prototype.init = function (data) {
    var _this = this;
    this.data = data;
    if (this.radial) {
      this.layoutMethod = function (data) {
        var layoutData = Hierarchy[_this.type](data, _this.config);
        radialLayout(layoutData);
        return layoutData;
      };
      return;
    }
    this.layoutMethod = function (data) {
      return Hierarchy[_this.type](data, _this.config);
    };
  };
  TreeLayout.prototype.execute = function () {
    return this.layoutMethod(this.data, this.config);
  };
  TreeLayout.prototype.layout = function (data) {
    this.init(data);
    return this.execute();
  };
  return TreeLayout;
}();
export default TreeLayout;