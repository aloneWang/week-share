/**
 * 给定一个有n个正整数数组coin，里面存储着不相同 的面值 的硬币, 问：
 * 最少使用多少枚硬币使其总价值为 M 元
 * @param {number} M
 * @param {number[]} coin
 * @return {number}
 */


/**
 * 动态规划
 * 1 确定状态
 *      最后一步（最优策略中使用的最后一枚银币ak）
 *      化成子问题（最少的硬币拼出面值为 M - ak）
 * 2 转移方程
 *      f[M] = min{f[M-coin[0]],.....,f[M-coin[n-1]]}
 * 3 初始化条件和边界条件
 *      f[0] = 0, 如果不能拼出Y ，则f[Y] = 正无穷
 * 4.计算顺序
 *      f[0], f[1], f[2],....
 */

 var coinChang = function(coins, amount) {
    // write your code here
    // f[k] = min{f[k - coins[0]] + 1, ...., f[k - coins[coins.length-1]]+1}
    const len = coins.length
    let f = []
    f[0] = 0
    for(var i = 1; i <= amount; i++) {
        f[i] = Infinity
        for(var j = 0; j < len; j++) {
            if(i >= coins[j] && f[i - coins[j]] != Infinity) {
                f[i] = Math.min(f[i - coins[j]] + 1, f[i])
            }
            
        }
    }
    return f[amount] == Infinity ? -1 : f[amount]
  }