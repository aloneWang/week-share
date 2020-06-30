// 跟着 undersource 学防抖

/**
 * 原理：
 * 在事件触发后，延迟几秒后再触发，
 * 如果在延迟的时间段内再次触发，则时间则重新计算
 */
// 第一版
var debounce = function(fun,delay) {
  let timer
  return function() {
    const context = this
    clearTimeout(timer)
    setTimeout(()=> {
      // 绑定 上下文
      fun.apply(context)
    },delay)
  }
}
Node.onclick = debounce(function() {
  console.log(this)
},1000)

// 立即执行， 事件对象参数
var debounce = function(fun,delay, immedia) {
  let timer
  return function() {
    const args = arguments
    const context = this
    // 定时器没结束，清除
    if(timer) {
      clearTimeout(timer)
    }
    // 立即执行
    if(immedia) {
      if(!timer) {
        fun.apply(context, args)
      }
      timer = setTimeout( () => timer = null, delay)

    }else {
      setTimeout(()=> {
        // 绑定 上下文
        timer = null
        fun.apply(context, args)
      },delay)
    }
  }
}