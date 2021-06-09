/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    var map = new Map()
    // var sArr = 
    s = s.split(' ')
    if(pattern.length != s.length) return false
    for(var i = 0; i < pattern.length; i++) {
        if(map.has(pattern[i])) {
            let value = map.get(pattern[i])
            if(s[i] != value) return false
        }else {
            const index = s.indexOf(s[i])
            if(index < i  && index > -1 ) return false
            map.set(pattern[i], s[i])
        }

    }
    return true
};
// @lc code=end

