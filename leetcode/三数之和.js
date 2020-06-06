/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums = nums.sort( (a,b) => a-b)
  let l = 0
  let r = nums.length -1
  let sumArr = []
  let map = new Map()
  for(var i =0; i < nums.length -1; i++) {
    l = i+1
    while(l < r) {
      let sum = nums[i] + nums[l] + nums[r]
      if(sum === 0) {
        if(!Map.has(`${nums[l]}, ${nums[r]}`)) {
          sumArr.push([nums[i], nums[l], nums[r]])
          map.set(`${nums[l]}, ${nums[r]}`)
        }
        l++
      }else if(sum < 0) {
        l++
      } else {
        r--
      }
    }
    return sumArr
  }
}