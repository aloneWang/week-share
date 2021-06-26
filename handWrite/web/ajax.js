var ajax = function(options) {
    // const methods = ['post', ]
    const {method= 'get', url, headers, body} = options
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response)
        }
    }
    
    xhr.send(body)
}
/**
 * 
 * XMLHttpRequest.readyState -> 请求的状态码
 * 0 -> UNSET -> 代理被创建尚未调用open
 * 1 -> OPEND -> open 被调用
 * 2 -> HEADERS_RECEIVED -> send 被调用 
 * 3 -> LOADING -> 下载中
 * 4 -> DONE -> 下载完成
 */