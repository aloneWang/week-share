/**
 * lintCode 114 不同的路径
 * 在 m * n 的网格中， 从 左上角 走到右下角 有多少种不同的路径
 * @param {number} m
 * @param {number} n
 * @return {number} 
 */

/**
 * arr[m-1][n-1] = arr[m-1][n-2] + arr[m-2][n-1]
 */
 var uniquePaths = function(m, n) {
    var arr = []
    for(var i = 0; i < m; i ++) {
        arr[i] = []
        for(var j = 0; j < n; j++) {
            // arr[0][1] = arr[0][0] + arr[-1][1]
            if(j == 0 || i == 0) {
                arr[i][j] = 1
            } else {
                arr[i][j] = arr[i][j-1] + arr[i -1][j]
            } 
        }
    }
    return arr[m-1][n-1]
 }