/**
 * （3）给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string} s
 * @return {number}
 */

// 递归（呆逼版）
var lengthOfLongestSubstring = function(s) {
  let a = 0 // 当前遍历的下标
  let barr = ''  // 记录最长子串
  const searchlongStr = function() {
      let actarr = ''
      for(var i = a; i < s.length; i++) {
          if(!actarr.includes(s[i])) {
              actarr+=s[i]
          } else{
              a++
              barr = actarr.length > barr.length ? actarr : barr
              return searchlongStr()
          }
      }
      // 处理 s 就是最长子串
      barr = actarr.length > barr.length ? actarr : barr
      return barr.length
  }
  return searchlongStr()
  
};

// 精简版(滑块)
var lengthOfLongestSubstring = function(s) {
  // 
  let str = ''  // 滑块
  let b = 0   //最长字符个数
  for(var i =0; i < s.length; i++) {
    if(!str.includes(s[i])) {
      str+= s[i]
    }else {
      b = str.length > b ? str.length : b
      let c = str.indexOf(s[i])
      str = str.slice(c+1, i) + s[i]
    }
  }
  return b > str.length ? b : str.length
}