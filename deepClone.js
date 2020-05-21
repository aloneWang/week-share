function deepClone(obj) {
    var _obj;
    if(typeof obj !== 'object') return obj
    if(Array.isArray(obj)) {
        _obj = []
    }else {
        _obj = {}
    }
    for(var i in obj) {
        _obj[i] = deepClone(obj[i])
    }
    return _obj
}
var obj = {
    name: '111',
    age:111,
    father:{
        name: 'famth',
        hoby:['soccer','bas']
    }
}
deepClone(obj)