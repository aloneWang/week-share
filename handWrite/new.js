//new 运算符
// 创建 一个js对象, 改变this 的上下文, 链接到原型， 返回一个新对象
/**
 * new constrocutor()
 */
// new fn()
// var fn = function(a) {this.a = a}
 var newFn = function(fn, argeuments) {
  var obj = {}
  fn.apply(obj, [].slice.call(argeuments,1))
  return obj
 }
 // newFn(fn,argumens)
