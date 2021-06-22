// 复习下把
// 对于 promise 中链式调用，怎样解决 链式调用中 异步任务的
// 也就是 then() 回调中 接受 异步任务是如何按顺序执行的
// 简单写下 then 主要任务

//完整版 https://github.com/stefanpenner/es6-promise
class _Promise {
    constructor(fn) {
        this.cbs = []
        this.failcb = []
        this.state = 'pengding'
        this.result = undefined
        fn(this.resolve.bind(this),this.reject.bind(this))
    }
    then(successfn, failfn) {
        
        const handlePromiseResult = (fn,v, res) => {
            v = fn(v)
            // then 回调 就是处理当前promise 对象 的结果， 统一用 resolve 处理
             res(v)
               
        }
        // 返回一个新promise 对象
        return new _Promise((res, rej) => {
            // 箭头函数 this 指向 上层函数作用域
            successfn = typeof successfn === 'function' ? successfn : v => v
            failfn = typeof failfn === 'function' ? failfn : v => v

            if(this.state === 'fulfilled') {
                handlePromiseResult(successfn, this.result, res)

            }else if(this.state === 'rejected') {
                handlePromiseResult(failfn, this.result, res)

            }else {

                this.cbs.push((value) => {
                    handlePromiseResult(successfn, value, res)
                })

                this.failcb.push((value) => {
                    handlePromiseResult(failfn, value, res)
                })
            }
        })
    }

    resolve(data) {
        const run = (v) => {
            this.state = 'fulfilled'
            this.result = v
            this.cbs.forEach( item => item(v))
        }
        // 同一个 promise 对象状态只能 从 pending -> fulfilled/rejected
        if(this.state === 'pengding') {
            // 如果data 是一个 promise 对象 或者是个 thenable 对象
            // 那么 data 的 最终状态 和 result 值 就是 当前 promise 对象 的状态 和 result  

            if(data && data.then) {
                data.then(value => {
                    run(value)
                    return value
                },(err) => {
                    this.reject(err)
                    return err
                })
            }else {
                run(data)
            }
        }
    }
    reject(err) {
        if(this.state === 'pengding') {
            this.state = 'rejected'
            this.result = err
            this.failcb.forEach( item => item(err))
        }   
        console.error(`Uncaught in promise '${err}'`)
    }
    
}
// 这里的 resolve 方法 和 Promise.resolve 静态方法有些区别，
// Promise.resolve 返回一个 promise对象， 当 Promise.resolve 一个 promise 对象就返回该对象 
// 而 resolve 只是改变当前对象的状态和 result
var p1 = new _Promise((res, rej) => {
    res(1)
})
var p2 = new _Promise((res, rej) => {
    res(2)
})

p1.then((v) => p2)