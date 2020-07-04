// 数组去重
var arr = [1,2,31,21,32,1,2]

// new Set([arr])
let arr1 = [] 
arr.forEach( item => {
  if(arr1.indexOf(item) === -1) {
    arr1.push(item)
  }
}) 