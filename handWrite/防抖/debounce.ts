/**
 * 
 * @param fn 
 * @param immediately 
 * 防抖， 将多次触发在规定的时间改为一次触发
 */

function dbounce(fn: Function, immediately: boolean, delay: number) :Function{
    let time = null
    return (arg) => {
      if(time) {
        clearTimeout(time)
      }
      
      if(immediately && !time) {
        fn.apply(this.arg)
      }
      time = setTimeout( () => {
        time = null
        if(!immediately) {
          fn.apply(this, arg)
        }
      },delay)
    }
}