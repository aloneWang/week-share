## update(vnode, hydrating)
render 执行过后返回 一个 vnode 对象

![图片](./images/vue-13.png)

首次渲染执行 ` vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);`
执行 patch 方法