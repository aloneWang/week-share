let handler = {
    get(target, name){
        return name in target ? name : null
    }
}
let p = new Proxy({}, handler)
p.a = 1
p.b = undefined
console.log(p.a, p.b,p.c)

let validator = {
    set(obj, prop, value){
        if(prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
              }
              if (value > 200) {
                throw new RangeError('The age seems invalid');
              }
        }
        obj[prop] = value
    }
}

let person = new Proxy({}, validator)
// person.age = '11'
person.age = 300
// console.log(person.age)


// watch
function watch(obj) {
    const handler = {
        get(target, prop) {
            console.log("get")
            return target[prop]
        },
        set(target, prop, v) {
            console.log('set')
            target[prop] = v
        }
    }
    return new Proxy(obj,handler)
    //return obj
}