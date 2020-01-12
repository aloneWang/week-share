## 定义：
Proxy 对象用于定义自定义行为（如属性查找、赋值、枚举、函数调用）
## 语法
```
    let p = new Proxy(target, handler)
```
+ 参数：
    + `{Object | Array | Function } target` proxy包装的目标对象
    + `{object} handler` 定义代理对象的一些行为（属性访问，赋值，枚举等）
## 实例
```
 let handler = {
     get(target, name){
         return name in target ? name : null
     }
 }
 let p = new Proxy({}, handler)
 p.a = 1
 p.b = undefined
 console.log(p.a, p.b,p.c)
```    
#### 转发代理
```
    let target = {}
    let p = new Proxy(target,{})
    p.a = 37
    console.log(target.a)   // 37
```