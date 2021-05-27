/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
   let str = ''
   let max = 0

   for(var i = 0; i < s.length; i++) {
       const index = str.indexOf(s[i])
    if(index > -1) {
        str = str.slice(index+1)
    }
    
    str+= s[i]
    
    if(str.length > max ) {
        max = str.length
    }
   }
   return max
};
// @lc code=end

