### defineReactive 
给对象定义属性
```
function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```
`const dep = new Dep` 这段代码后面讲
`let childOb = !shallow && observe(val)` 这里递归调用 observe, 所以 无能data 对象多复杂，它的子属性也将变成响应式
这里主要使用 `Object.defineProperty` 给 每个 属性定义了 `get` 和 `set` 方法 ，这两个方法 分别 在 访问 和 赋值 的时候 触发

`依赖收集`
我们先看下 `get` 方法
```
function reactiveGetter () {
    const value = getter ? getter.call(obj) : val
    if (Dep.target) {
    dep.depend()
    if (childOb) {
        childOb.dep.depend()
        if (Array.isArray(value)) {
        dependArray(value)
        }
    }
    }
    return value
}
```
这里主要 关注`dep.depend()` 和 `Dep.target` , 这个 dep 就是刚刚 `const dep = new Dep()`
每个data 属性 都实例化 一个 Dep， 看下 `dep.md`


