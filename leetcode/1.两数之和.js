/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var hashmap = new Map()

    for(var i = 0; i < nums.length; i++) {
        const value = target - nums[i]
        if(hashmap.has(value)) {
            return [i, hashmap.get(value)]
        }
        hashmap.set(nums[i], i)
    }
};
// @lc code=end

