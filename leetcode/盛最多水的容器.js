/**
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var maxArea = function(height) {
  let s = 0  // 最大面积
  for(var i =0; i< height.length -1; i++) {
      let maxY = 0
      for(var j=height.length -1; j > i; j --) {
          if(height[j] > maxY) {
              let slayer = (j -i) * (height[j] < height[i] ? height[j] : height[i])
              s = s > slayer ? s: slayer
              maxY = height[j]
          }
      }
  }
  return s
};