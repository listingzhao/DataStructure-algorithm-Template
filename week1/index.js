/**
 * 加一（Easy）
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function (digits) {
    // 时间复杂度On
    const len = digits.length;
    for (let i = len - 1; i >= 0; i--) {
        digits[i]++;
        digits[i] %= 10;
        if (digits[i] != 0) {
            return digits;
        }
    }
    digits = [...Array(len + 1)].map(_ => 0);
    digits[0] = 1;
    return digits;
};

/**
 * 合并两个有序链表（Easy）
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function (l1, l2) {
    // 迭代法 时间复杂度O(m+n) 空间复杂度O1
    const dmy = new ListNode(-1)
    let prev = dmy
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            prev.next = l1
            l1 = l1.next
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next
    }

    // 合并以后 l1 和 l2 最多只有一个还未被合并完，直接将链表末尾指向未合并的链表
    prev.next = l1 ? l1 : l2;
    return dmy.next;

    // 递归法 时间复杂度O(m+n) 空间复杂度O(m+n)
    // if (!l1) {
    //     return l2;
    // } else if (!l2) {
    //     return l1;
    // } else if (l1.val < l2.val) {
    //     l1.next = mergeTwoLists(l1.next, l2)
    //     return l1;
    // } else {
    //     l2.next = mergeTwoLists(l1, l2.next)
    //     return l2;
    // }
};

/**
 * 和为 K 的子数组（Medium）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var subarraySum = function (nums, k) {
    // 时间复杂度On3 超时 空间复杂度O1
    let count = 0;
    // for (let i = 0; i < nums.length; i++) {
    //     for (let j = i; j < nums.length; j++) {
    //         let sum = 0;
    //         for (let q = i; q <= j; q++) {
    //             sum += nums[q]
    //         }
    //         if (sum == k)
    //             count++;
    //     }
    // }
    // 去掉内层循环，用一个变量保存上次的求和结果，每次累加当前项即可。时间复杂度On2 空间复杂度O1
    // for (let i = 0; i < nums.length; i++) {
    //     let sum = 0;
    //     for (let j = i; j < nums.length; j++) {
    //         sum += nums[j]
    //         if (sum == k)
    //             count++;
    //     }
    // }
    // 前缀和
    const map = { 0: 1 };
    let preSum = 0;
    for (let i = 0; i < nums.length; i++) {
        preSum += nums[i];

        if (map[preSum - k]) {
            count += map[preSum - k]
        }

        if (map[preSum]) {
            map[preSum]++;
        } else {
            map[preSum] = 1;
        }
        console.log(map)
    }
    return count;
};

/**
 * 设计循环双端队列（Medium）
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
 var MyCircularDeque = function (k) {
    this.capacity = k + 1;
    this.arr = new Array(this.capacity);
    // 头部指向第 1 个存放元素的位置
    // 插入时，先减，再赋值
    // 删除时，索引 +1（注意取模）
    this.front = 0;
    // 尾部指向下一个插入元素的位置
    // 插入时，先赋值，再加
    // 删除时，索引 -1（注意取模）
    this.rear = 0;
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
    if (this.isFull()) {
        return false;
    }
    this.front = (this.front - 1 + this.capacity) % this.capacity;
    this.arr[this.front] = value;
    return true;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
    if (this.isFull()) {
        return false;
    }
    this.arr[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    return true;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
    if (this.isEmpty()) {
        return false;
    }
    // front 被设计在数组的开头，所以是 +1
    this.front = (this.front + 1) % this.capacity;
    return true;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
    if (this.isEmpty()) {
        return false;
    }
    // front 被设计在数组的结尾，所以是 -1
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    return true;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.arr[this.front]
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.arr[(this.rear - 1 + this.capacity) % this.capacity]
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
    return this.front == this.rear
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
    return (this.rear + 1) % this.capacity == this.front
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */