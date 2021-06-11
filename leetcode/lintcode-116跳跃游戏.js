/**
 * litcode 116
 * 描述
    给出一个非负整数数组，你最初定位在数组的第一个位置。
    数组中的每个元素代表你在那个位置可以跳跃的最大长度。
    判断你是否能到达数组的最后一个位置。
 */

var canJump = function(A) {
    let l = 0
    const n = A.length
    if( n == 1) return true
    for(var i = 0; i < n-1; i++) {
        if(i > l) return false 
        for(var j = A[i]; j >= 1; j--) {
            if(j+i >= n-1) return true
            if(A[j+i] != 0) {
                l = Math.max(j+i, l)
            }
        }
    }
}

// 动态规划
canJump = function(A) {
    const n = A.length
    let f = []
    f[0] = true
    // f[j] = OR[0<=i<j](f[i] && A[i] >= j-i)

    for(var j = 1; j < n; j++) {
        f[j] = false
        for(var i = 0; i < j; i++) {
            if(f[i] && A[i] >= j-i) {
                f[j] = true
                break
            }
        }
    }
    return f[n-1]
}