/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let dp = [],
        top = false,
        left = false,
        m = obstacleGrid.length,
        n = obstacleGrid[0].length
    for(var i = 0; i < m; i++) {
        dp[i] = []
        for(var j = 0; j < n; j++) {
            if(obstacleGrid[i][j]) {
                if(i === 0) top = true
                if(j === 0) left = true
                dp[i][j] = 0
            }else {

                if(!i || !j) {
                    dp[i][j] = 1
                    if(!i && top) {
                        dp[i][j] = 0
                    }else if(!j && left) {
                        dp[i][j] = 0
                    }
                }else {
                    dp[i][j] = dp[i-1][j] + dp[i][j-1]
                }
            }
        }
    } 
    return dp[m-1][n-1]   
};
// @lc code=end

