## clip-path
创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性。
## 语法
```
<clip-source> | [ <basic-shape> || <geometry-box> ] | none
<clip-source>用<url>表示剪切元素的路径
<basic-shape> 一种形状，其大小和位置由<几何盒>值定义。如果没有指定几何框，则边框将用作参考框 (  inset()> | <circle()> | <ellipse()> | <polygon()>)
<geometry-box> 如果同  一起声明，它将为基本形状提供相应的参考框盒。通过自定义，它将利用确定的盒子边缘包括任何形状边角 (<shape-box> | fill-box | stroke-box | view-box)
```
## 例子
inset: 裁剪
inset({1,4} [round]? )
```
    <div class="lake" >

    style...
    .lake {
        width: 200px;
        clip-path: inset(10px 15px 20px 25px round 10px);
    }

```
圆形裁剪
`circle( [<shape-radius>]? [at <position>]?`
```
.lake {
        width: 200px;
        clip-path: circle(10px at 20px 25px );
    }
```
椭圆裁剪
```
ellipse( [<shape-radius>{2}]? [at <position>]? )
ellipse表示椭圆裁剪，提供三个参数，第一个参数x轴方向半径，第二个参数y轴方向半径，第三个参数圆心的位置
```
多边形裁剪
```
polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )
第一个为填充规则，第二个参数是顶点坐标的集合
.lake {
  width: 200px;
  height: 200px;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)
}
```
### <clip-source>
这里的clip-path url()函数里的参数并不是裁剪的用链接地址，而是一个剪切元素用的svg路径

```
<div class="wrap">
  <img class="lake" src="../img/lake.jpg">
  <svg width="0" height="0">
    <defs>
      <clipPath id="clip">
          <path d="M 10,30
          A 20,20 0,0,1 50,30
          A 20,20 0,0,1 90,30
          Q 90,60 50,90
          Q 10,60 10,30 z">
          </path>
      </clipPath>
   </defs>
  </svg>
</div>

```
### 结合动画
```
 @keyframes shape {
  from {
    clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%);
  }

  to {
    clip-path: polygon(50% 30%, 100% 0%, 70% 50%, 100% 100%, 50% 70%, 0% 100%, 30% 50%, 0% 0%);
  }
}
.lake {
  width: 200px;
  clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%);
  animation: 2s shape infinite alternate ease-in-out;
}

```
## 浏览器支持
![图片](https://user-gold-cdn.xitu.io/2020/1/3/16f695bf5541882e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)