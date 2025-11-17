let key = '52pj'
let url = undefined;

let flag = globalThis.hasOwnProperty('$request');
if (flag) {
    url = $request?.url;
}
if (flag && url) {
    if (/^https:\/\/www\.52pojie\.cn\/home\.php\?/.test(url)) {
        let ck = $request.headers['Cookie'];
        if (ck) {
            $prefs.setValueForKey(ck, key);
            $notify('52pojie获取ck成功','','');
            console.log('52pj-coookie 获取成功！');
        }
    }
    $done({});
} else {
    let ck = $prefs.valueForKey(key);
    if(!ck){
        console.log('52pj-签到失败：未找到cookie\n请先获取Cookie：https://www.52pojie.cn/');
        $done();
    }
    let req = {
        url: 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2&referer=%2F',
        method:'GET',
        headers:{
            Cookie:ck,
            host:'www.52pojie.cn',
            Referer:'https://www.52pojie.cn/',
            'Accept-Lanuguage':'zh-CN,zh;q=0.9',
            'Accept-Encoding':'gzip, deflate, br, zstd',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Ch-Ua-Mobile':'?0',
            'Sec-Ch-Ua':'"Chromium";v="142", "Google',
            'Sec-Fetch-Dest':'document',
            'Sec-Fetch-Mode':'navigate',
            'Sec-Fetch-Site':'same-origin',
            'Sec-Fetch-User':'?1',
            'upgrade-insecure-requests':1,
            'Upgrade-Insecure-Requests':1,
            'Connection':'keep-alive',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
        },
        opts:{
            redirection: false
        }
    };
    post(req,undefined,undefined,'签到').then(res=>{
        if(res.statusCode==200){
            console.log('签到成功!'+res.headers['Content-Type']);
        }else{
            console.log('签到异常：请检查Cookie的有效性\n获取路径：https://www.52pojie.cn');
        }
    }).catch(e=>{
        console.log(`52签到失败：${e.error?e.error:e}`);
    }).finally(()=>{
        $done();
    });
}
function post(req, opts = null, timeout = 5000,type='请求') {
    return Promise.race([new Promise((a, b) => {
        setTimeout(() => {
            b(`${type}执行失败：请求超时\n opts：${opts?JSON.stringify(opts):null}`);
        }, timeout);
    }), new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            res({ ...response, opts: opts });
        }, reason => {
            rej({ opts, error: reason.error });
        });
    })])
}
