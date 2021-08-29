/**
 * 1091. 二进制矩阵中的最短路径 
 * @param {number[][]} grid
 * @return {number}
 */

 var shortestPathBinaryMatrix = function (grid) {
  let m, n;
  m = grid.length, n = grid[0].length;
  // 特殊情况
  if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1) return -1;
  const dx = [0, 1, 1, 1, 0, -1, -1, -1]; // 方向数组
  const dy = [1, 0, -1, 1, -1, 1, 0, -1];
  let q = [];
  const v = [];
  for (let i = 0; i < m; i++) {
      v[i] = []
      for (let j = 0; j < n; j++) {
          v[i][j] = 0
      }
  }
  q.push([0, 0]);
  v[0][0] = 1;
  let step = 1;
  // BFS
  while (q.length) {
      let s = q.length;
      for (let i = 0; i < s; i++) {
          const [x, y] = q.shift();
          for (let j = 0; j < 8; j++) {
              let nx = x + dx[j];
              let ny = y + dy[j];
              if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 0 && v[nx][ny] != 1) {
                  q.push([nx, ny]);
                  v[nx][ny] = 1;
              }
          }
          if (x == m - 1 && y == n - 1) return step;
      }
      step++;
  }
  return -1;
};

/**
 * 239. 滑动窗口最大值
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
      while (q[0] <= i - k) {
          q.shift();
      }
      ans.push(nums[q[0]]);
  }
  return ans;
};