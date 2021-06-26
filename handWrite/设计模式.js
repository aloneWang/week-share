// 单列模式 只存在唯一的实例
const singleMode = (function() {
    const instance = null

    const CreateMode = function(name) {
        this.name = name
    }

    return function(name) {
        if(!instance) {
            instance = new CreateMode(name)
        }
        return instance
    }
})()

// 策略模式, 对多种情况使用一些算法分别处理
const strategyMode = function(key) {
    switch(key) {
        case 'A' : 
        // 处理逻辑
            break;
        case 'B':
            break;
        default :;
    } // 或者使用对象
}

// 代理模式 为一个对象添加一个代用品或者占位符，以便控制对他的访问
const proxyMode = function(dom, src) {

    var img = new Image() // 代理对象
    img.onload = function() {
        dom.src= img.src
    }

    // 真实dom 
    dom.src= '/loading.gif'
    img.src= src

}


// 订阅发布模式
// vue 的数据相应式 渲染 以及 promise eventBus 等等 都是 此模式的应用
// EventTarget 也是一个 典型的订阅发布模式
const subscribePublishMode = (function() {
    
    const eventBus = function() {
        this.obj = {}
    }
    // 订阅
    eventBus.prototype.on = function(type, fn) {
        if(!this.obj[type]) {
            this.obj[type] = []
        }
        this.obj[type].push(fn)
    }

    // 发布
    eventBus.prototype.emit = function(type, ...payload) {
        if(this.obj[type]) {
            this.obj[type].forEach( fn => {
                fn(...payload)
            });
        }
    }

})()


//装饰者模式