// 扩展构造函数
var Person = function(name) {
    this.name = name
}
Person.prototype.say = 11
// var Boy = Function 继承 Peroson
var extend = function(sup, base) {
    base.prototype = new sup()
    base.prototype.constructor = base
    return base
}
var c = extend(Person,function(){})
console.log((new c()).say)

