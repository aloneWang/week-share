### Watcher 类
#### 渲染watcher
![图片](./images/vue-5.png)
</br>

挂载阶段 new 一个 渲染watcher, 会执行  `get方法`

`Watcher.prototype.get`:

```
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};
```

这个方法也就是执行 `getter()` 而 new Watcher 传入的 `updateComponent` 实参 就赋值给 getter 属性， watcher 其他的方法在 响应式那块介绍， 渲染 watcher 这块主要是执行 `updateComponent` 方法，


### updateComponent
```
updateComponent = function () {
    vm._update(vm._render(), hydrating);
};

```
</br> 

接着执行 `vm.render`，看下 `render.md`



