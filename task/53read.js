let key = '53read'
let url = undefined;

let flag = globalThis.hasOwnProperty('$request');
if (flag) {
    url = $request?.url;
}
if (flag && url) {
    if (url.includes('/home.php?')) {
        let ck = $request.headers['Cookie'];
        if (ck) {
            $prefs.setValueForKey(ck, key);
            console.log('53read-cookie 获取成功！');
        }
    }
    $done({});
} else {
    let rand = (new Date().getTime() + '').substring(0, 10);
    let ck = $prefs.valueForKey(key);
    if (ck) {
        post({
            url: 'https://www.53dushu.com/home.php?mod=spacecp&ac=pm&op=checknewpm&rand=' + rand,
            method: 'GET',
            headers: {
                'Host': 'www.53dushu.com',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1 Edg/146.0.0.0',
                'Cookie': ck,
                'Referer': 'https://www.53dushu.com/home.php?mod=space&do=profile&mycenter=1&mobile=2',
                'Sec-Fetch-Dest': 'script',
                'Sec-Fetch-Mode': 'no-cors'
            }
        }).then(res => {
            if (res.statusCode == 200) {
                console.log('签到成功! 金币+2');
            } else {
                console.log('签到失败')
            }
        }).catch(e=>{
            console.log(`签到异常：`+e);
        }).finally(() => {
            $done({});
        });
    }else{
        console.log('53read 未找到cookie');
        $done({});
    }

}

function post(req, opts = null, timeout = 5000, type = '请求') {
    return Promise.race([new Promise((a, b) => {
        setTimeout(() => {
            b(`${type}执行失败：请求超时\n opts：${opts ? JSON.stringify(opts) : null}`);
        }, timeout);
    }), new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            res({ ...response, opts: opts });
        }, reason => {
            rej({ opts, error: reason.error });
        });
    })])
}