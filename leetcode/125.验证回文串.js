/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if(!(s.trim())) return true 
    
    s = s.toLowerCase().match(/[a-z0-9]/g)
    if(!s) return true
    s = s.join('')
    //amanaplanacanalpanama
    let l = 0
    let r = s.length -1
    while(r > l) {
        if(s[l] === s[r]) {
            l++
            r--
        } else {
            return false
        }
    }
    return true
};
// @lc code=end

