const key = 'ikuuu';
const vals = $prefs.valueForKey(key);
if (vals !== undefined) {
    (async () => {
        try {
            const obj = JSON.parse(vals);
            const ps1 = Object.keys(obj).map(key=>loginUp(key,obj[key]));
            const res = await Promise.all(ps1);
            let ps2 = res.map(msg=>{
                if(msg.headers.hasOwnProperty('Set-Cookie')){
                    let ck = msg.headers['Set-Cookie'].replace(/path=\/(,)?\s?/gi, '').
                    replace(/expires=[^;]+?;\s?/gi, '').trim();
                    let name = msg.opts.email;
                    return signUp(name,ck);
                }
                return Promise.reject(`${msg.opts.email}登录失败,请检查网络状态`);
            });
            await Promise.all(ps2).then(res2 => {
                let msg = res2.map(j=>`${j.opts.name}签到成功：${JSON.parse(j.body)?.msg}`).reduce((pre,nex)=>{
                    return pre +'\n'+ nex;
                });
                console.log(msg);
                console.log(JSON.stringify(msg));
                console.log('执行成功!');
            });
        } catch (e) {
            console.log(e);
        } finally {
            $done();
        }
    })();
} else {
    console.log('ikuuu执行任务失败,请提供用户凭证');
    $done();
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

function loginUp(email, passwd) {
    let bd = `host=ikuuu.de&email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(passwd)}&code=`;
    const req = {
        url: 'https://ikuuu.de/auth/login',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://ikuuu.de/auth/login',
            'Sec-Ch-Ua': '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Fetch-Dest': 'empty',
            'Origin': "https://ikuuu.de",
            'Sec-Fetch-Mode': "cors",
            'Sec-Fetch-Site': "same-origin",
            'Host': 'ikuuu.de',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive',
            'Content-Length': bd.length
        },
        body: bd,
        opts: {
            redirection: false
        }
    };
    return post(req, { email },timeout=6000,'登录');
}
function signUp(emailKey, ck) {
    const req = {
        url: 'https://ikuuu.de/user/checkin',
        method: 'POST',
        headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            Cookie: ck,
            Origin: 'https://ikuuu.de',
            Referer: 'https://ikuuu.de/user',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    return post(req, { name: emailKey },undefined,'签到');
}







