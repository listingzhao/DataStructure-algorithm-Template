/**
 * 709. 转换成小写字母
 * @param {string} s
 * @return {string}
 */
 var toLowerCase = function (s) {
  // 正则表达式
  return s.replace(/[A-Z]/g, (item) => String.fromCharCode(item.charCodeAt() + 32))
};

/**
 * 58. 最后一个单词的长度
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function (s) {
  let end = s.length - 1;
  while (end >= 0 && s[end] == ' ') end--;
  if (end < 0) return 0;
  let start = end;
  while (start >= 0 && s[start] != ' ') start--;
  return end - start;
};

/**
 * 771. 宝石与石头
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
 var numJewelsInStones = function (jewels, stones) {
  // 朴素时间复杂度Omn 空间复杂度O1
  // jewels = jewels.split('');
  // return stones.split('').reduce((prev, val) => {
  //     for (let char of jewels) {
  //         if (char === val) {
  //             return prev + 1;
  //         }
  //     }
  //     return prev;
  // }, 0)
  // hash表降低复杂度Om+n 空间复杂度Om
  const jewelSet = new Set(jewels.split(''))
  return stones.split('').reduce((prev, val) => {
      return prev + jewelSet.has(val)
  }, 0)
};

/**
 * 387. 字符串中的第一个唯一字符
 * @param {string} s
 * @return {number}
 */
 var firstUniqChar = function (s) {
  // 哈希表 时间复杂度On 空间复杂度O1
  const dic = new Map();
  for (let i = 0; i < s.length; i++) {
      if (dic.get(s[i]) > 0) {
          dic.set(s[i], dic.get(s[i]) + 1);
      } else {
          dic.set(s[i], 1);
      }
  }
  for ([k, v] of dic) {
      if (v == 1) {
          return s.indexOf(k);
      }
  }
  return -1;
};

/**
 * 14. 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function (strs) {
  // 时间复杂度Omn 空间复杂度O1
  let ans = strs[0]
  for (let i = 1; i < strs.length; i++) {
      let j = 0;
      for (; j < ans.length && j < strs[i].length; j++) {
          if (ans[j] != strs[i][j]) break;
      }
      ans = ans.substr(0, j)
      if (ans == '') return ans;
  }
  return ans;
};

/**
 * 344. 反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
 var reverseString = function (s) {
  // 双指针法 On 空间复杂度O1
  const n = s.length;
  for (let l = 0, r = n - 1; l < r; l++, r--) {
      [s[l], s[r]] = [s[r], s[l]]
  }
};

/**
 * 151. 翻转字符串里的单词
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
  // return s.trim().split(/\s+/).reverse().join(' ')
  // 去除空白
  // 顺序单个处理单词
  let l = 0, r = s.length - 1;
  while (l <= r && s[l] == ' ') l++;
  while (l <= r && s[r] == ' ') r--;
  const d = []
  let word = ''
  while (l <= r) {
      let c = s[l]
      if (word && c == ' ') {
          d.unshift(word)
          word = ''
      } else if (c != ' ') {
          word += c;
      }
      l++;
  }
  d.unshift(word)
  return d.join(' ')
};

/**
 * 917. 仅仅反转字母
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function (s) {
  // 正则表达式法 时间复杂度On 空间复杂度On
  // let arr = s.match(/[a-zA-Z]/g)
  // console.log(arr)
  // if (arr == null) return s;
  // return s.replace(/[a-zA-Z]/g, () => arr.pop())

  // 双指针 时间复杂度On 空间复杂度O1
  const arr = s.split('')
  const reg = /[^a-zA-Z]/;
  let l = 0, r = arr.length - 1;
  while (l < r) {
      if (reg.test(arr[r])) {
          r--;
      } else if (reg.test(arr[l])) {
          l++;
      } else {
          [arr[l], arr[r]] = [arr[r], arr[l]]
          l++;
          r--;
      }
  }
  return arr.join('')
};

/**
 * 205. 同构字符串
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isIsomorphic = function (s, t) {
  // 时间复杂度On 空间复杂度O字符集大小
  const maps = new Map();
  const mapt = new Map();
  for (let i = 0; i < s.length; i++) {
      if (!maps.has(s[i]))
          maps.set(s[i], t[i])
      if (!mapt.has(t[i]))
          mapt.set(t[i], s[i])
      if (maps.get(s[i]) != t[i] || mapt.get(t[i]) != s[i]) {
          return false;
      }
  }
  return true
};

/**
 * 242. 有效的字母异位词
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isAnagram = function (s, t) {
  // 排序对比字符串 时间复杂度Onlogn 空间复杂度Ologn
  // return s.length === t.length && [...s].sort().join('') === [...t].sort().join('')
  // 哈希表 时间复杂度On 空间复杂度Os
  if (s.length !== t.length) {
      return false;
  }
  const table = new Array(26).fill(0)
  for (let i = 0; i < s.length; ++i) {
      table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
  }
  for (let i = 0; i < t.length; ++i) {
      table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
      if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
          return false;
      }
  }
  return true;
}

/**
 * 49. 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
 var groupAnagrams = function (strs) {
  // hashMap 可以用于分组 时间复杂度O(nklogk) 空间复杂度O(nk)
  const map = new Map();
  for (const str of strs) {
      let cy = str;
      cy = cy.split('').sort().join('')
      if (map.has(cy)) {
          map.get(cy).push(str)
      } else {
          map.set(cy, [str])
      }
      // console.log('added ' + str + ' into group ' + cy)
  }
  const ans = [];
  for ([k, v] of map) {
      ans.push(v)
  }
  return ans;
};

/**
 * 438. 找到字符串中所有字母异位词
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function (s, p) {
  // 时间复杂度On 空间复杂度O1
  let n = s.length, m = p.length;
  const ans = []
  if (n < m) return ans;
  let pCnt = new Array(26).fill(0)
  let sCnt = new Array(26).fill(0)
  for (let i = 0; i < m; i++) {
      pCnt[p.codePointAt(i) - 'a'.codePointAt(0)]++;
      sCnt[s.codePointAt(i) - 'a'.codePointAt(0)]++;
  }
  let same = true
  for (let i = 0; i < pCnt.length; i++) {
      if (pCnt[i] != sCnt[i]) {
          same = false;
          break
      }
  }
  if (same) {
      ans.push(0)
  }
  for (let i = m; i < n; i++) {
      sCnt[s.codePointAt(i - m) - 'a'.codePointAt(0)]--;
      sCnt[s.codePointAt(i) - 'a'.codePointAt(0)]++;
      let same = true
      for (let i = 0; i < sCnt.length; i++) {
          if (pCnt[i] !== sCnt[i]) {
              same = false;
              break
          }
      }
      if (same) {
          ans.push(i - m + 1)
      }
  }
  return ans;
};