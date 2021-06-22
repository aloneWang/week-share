/*
 * @lc app=leetcode.cn id=523 lang=javascript
 *
 * [523] 连续的子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var checkSubarraySum = function(nums, k) {
    let n = nums.length
    let map = new Map()
    let sum = [0]
    // 前缀和加 哈希表
    // [i,j] 满足要求则 sum[j] -sum[i-1] = n * k
    // => sum[j]/k -sum[i-1]/k = n
    // 则 对 sum[j] 和 sum[i-1] 取 k 的余数 相等即可
    
    
    for(var j = 1; j<=n; j++) {
        sum[j] = sum[j-1] + nums[j-1]
    }
    // 因为区间个数至少为 2， 所以从2开始，
    /**
        当 区间个数 = 2 ， sum[j] 就 和 sum[j-2] 取 余 比较
        当 区间个数 = 3，  sum[j] 就 和 sum[j-3] 取 余 比较
        ....
        当区间个数 = n ,  s um[j] 就 和 sum[j-n] 取 余 比较
        所以区间个数集合是[2,n], 则 sum[j] 取余数比较的集合 则是 
        sum[j]%k = OR(2<=n<=n){sum[j-n]%k}
        ==> sum[j]%k = sum[j-2]%k || sum[j-3]%k .... || sum[j-n]%k
     */
     
    for(var j = 2; j <=n; j++) {
        map.set(sum[j-2] % k)
        if(map.has(sum[j] % k)) return true
    }
    
    return false
};
// @lc code=end

