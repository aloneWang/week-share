// toString 返回表示该对象得字符串
// 题目

// 如下为一段代码，请完善sum函数，使得 sum(1,2,3,4,5,6) 函数返回值为 21 ,需要在 sum 函数中调用 asyncAdd 函数，且不能修改asyncAdd函数

/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a,b,callback) {
  setTimeout(function(){
   callback(null, a+b)
  },1000)
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  // 请在此处完善代码
  let total = 0
  let sum = {}
  sum.toString = function() {
    return total
  }
  await Promise.all(rest.map( item => {
    return new Promise( resolve => {
      asyncAdd(sum, item, (_, res) => {
        total = res
        resolve(res)
      })
    })
  }))
  return total
}

let start = window.performance.now()
sum(1, 2, 3, 4, 5, 6).then(res => {
  // 请保证在调用sum方法之后，返回结果21
  console.log(res)
  console.log(`程序执行共耗时: ${window.performance.now() - start}`)
})
