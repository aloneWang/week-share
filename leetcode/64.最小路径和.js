/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    let f = []
    const m = grid.length
    const n = grid[0].length
    
    // f[m][n] = min{f[m-1][n], f[m][n-1]} + graid[m][n]
    for(var i = 0; i < m; i++) {
        f[i] = []
        for(var j = 0; j < n; j++) {
            if(i == 0 && j == 0) {
               f[i][j] = grid[i][j]
            }else if(i == 0) {
                f[i][j] = f[i][j-1] + grid[i][j]
            }else if( j == 0){
                f[i][j] = f[i-1][j] + grid[i][j]
            }else {
                f[i][j] = Math.min(f[i-1][j], f[i][j-1]) + grid[i][j]
            }
        }
    }
    return f[m-1][n-1]
};
// @lc code=end

