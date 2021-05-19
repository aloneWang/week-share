/**
 * 
 * @param fn 
 * @param delay 
 * 节流
 * 将多次执行改为隔一段时间执行
 */
function throttle(fn: Function,  delay: number) {
  let time = null
  return (arg) => {
    if(time) {
      return
    }
    fn.apply(this, arg)
    time = setTimeout(() => {
      time = null
      clearTimeout(time)
    },delay) 
  }
}

// 使用 时间戳

function throttle_1(fn: Function, delay: number) {
  let start = 0
  return (arg)=> {
    let now = Date.now()
    const timeDiff = now - start
    if(timeDiff > delay) {
      fn.apply(this, arg)
      start = now
    }
  }
}