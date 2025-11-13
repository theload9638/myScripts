let key = '52pj'
let url = undefined;

let flag = globalThis.hasOwnProperty('$request');
if (flag) {
    url = $request?.url;
}
if (flag && url) {
    if (/^https:\/\/www\.52pojie\.cn\/home\.php/.test(url)) {
        Object.keys($request.headers).forEach(console.log);
        let ck = $request.headers['Cookie'];
        if (ck) {
            $prefs.setValueForKey(key, ck);
            console.log('52pj-coookie 获取成功！');
        }
    }
    $done({});
} else {
    let ck = $prefs.valueForKey(key);
    if(!ck){
        console.log('52pj-签到失败：未找到cookie');
        $done();
    }
    let req = {
        url: 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2&referer=/',
        headers:{
            Cookie:ck,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0"
        }
    };
    post(req,undefined,undefined,'签到').then(res=>{
        console.log(res.body);
        console.log(res.statusCode);
        console.log('签到成功!');
    }).catch(e=>{
        console.log(`52签到失败：${e.error}`);
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
