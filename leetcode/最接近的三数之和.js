/**
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  nums = nums.sort((a,b) => a-b)
  let closeT = Infinity
  for(var i =0; i < nums.length ; i++) {
    let l = i+1
    let r = nums.length-1
    while(r> l) {
      let sum = nums[i] + nums[l] + nums[r]
      if(sum < target) {
        l++
      } else if(sum > target) {
        r--
      }else {
        return target
      }
      if(Math.abs(closeT-target) > Math.abs(sum-target)) {
        closeT = sum
      }
    }
  }
  return closeT
}