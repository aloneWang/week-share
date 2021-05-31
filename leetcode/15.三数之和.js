/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//[-1,0,1,2,-1,-4]
// [ -4, -1, -1, 0, 1, 2, 3, 4 ]
// a+b = -c
var threeSum = function(nums) {
  nums.sort((a,b) => a-b)
  let arr = []

  for(var i = 0; nums[i] < 1; i++) {
    let l = i+1;
    let r = nums.length - 1
    if(i > 0 && (nums[i] === nums[i-1])) continue ;
    while(r > l) {
      const sum = nums[i] + nums[l] + nums[r]
      if(sum <= 0 ) {
        if(sum === 0) {
          arr.push([nums[i], nums[l], nums[r]])
        }
        do { l ++ } while (r > l && nums[l] === nums[l-1])
      } else {
        do { r -- } while( r > l && nums[r] === nums[r+1] ) 
      }
    }
  }
  return arr
};
  // @lc code=end

