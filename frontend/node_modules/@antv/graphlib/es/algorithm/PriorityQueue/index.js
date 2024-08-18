function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A PriorityQueue is a queue that can be sorted by priority.
var PriorityQueue = /*#__PURE__*/_createClass(function PriorityQueue() {
  var _this = this;

  _classCallCheck(this, PriorityQueue);

  this.arr = [];
  this.keyIndice = new Map();

  this.size = function () {
    return _this.arr.length;
  };

  this.keys = function () {
    return _this.arr.map(function (e) {
      return e.key;
    });
  };

  this.has = function (key) {
    return _this.keyIndice.has(key);
  };

  this.priority = function (key) {
    var index = _this.keyIndice.get(key);

    if (index !== undefined) {
      return _this.arr[index].priority;
    }
  };

  this.swap = function (i, j) {
    var arr = _this.arr,
        keyIndice = _this.keyIndice;
    var _ref = [arr[i], arr[j]],
        originI = _ref[0],
        originJ = _ref[1];
    arr[i] = originJ;
    arr[j] = originI;
    keyIndice.set(originI.key, j);
    keyIndice.set(originJ.key, i);
  };

  this.innerDecrease = function (index) {
    var arr = _this.arr;
    var priority = arr[index].priority;
    var parent;
    var i = index;

    while (i !== 0) {
      var _arr$parent;

      parent = i >> 1;

      if (((_arr$parent = arr[parent]) === null || _arr$parent === void 0 ? void 0 : _arr$parent.priority) < priority) {
        break;
      }

      _this.swap(i, parent);

      i = parent;
    }
  };

  this.heapify = function (i) {
    var arr = _this.arr;
    var l = i << 1;
    var r = l + 1;
    var largest = i;

    if (l < arr.length) {
      largest = arr[l].priority < arr[largest].priority ? l : largest;

      if (r < arr.length) {
        largest = arr[r].priority < arr[largest].priority ? r : largest;
      }

      if (largest !== i) {
        _this.swap(i, largest);

        _this.heapify(largest);
      }
    }
  };

  this.min = function () {
    if (_this.size() === 0) {
      throw new Error('Queue underflow');
    }

    return _this.arr[0].key;
  };

  this.add = function (key, priority) {
    var keyIndice = _this.keyIndice,
        arr = _this.arr; // if the key is already in the queue, update the priority

    if (!keyIndice.has(key)) {
      var index = arr.length;
      keyIndice.set(key, index);
      arr.push({
        key: key,
        priority: priority
      });

      _this.innerDecrease(index);

      return true;
    }

    return false;
  };

  this.removeMin = function () {
    _this.swap(0, _this.arr.length - 1);

    var min = _this.arr.pop();

    _this.keyIndice.delete(min.key);

    _this.heapify(0);

    return min.key;
  };

  this.decrease = function (key, priority) {
    if (!_this.has(key)) {
      throw new Error("There's no key named ".concat(key));
    } // there must be an index


    var index = _this.keyIndice.get(key);

    if (priority > _this.arr[index].priority) {
      throw new Error("New priority is greater than current priority.Key: ".concat(key, " Old: + ").concat(_this.arr[index].priority, " New: ").concat(priority));
    }

    _this.arr[index].priority = priority;

    _this.innerDecrease(index);
  };
});

export { PriorityQueue as default };