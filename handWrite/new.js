//new 运算符
// 创建 一个js对象, 改变this 的上下文, 链接到原型， 返回一个新对象
/**
 * new constrocutor()
 */
// new fn()
// var fn = function(a) {this.a = a}
 var newFn = function() {
  var obj = {}
  let fn = [].shift.call(arguments)
  obj.__proto__ = fn.prototype

  fn.apply(obj, arguments)
  return obj
 }
 // newFn(fn,argumens)

 // 模拟实现 call
 Function.prototype.newCall = function(context) {
  if(typeof context !== 'object') throw new Error('缺少this对象')
  var obj = context || window
  obj.fn = this
  var result = obj.fn(...[...arguments].slice(1))
  delete obj.fn
  return result
 }
// apply 
// fn.apply(obj,[])
Function.prototype.newApply = function(context) {
  var arr = [...arguments].slice(1)
  return Function.prototype.newCall(context,...arr)
}

// bind(this.params)

Function.prototype.newBind = function(context) {
  var fn = this
  var params = [...arguments].slice(1)
  var obj = context || window
  obj.fn = fn
  return function() {
    obj.fn(...params,...arguments)
  }
}