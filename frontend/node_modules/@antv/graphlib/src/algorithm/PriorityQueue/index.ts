// A PriorityQueue is a queue that can be sorted by priority.
export default class PriorityQueue<T = string> {
  /**
   * @description The internal data structure.
   * @description.zh-CN 内部数据结构。
   */
  private arr: { key: T; priority: number }[] = [];

  /**
   * @description the index indiced by the key.
   * @description.zh-CN 通过 key 找到的索引。
   */
  private keyIndice = new Map<T, number>();

  /**
   * @description The number of elements in the queue.
   * @description.zh-CN 队列中元素的数量。
   */
  size = () => this.arr.length;

  /**
   * @description all the keys in the queue.
   * @description.zh-CN 队列中所有的 key。
   */
  keys = () => this.arr.map((e) => e.key);

  /**
   * @description does the queue contain the key?
   * @description.zh-CN 队列中是否包含 key？
   * @param key
   * @returns
   */
  has = (key: T) => this.keyIndice.has(key);

  /**
   * @description get the priority of the key.
   * @description.zh-CN 获取 key 的优先级。
   * @param key
   * @returns
   */
  priority = (key: T) => {
    const index = this.keyIndice.get(key);

    if (index !== undefined) {
      return this.arr[index].priority;
    }
  };

  /**
   * @description swap the index of two keys.
   * @description.zh-CN 交换两个 key 的索引。
   * @param i
   * @param j
   */
  private swap = (i: number, j: number) => {
    const { arr, keyIndice } = this;
    const [originI, originJ] = [arr[i], arr[j]];
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
  private innerDecrease = (index: number) => {
    const { arr } = this;
    const priority = arr[index].priority;
    let parent;
    let i = index;

    while (i !== 0) {
      parent = i >> 1;
      if (arr[parent]?.priority < priority) {
        break;
      }
      this.swap(i, parent);
      i = parent;
    }
  };

  /**
   * @description create heap from the array by index
   * @description.zh-CN 通过索引创建堆。
   * @param i
   */
  private heapify = (i: number) => {
    const { arr } = this;
    const l = i << 1;
    const r = l + 1;
    let largest = i;
    if (l < arr.length) {
      largest = arr[l].priority < arr[largest].priority ? l : largest;
      if (r < arr.length) {
        largest = arr[r].priority < arr[largest].priority ? r : largest;
      }
      if (largest !== i) {
        this.swap(i, largest);
        this.heapify(largest);
      }
    }
  };

  /**
   * @description the key with min priority in the queue.
   * @description.zh-CN 队列中优先级最小的 key。
   * @returns
   */
  min = () => {
    if (this.size() === 0) {
      throw new Error('Queue underflow');
    }
    return this.arr[0].key;
  };

  /**
   * @description insert a key with priority.
   * @description.zh-CN 用优先级插入一个 key。
   * @param key
   * @param priority
   * @returns
   */
  add = (key: T, priority: number) => {
    const { keyIndice, arr } = this;

    // if the key is already in the queue, update the priority
    if (!keyIndice.has(key)) {
      const index = arr.length;
      keyIndice.set(key, index);
      arr.push({
        key,
        priority,
      });
      this.innerDecrease(index);
      return true;
    }

    return false;
  };

  /**
   * @description remove the key with min priority and return the key.
   * @description.zh-CN 删除优先级最小的 key，并返回 key。
   * @returns
   */
  removeMin = () => {
    this.swap(0, this.arr.length - 1);
    const min = this.arr.pop()!;
    this.keyIndice.delete(min.key);
    this.heapify(0);
    return min.key;
  };

  /**
   * @description decrease the priority of the key.
   * @description.zh-CN 通过 key 减小 key 的优先级。
   * @param key
   * @param priority
   */
  decrease = (key: T, priority: number) => {
    if (!this.has(key)) {
      throw new Error(`There's no key named ${key}`);
    }
    // there must be an index
    const index = this.keyIndice.get(key)!;
    if (priority > this.arr[index].priority) {
      throw new Error(
        `New priority is greater than current priority.Key: ${key} Old: + ${this.arr[index].priority} New: ${priority}`,
      );
    }
    this.arr[index].priority = priority;
    this.innerDecrease(index);
  };
}
