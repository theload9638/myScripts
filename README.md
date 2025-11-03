# myScripts
# [Rewrite]

## 1.重写类型

```js
'script-request-header' 
   1.//拦截本次发送的请求,可以使用js脚本
   2.//可以使用$request
'request-header'
   1.//拦截本次发送的请求
   2. [正则匹配网站] url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: xxx$2
'script-response-body' 
   1.//拦截本次发送的请求后获取的响应
   2.//可以使用$response,$request 和 js脚本
'response-body'
   1.//拦截本次发送的请求后获取的响应体
   2.[正则匹配网站] url response-body "属性名":\[.+\],"..." response-body "属性名":[],"..."
'jsonjq-response-body'
   1.//拦截本次发送的请求后获取的响应体,使用jsonjq语法
   /**
    * 语法：[url] url jsonjq-response-body 'jsonjq语法'
    * - .代表顶层对象 或 属性连接符
    * - ,代表操作多个表达式
    * - |代表管道操作符,用于将前结果传递给后面的输入,可多次使用
    * - length表达式(不能包含其他语法),代表对象属性个数/数组长度/字符串长度
    * - del(属性表达式) 用于删除属性
    */
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
   - bodyBytes
6.`$done({
     path: String,
     headers : Object,
     status: String,
     body: String,
     bodyBytes: ArrayBuffer
     });`
   - //释放脚本,终止本次执行
   - //$done({}) 代表请求/响应无改变
7.'$task' //网络请求
   - Promise fetch({
      url:'', //路径
      method:'',//请求类型
      headers:'',//请求头,
      body:'',//请求体
      opts:{
         'filter':'脚本字符串,内含唯一变量body,需使用return返回的结果<16kb',//响应过滤,响应体>512kb时可使用,对网络扩展的内存占用更少
         'policy':'direct',//带有特定策略执行请求,例如服务器地理位置检查
         'redirection': true, //默认重定向为true
      }

     }) //请求
8.'$environment' //环境对象,任务和重写脚本中可使用
   - sourcePath //原始路径
   - params //
9.'$configuration'
   - Promise sendMessage({
      action:'',
        -'dns_get_placeholder_ip/dns_update_cache/dns_clear_cache' //获取ip映射/更新dns缓存/清楚缓存
        -'get_traffic_statistics' //流量统计
        -'url_latency_benchmark' //url延迟测试
          //content: ["Node-001","Node-002","Node-003","Node-004"]
        -'get_server_description' //用于event-interaction脚本,获取服务器描述
        -'get_policy_state'
        -'get_customized_policy'
          //content: PolicyName | ["PolicyName1","PolicyName2"]
        -'set_policy_state' //只适用static or proxy策略
          //content: {"proxy": "Node-002", "cPolicy": "Node-007"}
        -'get_running_mode'
        -'set_running_mode'
          //content: { "running_mode": "all_proxy|all_direct|filter" }
      content: Object | String | Array,
   })

```



# [http_backend]

# [task_local]

```js
'脚本集合'：xxx.json
{
    "name": "kl任务合集",
    "task": [
        "0 9 * * * 脚本路径, tag=脚本名称, enabled=true"
    ],
    "description": "task-script by kl"
}
```

