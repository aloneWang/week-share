# week-share

## 日志
2020-07-06 - 2020-07-12 promise 专题

## 图片加载失败问题
昨天上传图片加载失败，以为自己上传失败了，后来google 下发现是图片域名ip更新了，这里记录下方法：
`https://raw.githubusercontent.com/aloneWang/week-share/master/VueAnalysis/images/vue-1.png`,找到图片域名，在`https://www.ipaddress.com/`下搜索该域名对应的ip,在host文件加上就可以了