"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A PriorityQueue is a queue that can be sorted by priority.
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        var _this = this;
        /**
         * @description The internal data structure.
         * @description.zh-CN 内部数据结构。
         */
        this.arr = [];
        /**
         * @description the index indiced by the key.
         * @description.zh-CN 通过 key 找到的索引。
         */
        this.keyIndice = new Map();
        /**
         * @description The number of elements in the queue.
         * @description.zh-CN 队列中元素的数量。
         */
        this.size = function () { return _this.arr.length; };
        /**
         * @description all the keys in the queue.
         * @description.zh-CN 队列中所有的 key。
         */
        this.keys = function () { return _this.arr.map(function (e) { return e.key; }); };
        /**
         * @description does the queue contain the key?
         * @description.zh-CN 队列中是否包含 key？
         * @param key
         * @returns
         */
        this.has = function (key) { return _this.keyIndice.has(key); };
        /**
         * @description get the priority of the key.
         * @description.zh-CN 获取 key 的优先级。
         * @param key
         * @returns
         */
        this.priority = function (key) {
            var index = _this.keyIndice.get(key);
            if (index !== undefined) {
                return _this.arr[index].priority;
            }
        };
        /**
         * @description swap the index of two keys.
         * @description.zh-CN 交换两个 key 的索引。
         * @param i
         * @param j
         */
        this.swap = function (i, j) {
            var _a = _this, arr = _a.arr, keyIndice = _a.keyIndice;
            var _b = [arr[i], arr[j]], originI = _b[0], originJ = _b[1];
            arr[i] = originJ;
            arr[j] = originI;
            keyIndice.set(originI.key, j);
            keyIndice.set(originJ.key, i);
        };
        /**
         * @description decrease the priority of the key by index
         * @description.zh-CN 通过索引减小 key 的优先级。
         * @param index
         */
        this.innerDecrease = function (index) {
            var _a;
            var arr = _this.arr;
            var priority = arr[index].priority;
            var parent;
            var i = index;
            while (i !== 0) {
                parent = i >> 1;
                if (((_a = arr[parent]) === null || _a === void 0 ? void 0 : _a.priority) < priority) {
                    break;
                }
                _this.swap(i, parent);
                i = parent;
            }
        };
        /**
         * @description create heap from the array by index
         * @description.zh-CN 通过索引创建堆。
         * @param i
         */
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
        /**
         * @description the key with min priority in the queue.
         * @description.zh-CN 队列中优先级最小的 key。
         * @returns
         */
        this.min = function () {
            if (_this.size() === 0) {
                throw new Error('Queue underflow');
            }
            return _this.arr[0].key;
        };
        /**
         * @description insert a key with priority.
         * @description.zh-CN 用优先级插入一个 key。
         * @param key
         * @param priority
         * @returns
         */
        this.add = function (key, priority) {
            var _a = _this, keyIndice = _a.keyIndice, arr = _a.arr;
            // if the key is already in the queue, update the priority
            if (!keyIndice.has(key)) {
                var index = arr.length;
                keyIndice.set(key, index);
                arr.push({
                    key: key,
                    priority: priority,
                });
                _this.innerDecrease(index);
                return true;
            }
            return false;
        };
        /**
         * @description remove the key with min priority and return the key.
         * @description.zh-CN 删除优先级最小的 key，并返回 key。
         * @returns
         */
        this.removeMin = function () {
            _this.swap(0, _this.arr.length - 1);
            var min = _this.arr.pop();
            _this.keyIndice.delete(min.key);
            _this.heapify(0);
            return min.key;
        };
        /**
         * @description decrease the priority of the key.
         * @description.zh-CN 通过 key 减小 key 的优先级。
         * @param key
         * @param priority
         */
        this.decrease = function (key, priority) {
            if (!_this.has(key)) {
                throw new Error("There's no key named ".concat(key));
            }
            // there must be an index
            var index = _this.keyIndice.get(key);
            if (priority > _this.arr[index].priority) {
                throw new Error("New priority is greater than current priority.Key: ".concat(key, " Old: + ").concat(_this.arr[index].priority, " New: ").concat(priority));
            }
            _this.arr[index].priority = priority;
            _this.innerDecrease(index);
        };
    }
    return PriorityQueue;
}());
exports.default = PriorityQueue;
