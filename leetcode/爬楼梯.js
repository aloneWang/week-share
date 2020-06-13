/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。
70
 */
var climbStairs = function(n) {
  if(n < 4) return n
  var l1 = 2
  var r2 = 3
  for(var i = 4; i <= n; i++) {
    var temp = l1+r2
    l1 = r2
    r2 = temp 
  }
  return r2
}