/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let l = 0
    let r = 1
    let blackSum = 0
    let sum = 0
    // let Rmax = 0
    let RmaxIdx = 0

    while( r < height.length) {
        // 左指针 确认
        if(r - l > 1) {
            while(r < height.length) {
                if(height[r]  >= height[RmaxIdx]) {
                    RmaxIdx = r
                    if(height[r] >= height[l]) {
                        break
                    }
                }
                r++
            }
            // RmaxIdx 和 l 是邻边关系
            if(RmaxIdx - 1 === l) {
                l = RmaxIdx
                r = l+1
                // break
                continue
            }
            blackSum = height.slice(l+1,RmaxIdx).reduce((prev, cur)=> prev + cur)

            sum += (RmaxIdx - l - 1) * Math.min(height[l], height[RmaxIdx]) - blackSum

            if(r === height.length) {
                l = RmaxIdx
                r =l + 1
            } else {
                l = r
                r = l+1
            }
            blackSum = 0
        } else {
            // r 与 l 并排
            if(height[r] >= height[l]) {
                l = r
                r = l + 1
            } else {
                RmaxIdx = r
                r ++
            }
        }
    }
    
    return sum
};
// @lc code=end
