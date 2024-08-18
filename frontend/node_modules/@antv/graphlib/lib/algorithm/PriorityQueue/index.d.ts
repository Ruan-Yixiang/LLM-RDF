export default class PriorityQueue<T = string> {
    /**
     * @description The internal data structure.
     * @description.zh-CN 内部数据结构。
     */
    private arr;
    /**
     * @description the index indiced by the key.
     * @description.zh-CN 通过 key 找到的索引。
     */
    private keyIndice;
    /**
     * @description The number of elements in the queue.
     * @description.zh-CN 队列中元素的数量。
     */
    size: () => number;
    /**
     * @description all the keys in the queue.
     * @description.zh-CN 队列中所有的 key。
     */
    keys: () => T[];
    /**
     * @description does the queue contain the key?
     * @description.zh-CN 队列中是否包含 key？
     * @param key
     * @returns
     */
    has: (key: T) => boolean;
    /**
     * @description get the priority of the key.
     * @description.zh-CN 获取 key 的优先级。
     * @param key
     * @returns
     */
    priority: (key: T) => number | undefined;
    /**
     * @description swap the index of two keys.
     * @description.zh-CN 交换两个 key 的索引。
     * @param i
     * @param j
     */
    private swap;
    /**
     * @description decrease the priority of the key by index
     * @description.zh-CN 通过索引减小 key 的优先级。
     * @param index
     */
    private innerDecrease;
    /**
     * @description create heap from the array by index
     * @description.zh-CN 通过索引创建堆。
     * @param i
     */
    private heapify;
    /**
     * @description the key with min priority in the queue.
     * @description.zh-CN 队列中优先级最小的 key。
     * @returns
     */
    min: () => T;
    /**
     * @description insert a key with priority.
     * @description.zh-CN 用优先级插入一个 key。
     * @param key
     * @param priority
     * @returns
     */
    add: (key: T, priority: number) => boolean;
    /**
     * @description remove the key with min priority and return the key.
     * @description.zh-CN 删除优先级最小的 key，并返回 key。
     * @returns
     */
    removeMin: () => T;
    /**
     * @description decrease the priority of the key.
     * @description.zh-CN 通过 key 减小 key 的优先级。
     * @param key
     * @param priority
     */
    decrease: (key: T, priority: number) => void;
}
