// 合并两个或者更多的对象的内容到第一个对象中。

var target = {
	a: 1,
	b: 2,
	c: {
		name: 'c'
	}
}
// 浅合并
var extend = function(target, s1, s2) {
  if(arguments.length === 0 ) throw TypeError('Cannot convert undefined or null to object')
  if(typeof target !== 'object') return target

  for(var i = 1; i < arguments.length; i++) {
    if(typeof arguments[i] !== 'object') continue
    for(var j in arguments[i]) {
        target[j] = arguments[i][j]
    } 
  }
  return target
}

