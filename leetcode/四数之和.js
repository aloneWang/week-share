
/**
 * 
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums = nums.sort((a,b) => a-b)
  let r = nums.length -1
  let m =nums.length -2
  let sumarr = []
  let map = new Map()
  for(var i =0; i<nums.length; i++) {
      for(var l = i+1; l < nums.length; l++) {
          r =nums.length -1
          m = l+1
          while(r>m) {
              let sum = nums[i] + nums[l] + nums[m] +nums[r]
              let key = `${nums[l]},${nums[m]},${nums[r]}`
              if(sum === target ) {
                  if(!map.has(key)) {
                      sumarr.push([nums[i], nums[l], nums[m], nums[r]])
                      map.set(key)
                  }
                  m++
              }else if(sum > target) {
                  r--
              }else {
                  m++
              }
          }
      }
  }
  return sumarr  // []
};