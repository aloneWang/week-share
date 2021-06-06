/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 滑块
var minSubArrayLen = function(target, nums) {
  let l = 0
  let sum = 0
  let len = Infinity
  for(var i = 0; i < nums.length; i++) {
      if(nums[i] >= target) return 1
      sum += nums[i]
      if(sum >= target) {
          do{
            let res = i - l +1
            len = res > len ? len : res
            sum -= nums[l]
            l ++
          }while(sum >= target)
      }
  }  
  return len == Infinity ? 0 : len
};
// @lc code=end

