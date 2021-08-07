/**
 * 爬楼梯（Easy）
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function (n) {
  // 递归 重复计算 时间复杂度On2 空间复杂度On
  // if (n == 1) return 1;
  // if (n == 2) return 2;
  // return climbStairs(n - 1) + climbStairs(n - 2);
  // 递归+记忆化 时间复杂度On 空间复杂度On
  // const memo = [];
  // function climbStairsMemo(n) {
  //     if (memo[n] > 0) return memo[n]
  //     if (n == 1) {
  //         memo[n] = 1;
  //     } else if (n == 2) {
  //         memo[n] = 2;
  //     } else {
  //         memo[n] = climbStairsMemo(n - 1) + climbStairsMemo(n - 2);
  //     }
  //     return memo[n];
  // }
  // return climbStairsMemo(n)
  // 动态规划 时间复杂度On 空间复杂度On
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n]
};

/** 最长递增子序列的个数（Medium）
 * @param {number[]} nums
 * @return {number}
 */
 var findNumberOfLIS = function (nums) {
  // 动态规划 时间复杂度On2 空间复杂度On
  if (nums.length == 1) return 1;
  const dp = new Array(nums.length).fill(1);
  const count = new Array(nums.length).fill(1);
  let maxLength = 0;
  for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i]) {
              if (dp[j] + 1 > dp[i]) {
                  dp[i] = dp[j] + 1;
                  count[i] = count[j]
              } else if (dp[j] + 1 == dp[i]) {
                  count[i] += count[j]
              }
          }

      }
      maxLength = Math.max(dp[i], maxLength)
  }
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
      if (dp[i] == maxLength) {
          ans += count[i];
      }
  }
  return ans;
};