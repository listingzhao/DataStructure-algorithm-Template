/**
 * LRU 缓存机制（Medium）
 * @param {number} capacity
 */
 var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  let value = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, value);
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  console.log(this.cache)
  if (this.cache.has(key)) {
      this.cache.delete(key);
  } else {
      if (this.cache.size >= this.capacity) {        // Map 中新 set 的元素会放在后面        
          console.log(this.cache.keys())
          let firstKey = this.cache.keys().next();
          this.cache.delete(firstKey.value);
      }
  }
  this.cache.set(key, value);
};

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/


/**
 * 子域名访问计数（Easy）
 * @param {string[]} cpdomains
 * @return {string[]}
 */
 var subdomainVisits = function (cpdomains) {
  const copy = [...cpdomains.map(x => x.split(' ')).reduce((map, arrs) => {
      const times = +arrs[0];//当前域名的访问次数  900
      const domains = arrs[1].split('.')
      while (domains.length > 0) {
          const domain = domains.join('.')
          map.set(domain, (map.get(domain) ?? 0) + times)
          domains.shift(); // 移除最低级域名
      }
      return map;
  }, new Map())];
  const arr = copy.map((item) => item[1] + ' ' + item[0])
  return arr;

};

/**
 * 数组的度（Easy）
 * @param {number[]} nums
 * @return {number}
 */
 var findShortestSubArray = function (nums) {
  // 时间复杂度On 空间复杂度On
  const mp = {};

  for (const [i, num] of nums.entries()) {
      if (num in mp) {
          mp[num][0]++;
          mp[num][2] = i;
      } else {
          mp[num] = [1, i, i];
      }
  }

  let maxNum = 0, minLen = 0;
  for (const [count, left, right] of Object.values(mp)) {
      if (maxNum < count) {
          maxNum = count;
          minLen = right - left + 1;
      } else if (maxNum === count) {
          if (minLen > (right - left + 1)) {
              minLen = right - left + 1;
          }
      }
  }
  return minLen;
};