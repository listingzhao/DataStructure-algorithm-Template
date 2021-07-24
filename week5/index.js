/**
 * 1011. 在 D 天内送达包裹的能力
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
 var shipWithinDays = function (weights, days) {
  let l = 0; // 上界： 每个分一组
  let r = 0; // 下界： 全部放到一起
  for (let i = 0; i < weights.length; i++) {
      l = Math.max(l, weights[i])
      r += weights[i]
  }
  while (l < r) {
      let mid = (l + r) >> 1;
      if (isValidWithIn(weights, days, mid)) r = mid;
      else l = mid + 1;
  }
  return r;
};
// 判定：mid天的运输情况，能否在days天运完，
// 把 weights 分成 <= days组，每组的和 <= T
function isValidWithIn(weights, days, T) {
  let groupCount = 1;
  let groupSum = 0;
  for (let i = 0; i < weights.length; i++) {
      if (groupSum + weights[i] <= T) {
          groupSum += weights[i]   // 放进当前数组不超载
      } else {
          groupCount++;
          groupSum = weights[i] // 超载了下一趟
      }
      //如果当前累计的天数groupCount > days，说明当前days不满足条件，返回false
      if (groupCount > days) {
          return false;
      }
  }
  return true
}

// 运载能力最小T载重如果可行（能运完），T+1,T+2,... 载重都可行（能运完）-单调分段

/**
 * 875. 爱吃香蕉的珂珂
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
 var minEatingSpeed = function (piles, h) {
  let l = 0, r = Math.pow(10, 9);
  while (l < r) {
      let mid = (l + r) >> 1;
      if (isValidSpeed(piles, h, mid)) r = mid;
      else l = mid + 1;
  }
  return r;
};

// 判定：能否在H小时内吃完，把piles 分为 <=H 组 吃香蕉速度 <= K
// 是否可以在 H 小时内以 K 的进食速度吃掉所有的香蕉?
function isValidSpeed(piles, H, K) {
  let t = 0;
  for (let i = 0; i < piles.length; i++) {
      t += Math.floor((piles[i] - 1) / K) + 1
  }
  return t <= H
}

// 吃香蕉速度最小T如果可行（能吃完），T+1,T+2,... 速度都可行（能吃完）-单调分段
