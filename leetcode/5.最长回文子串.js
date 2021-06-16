/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let f = []
    let len = s.length
    let max = 0
    let begin  = 0
    if(len < 2) return s
    // p[i][r] = p[i+1][r-1]
    for(var l = 2; l <= len; l++) {
        for(var i = 0; l+i <= len; i++) {
            f[i] = f[i] ? f[i] : []
            const r = l + i - 1
            f[i][r] = true 
            if(s[i] != s[r]) {
                f[i][r] = false
            }else {
                if(l <= 3) {
                    f[i][r] = true
                } else {
                    f[i][r] = f[i+1][r-1]
                }
                if(f[i][r] && (max < r - i)) {
                    max = r - i
                    begin = i
                }
            }
        }
    }
    return s.slice(begin, max+begin+1)

};
// 'abccba'
// @lc code=end

