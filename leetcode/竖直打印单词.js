/**
 * 给你一个字符串 s。请你按照单词在 s 中的出现顺序将它们全部竖直返回。
单词应该以字符串列表的形式返回，必要时用空格补位，但输出尾部的空格需要删除（不允许尾随空格）。
每个单词只能放在一列上，每一列中也只能有一个单词。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/print-words-vertically
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var printVertically = function(s) {
  s = s.trim().split(' ')
  let strArr = []
  let maxLength = Math.max(...s.map( item => item.length))
  for(var i=0; i< maxLength; i++) {
    let lastIndex = 0
    strArr[i] = s.reduce( (pre, v, curIndex) => {
      if(v[i]) {
        lastIndex = curIndex
      }
      return pre + (v[i] ? v[i] : ' ')
    }).slice(0, lastIndex+1)
  }
  return strArr
}