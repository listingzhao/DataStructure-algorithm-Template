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