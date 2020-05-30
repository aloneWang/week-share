// leetcode (101) 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
/***
 *       1
 *      /  \
 *     2   2
 *    / \ / \
 *   3  4 4 3
 */
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//
 /**
  *  1
    / \
   2   2
    \   \
    3    3
*/   
// [1,2,2,3,4,4,3]
let isSymmetric = function(root) {
  // 获取每层级的数组
  let i = 1
  let act = 2
  let c = 1
  let leveArr = []
  const getItemArr = function() {
    act = Math.pow(2,c)
    leveArr = root.slice(i, act)
    if(isSym(leveArr)) {
      if(i >= root.length) return true
      c++
      i = i+ act
      return getItemArr()
    }
    return false
  }
  const isSym = function(arr) {
    if(arr.length == 0) return true
    for(var i=0; i<arr.length; i++) {
      if(arr[length] != arr[length-1-i]) {
        return false
      }
      return true
    }
  }
  return getItemArr()
}