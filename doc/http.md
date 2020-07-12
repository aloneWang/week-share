## http 报文结构
+ 起始行
+ 请求头
+ 空行
+ 实体
### 起始行
+ 请求起始行
  `GET /home HTTP/1.1` 方法 路径 http协议版本<br/>
  <img src="../statics/HTTP_Request.png" width="400px" />
+ 响应起始行
  `HTTP/1.1 200 ok` http协议版本 状态码 状态信息 <br />
  <img src="../statics/HTTP_Response.png" width="400px" />
### 请求头
客户端与服务端通过 请求头（headers),传递附加信息
一个请求头： `key: value` （key 不区分大小写）
### 空行
用来区分头部与实体

## 请求方法：
+ GET 
  请求指定资源
+ POST
  提交数据
  特点
   + 非幂等（幂等： 提交多次效果一样）
   + 请求有主体
   + 响应有主体
+ HEAD
  获取资源的头部的信息，且和GET请求时的头部一样
  使用场景：在请求一个大文件，提前知道文件的信息，决定是否要下载
  特点：
   + 幂等
   + 可缓存
+ OPTIONS
  获取目的资源所支持的通信选项，例如，查看该资源支持哪些请求方法
  实例：
   响应报文：
    ```
      HTTP/1.1 200 OK
      Allow: OPTIONS, GET, HEAD, POST 
      Cache-Control: max-age=604800 
      Date: Thu, 13 Oct 2016 11:45:00 GMT 
      Expires: Thu, 20 Oct 2016 11:45:00 GMT
      Server: EOS (lax004/2813) 
      x-ec-custom-error: 1 
      Content-Length: 0 
    ```
    其中的 Allow 字段表示支持哪些方法
+ DELETE
  删除指定的资源
+ TRACE
  沿着目标资源的路径执行一个消息还回测试，主要用来测试和诊断（这里说明下，客户端发起一个请求，这个请求可能要穿过防火墙，代理，网关或者其他的应用程序，每个节点都有可能会修改请求，所以trace可以看到最终的请求是否被改变）[参考](https://www.cnblogs.com/gaopei/p/11380349.html)
+ PUT
  修改数据，与post 区别是，put 是幂等的
+ CONNECT
  建立连接隧道，用于代理服务器  
## http状态码
HTTP 响应状态代码指示特定 HTTP 请求是否已成功完成。
响应分为五类：
+ 信息响应(100–199)，
+ 成功响应(200–299)，
+ 重定向(300–399)，
+ 客户端错误(400–499)
+ 服务器错误 (500–599)。