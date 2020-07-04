// 讲多维数组转成一维数组
var arr = [
  1,
  [121,12313],
  [
    [1,4324,213]
  ]
]

var flattern =function(arr) {
  if(!Array.isArray(arr)) return arr
  let _arr = []
  for(var item of arr) {
    _arr = _arr.concat(flattern(item))
  }
  return _arr
}
// reduce 版

var flattern = function(arr) {
  return arr.reduce( (prev, item) => {
    return prev.concat(Array.isArray(item) ? flattern(item) : item)
  },[])
}