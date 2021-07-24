/**
 * 295. 数据流的中位数 
 *   暴力排序 时间复杂度OlogN 空间复杂度OlogN 
 */
 var MedianFinder = function () {
  this.data = []
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function (num) {
  this.data.push(num)
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function () {
  const length = this.data.length;
  if (!length) {
      return null;
  }
  this.data.sort((a, b) => a - b)

  const mid = Math.floor((length - 1) / 2)
  if (length % 2) {
      return this.data[mid]
  }
  return (this.data[mid] + this.data[mid + 1]) / 2
};

/**
 * 295. 数据流的中位数 
 * 二分查找 时间复杂度On 空间复杂度On
 */
 var MedianFinder = function () {
  this.data = []
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function (num) {
  if (!this.data.length) {
      this.data.push(num);
      return;
  }

  let left = 0,
      right = this.data.length - 1;
  while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (this.data[mid] === num) {
          this.data.splice(mid, 0, num);
          return;
      } else if (this.data[mid] < num) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }
  this.data.splice(right + 1, 0, num);
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function () {
  const length = this.data.length;
  if (!length) {
      return null;
  }

  const mid = Math.floor((length - 1) / 2)
  if (length % 2) {
      return this.data[mid]
  }
  return (this.data[mid] + this.data[mid + 1]) / 2
};

/**
 * 154. 寻找旋转排序数组中的最小值 II
 * @param {number[]} nums
 * @return {number}
 */
 var findMin = function (nums) {
  // 时间复杂度O(logn) 空间复杂度O1
  // [3, 4, 5, | 1, 2]
  // [4, 5, 6, 7,|  0, 1, 2] 
  // 左段： >nums[right]
  // 右段： <=nums[right]
  // [4, 5, 6, 7,|  0, 1, 2]
  // 题意： 找第一个<=末尾的数 难点(数组可重复) 等于情况的判断 right = right - 1
  let left = 0, right = nums.length - 1
  while (left < right) {
      let mid = (left + right) >> 1;
      if (nums[mid] < nums[right]) right = mid;
      else if (nums[mid] > nums[right]) left = mid + 1
      else right = right - 1   // 重复情况
  }
  return nums[left]
};