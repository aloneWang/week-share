/*
 * @lc app=leetcode.cn id=403 lang=javascript
 *
 * [403] 青蛙过河
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {boolean}
 */

// 动态规划
var canCross = function(stones) {

    let dp = [
        [undefined, true]
    ]
    // 石头 j 跳 k 步 到 i 位置
    // 那么 j 的集合就是 [0, i-1], 依次遍历执行下面转移方程
    // dp[i][k] = dp[j][k-1] || dp[j][k] || dp[j][k+1]
    let n = stones.length
    for(var i = 1; i < n; i++) {
        dp[i] = []
        for(var j = 0; j < i; j++) {
            let k = stones[i] - stones[j]
            //因为 第一步 只能跳一步，第二步最多跳2步， 第三最多跳三.....第n 跳 n
            // 而 下标是从0开始的，所以 第 j 个 石头最多跳 j+1 
            if(k <= j+1) {
                dp[i][k] = dp[j][k-1] || dp[j][k] || dp[j][k+1]
            }
        }
    }
    return dp[n-1].some(i => i === true)
 };
// @lc code=end

