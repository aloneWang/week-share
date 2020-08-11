## valueOf
返回该对象的原始值，继承 `Object.prototype.valueOf`, 也可重写
### 不同对象的valueOf 返回值
| 对象  | 返回值 |
| :----  | ----  |
| Array | 返回数组本身      |
| Boolean   | 布尔值      |
| Date   |  从1970-1-1午夜开始计的毫秒数utc     |
| Function | 函数本身 |
| Number | 数字值 |
| Object | 对象本身 |
| String | 字符串值 |
