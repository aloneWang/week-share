// 深拷贝
// 一般 用 json.parse 和 string 就可以 实现 深拷贝，不能处理 function


var obj = {
  a: 1,
  b: '11',
  c: {
    name: 11,
    say: {
      a: 1,
      b:2,
      acb: [1,2,32,]
    }
  },
  d: [
    {
      a:1,
      b:2,
      c: 3
    }
  ]
}

var deepCopy = function(obj) {
  if(obj === null || typeof obj !== 'object') return obj
  // 针对数组
  let target = {}

  if(Array.isArray(obj)) {
    target = []
  }
  for(var key in obj) {
    target[key] = deepCopy(obj[key])
  }
  return target
}