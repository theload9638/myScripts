let key = '52pj'
let url = undefined;

let flag = globalThis.hasOwnProperty('$request');
if (flag) {
    url = $request?.url;
}
if (flag && url) {
    if (/^https:\/\/www\.52pojie\.cn\/home\.php/.test(url)) {
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
        url: 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2&referer=/',
        method:'GET',
        headers:{
            Cookie:ck,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0"
        },
        opts:{
            redirection: false
        }
    };
    post(req,undefined,undefined,'签到').then(res=>{
        if(res.statusCode==200){
            console.log('签到成功!');
        }else{
            console.log('签到异常：请检查Cookie的有效性\n获取路径：https://www.52pojie.cn');
        }
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
