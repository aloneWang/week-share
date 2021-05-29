/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // [1,8,6,2,5,4,8,3,7]
    // [0,14,6,2,10,9,4,1,10,3]
    //  [0, 1, 2, 3, 4, 6, 9, 10, 10, 14]
    let _maxArea = 0
    let leftIndex = 0
    let rightIndex = height.length - 1
    // let oldLeftItem = height[0]
    // let oldRightItem = height[rightIndex]

    while(rightIndex > leftIndex) {
        const leftItem = height[leftIndex]
        const rightItem = height[rightIndex]

        const diffIndex = rightIndex - leftIndex

        if(leftItem < rightItem) {
            // oldLeftItem = Math.max(leftItem, oldLeftItem)
            // if(leftItem < oldLeftItem) {
            //     leftIndex ++
            //     continue
            // }
            leftIndex ++ 
        }else {
            // oldRightItem = Math.max(rightItem, oldRightItem)
            // if(rightItem < oldRightItem) {
            //     rightIndex --
            //     continue
            // }
            rightIndex --
        }

        
        _maxArea = Math.max(_maxArea, Math.min(leftItem, rightItem) * diffIndex)
    }

    return _maxArea
};
// @lc code=end

