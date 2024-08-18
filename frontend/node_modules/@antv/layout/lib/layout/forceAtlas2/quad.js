"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quad = /** @class */ (function () {
    function Quad(params) {
        /**
         * the center position of this quad
         * @type  {number}
         */
        this.xmid = params.xmid;
        /**
         * the center position of this quad
         * @type  {number}
         */
        this.ymid = params.ymid;
        /**
         * the length of this quad
         * @type  {number}
         */
        this.length = params.length;
        /**
         * the mass center of this quad
         * @type  {number}
         */
        this.massCenter = params.massCenter || [0, 0];
        /**
         * the mass of this quad
         * @type  {number}
         */
        this.mass = params.mass || 1;
    }
    Quad.prototype.getLength = function () {
        return this.length;
    };
    Quad.prototype.contains = function (x, y) {
        var halfLen = this.length / 2;
        return (x <= this.xmid + halfLen &&
            x >= this.xmid - halfLen &&
            y <= this.ymid + halfLen &&
            y >= this.ymid - halfLen);
    };
    // northwest quadrant
    // tslint:disable-next-line
    Quad.prototype.NW = function () {
        var x = this.xmid - this.length / 4;
        var y = this.ymid + this.length / 4;
        var len = this.length / 2;
        var params = {
            xmid: x,
            ymid: y,
            length: len
        };
        var NW = new Quad(params);
        return NW;
    };
    // northeast
    // tslint:disable-next-line
    Quad.prototype.NE = function () {
        var x = this.xmid + this.length / 4;
        var y = this.ymid + this.length / 4;
        var len = this.length / 2;
        var params = {
            xmid: x,
            ymid: y,
            length: len
        };
        var NE = new Quad(params);
        return NE;
    };
    // southwest
    // tslint:disable-next-line
    Quad.prototype.SW = function () {
        var x = this.xmid - this.length / 4;
        var y = this.ymid - this.length / 4;
        var len = this.length / 2;
        var params = {
            xmid: x,
            ymid: y,
            length: len
        };
        var SW = new Quad(params);
        return SW;
    };
    // southeast
    // tslint:disable-next-line
    Quad.prototype.SE = function () {
        var x = this.xmid + this.length / 4;
        var y = this.ymid - this.length / 4;
        var len = this.length / 2;
        var params = {
            xmid: x,
            ymid: y,
            length: len
        };
        var SE = new Quad(params);
        return SE;
    };
    return Quad;
}());
exports.default = Quad;
//# sourceMappingURL=quad.js.map