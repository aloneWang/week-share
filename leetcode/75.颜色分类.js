/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    if(nums.length < 2) return 
    let l = 0
    let r = nums.length - 1
    const revers = (a, b, nums) => {
        const value = nums[a]
        nums[a] = nums[b]
        nums[b] = value
    }
    for(var i = 0; i <= r; i ++) {
        if(nums[i] === 1) continue
        if(nums[i] === 0) {
            if(i !=l ) revers(i, l, nums)
            l++
        }
        if(nums[i] === 2) {
            if(i != r ) revers(i, r, nums)
            r--
            if(nums[i] != 1) i--
        }
    }
};
// @lc code=end

