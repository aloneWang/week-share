### patch
代码片段过长就不截图了，代码路径 `vue\src\core\vdom\patch.js`

因为初始化 oldVnode 是个 dom 对象 `var isRealElement = isDef(oldVnode.nodeType);`
所以将 dom对象 转成 vnode对象 `oldVnode = emptyNodeAt(oldVnode);`

后面执行 `createEle` 

```
createElm(
    vnode,
    insertedVnodeQueue,
    // extremely rare edge case: do not insert if old element is in a
    // leaving transition. Only happens when combining transition +
    // keep-alive + HOCs. (#4590)
    oldElm._leaveCb ? null : parentElm,
    nodeOps.nextSibling(oldElm)
);
```

`createEle` 主要由 vnode 来创建 dom对象插入到 parentEle

![图片](./images/vue-15.png)

对于组件类型的 vnode 的话执行  `createComponent(vnode, insertedVnodeQueue, parentElm, refElm`

```

function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */)
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue)
        insert(parentElm, vnode.elm, refElm)
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }

```

这个方法主要是执行 vnode hooks `init` 方法
`init` 方法在 生成 componentVnode 执行 `installComponentHooks(data)`

![图片](./images/vue-16.png)

`var child = vnode.componentInstance = createComponentInstanceForVnode(vnode,activeInstance);`
这里 的 `activeInstance`就是当前的vue实例  
在 `update 方法中` 执行 ` var restoreActiveInstance = setActiveInstance(vm);`

```
    function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
    ) {
    var options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
    }
```

`vnode.componentOptions.Ctor` 这其实 是 Vue的 子类构造器，在 `createComponent.md `文件中继承 Vue,
所以现在 继续 走一遍 子组件 构建过程

当执行 到 `Vue.prototype._init()` 和首次执行是不一样的， 这里的子类构造器 在 new 一个 Vue 子类实例的时候传入的 `options`是针对 组件的
```
var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
```
所以会执行 `initInternalComponent(vm, options);`
```

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

```
这里的 `options._parentVnode` 对应的是 父 vnode对象
`options.parent` 对应的是 父实例对象 也就是 activeInstance 

接下来就是 自动调用 `child.$mount()`
执行到 组件 的 `render` 方法

![图片](./images/vue-18.png)
这里 的 vm 其实起是 `child`
`vnode = render.call(vm._renderProxy, vm.$createElement);`
所以这里的 `render` 是该组件的 render属性

vue组件 中 template 被编译成的结果

![图片](./images/vue-17.png)
所以就是继续执行 `createElement` -> `patch`