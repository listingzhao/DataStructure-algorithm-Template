/**
 * 冗余连接（Medium）
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  // 时间复杂度O(NlogN) 空间复杂度On
  const n = edges.length;
  const fa = new Array(n + 1).fill(0).map((value, index) => index)

  const unionSet = (x, y) => {
      x = fa[x]
      y = fa[y]
      if (x != y) {
          fa[x] = y
      }
  }

  const find = (x) => {
      if (x == fa[x]) return x;
      return fa[x] = find(fa[x])
  }

  for (let i = 0; i < n; i++) {
      const edge = edges[i]
      const x = edge[0], y = edge[1]
      if (find(x) != find(y)) {
          unionSet(x, y)
      } else {
          return edge
      }
  }

  return [0]
};

/**
 * 岛屿数量（Medium）
 * 并查集解法 时间复杂度5N 近似常数 空间复杂度On
 */
 var numIslands = function (grid) {
  // 初始化
  const m = grid.length, n = grid[0].length;
  // 方向数组
  const dx = [-1, 0, 0, 1]
  const dy = [0, -1, 1, 0]
  const fa = new Array(n * m).fill(0)
  function num(i, j) {
      return i * n + j
  }

  function find(x) {
      return x == fa[x] ? x : fa[x] = find(fa[x])
  }
  for (let i = 0; i < m; i++)
      for (let j = 0; j < n; j++)
          fa[num(i, j)] = num(i, j)

  for (let i = 0; i < m; i++)
      for (let j = 0; j < n; j++) {
          if (grid[i][j] == '0') continue
          // 4个方向
          for (let k = 0; k < 4; k++) {
              let ni = i + dx[k]
              let nj = j + dy[k]
              if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue
              else if (grid[ni][nj] == '1') {
                  fa[find(num(ni, nj))] = find(num(i, j))
              }
          }
      }

  const ans = []
  for (let i = 0; i < m; i++)
      for (let j = 0; j < n; j++) {
          if (grid[i][j] == '1' && !ans.includes(find(num(i, j)))) {
              ans.push(find(num(i, j)))
          }
      }

  return ans.length
}