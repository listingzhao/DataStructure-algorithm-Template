/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 从中序与后序遍历序列构造二叉树（Medium）
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
 var buildTree = function (inorder, postorder) {
  // 中序 [9, | 3 | 15,20,7] 左子树1个点，右子树3个点
  // 后序 [9,15,7,20 | 3]  root=3 不知道左右子树的大小
  // 时间复杂度On 空间复杂度On
  function build(l1, r1, l2, r2) {
      if (r1 < l1 || r2 < l2) return null;
      const root = new TreeNode(postorder[r2])
      // 找到inorder root的位置
      let mid = l1
      while (inorder[mid] != root.val) mid++;
      const rightSize = l2 + mid - l1
      // 递归复原
      root.left = build(l1, mid - 1, l2, rightSize - 1)
      root.right = build(mid + 1, r1, rightSize, r2 - 1)
      return root;
  }
  return build(0, inorder.length - 1, 0, postorder.length - 1);
};


/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 let n = 0;
 let edges = [] // [[], []]
 let inDeg = [] // in degree 度数
 
 const addEdges = (x, y) => {
     edges[x].push(y)
     inDeg[y]++
 }
 
 const topsort = () => {
     let learned = []
     // 拓扑排序 基于BFS需要队列
     const q = [];
     // 从所有零入度点出发
     for (let i = 0; i < n; i++) {
         if (inDeg[i] == 0) {
             q.push(i)
         }
     }
     // BFS
     while (q.length) {
         //取出队头，这门课程学了
         const x = q.shift();
         learned.unshift(x)
         // 考虑x的所有出边
         for (const y of edges[x]) {
             inDeg[y]--; // 去掉约束关系
             if (inDeg[y] == 0) {
                 q.push(y)
             }
         }
     }
 
     if (n != learned.length) {
         return []
     }
 
     return learned;
 }
 
 var findOrder = function (numCourses, prerequisites) {
     n = numCourses;
     edges = []
     inDeg = []
 
     // 初始化
     for (let i = 0; i < n; i++) {
         edges.push([])
         inDeg[i] = 0
     }
 
     // 遍历
     for (const pre of prerequisites) {
         const ai = pre[0]
         const bi = pre[1]
         // 加边模板
         addEdges(ai, bi)
     }
 
     return topsort();
 };