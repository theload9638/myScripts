# myScripts
# [Rewrite]

## 1.重写类型

```js
'script-request-header' 
   1.//拦截本次发送的请求,可以使用js脚本
   2.//可以使用$request
'script-response-body' 
   1.//拦截本次发送的请求后获取的响应
   2.//可以使用$response,$request 和 js脚本
'response-body'
   1.//拦截本次发送的请求后获取的响应体
'script-echo-response'
   1.//可使用$request.url,$done({status: ,headers:opts,body: opts });    
'script-response-header'
   1.//拦截本次发送的请求后获取的响应头   
```

## 2.脚本环境

```js
1.'$prefs'  //持久化对象
   - string valueForKey(key) //通过key 获取值
   - bool  setValueForKey(value, key) //存储
   - bool  removeValueForKey(key) //删除
   - bool  removeAllValues() //删除所有
2.'$notify(title, subtitle, message)' //弹窗函数
3.'console.log(message)' //日志函数
4.'$request' //请求对象
   - scheme
   - method
   - url
   - path
   - headers
5.'$response' //响应对象
   - statusCode //状态码,例如 'HTTP/1.1 200 OK'
   - headers
   - body
6.'$done({path: , headers : ,status: ,body: });' 
   - //释放脚本,终止本次执行
   - //$done({}) 代表无改变


```

