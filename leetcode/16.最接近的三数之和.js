/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b)
    let diff = null
    let l = 0
    let r = nums.length - 1
    for (var i = 0; i < nums.length - 2; i++) {
        l = i + 1
        r = nums.length - 1
        if (i > 0 && nums[i] === nums[i - 1]) continue
        while (l < r) {
            const _diff = nums[i] + nums[l] + nums[r] - target
            if (_diff === 0) return _diff + target

            if (diff === null) {
                diff = _diff
            } else {
                if (Math.abs(diff) > Math.abs(_diff)) {
                    diff = _diff
                }
            }
            if (_diff < 0) {
                do { l++ } while ( (r > l) && (nums[l] === nums[l - 1]))
            } else {
                do { r-- } while ( (r > l) && (nums[r] === nums[r + 1]))
            }
        }
    }
    return diff + target
}
// @lc code=end

