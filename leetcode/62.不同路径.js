/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
    // f[m][n] = f[m][n-1] + f[m-1][n]
    var f = []
    for(var i = 0; i < m; i++) {
        f[i] = []
        for(var j = 0; j < n; j++) {
            if(j == 0 || i == 0) {
                f[i][j] = 1
            }else {
                f[i][j] = f[i][j-1] + f[i-1][j]
            }
        }
    }
    return f[m-1][n-1]
};
// @lc code=end

