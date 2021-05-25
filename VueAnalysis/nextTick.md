## nextTick
源代码路径 `vue\src\core\util\next-tick.js`


`代码` </br>
```
const callbacks = []
let pengding = false
function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```

着段定义 `nextTick`的代码，首先执行的时候  , 会将 入参 push到 一个 数组中，然后执行 `timeFunc` ， 如果存在 `Promise` 且 没有入参 ，则返回一个 promise 对象，

我们来看下 ` timeFunc`的代码, 这段代码 在文件上层已经定义好
```
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
这里的 `timeFunc` 会优先考虑使用 `Promise` API
`Promise`处理异步任务的api ,类属于 micortask(微任务)

```
const p = Promise.resolve()
timeFunc = () => {
  p.then(flushCallbacks)
}
```

我们看下 `flushCallbacks` 的实现 


```
function flushCallbacks() {
  pengding = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```


所以这段代码就是将之前 push到 `callbacks` 数组中 的 回调遍历执行，
所以多次同步调用 `nextTick` 就会将 回调 push 到 callbacks 数组中， 然后在 promise.then 回调中 执行 `flushCallbacks`

这里的`pengding = false` 下次调用 就重新起一个异步任务


如果浏览器不支持 `Promise` 会次选 `MutationObserver` , 这也是 microTask

使用 `MutationObserve` 监听一个 textNode 节点 内容的变化， 由于是 异步任务，所以多次执行后将回调 push到 数组中，待主线代码跑完后则会执行
异步任务的回调， 这也是事件轮询中 异步任务 与 主线 调度机制，

如果 MutationObserve 也不支持,则会使用 `setTimeout` （宏任务）


### 总结
`nextTick` 就是结合 异步任务,将 回调 push到 数组队列中，待主线 代码(执行栈) 跑完后，则 将 异步任务push到 执行栈中 执行


