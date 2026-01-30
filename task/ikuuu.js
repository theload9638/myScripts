const key = 'ikuuu';
const vals = $prefs.valueForKey(key);

let hosts = ['ikuuu.nl', 'ikuuu.fyi'];
let hostIdx = 0;

if (vals !== undefined) {
    (async () => {
        let failed = undefined;
        const obj = JSON.parse(vals);
        let objKeys = Object.keys(obj);
        let cpK = Object.keys(obj);
        try {
            for (let i = hostIdx; i < hosts.length; i++) {
                let host = hosts[i];
                objKeys = toCastFail(failed, cpK);
                try {
                    const res = await Promise.allSettled(objKeys.map(key => loginUp(host, key, obj[key])));
                    let suc1 = res.filter(i => i.status === 'fulfilled').map(i => i.value);
                    let f1 = res.filter(i => i.status === 'rejected').map(i => i.reason);;
                    let f2 = suc1.filter(i => !i.headers.hasOwnProperty('Set-Cookie')).map(msg => {
                        return { error: `${msg.opts.email}登录失败,请检查网络状态`, opts: { email: msg.opts.email,host }, type: 'login' };
                    });
                    if (suc1.length !== objKeys.length || f2.length > 0 || f1.length > 0) {
                        let f3 = [...f1, ...f2];
                        failed = (failed && failed.length > 0) ? failed.concat(f3) : f3;
                        if (suc1.length === 0 || f2.length === objKeys.length || f1.length === objKeys.length) {
                            continue;
                        }
                    }
                    let ps2 = suc1.filter(msg => msg.headers.hasOwnProperty('Set-Cookie')).map(msg => {
                        let ck = msg.headers['Set-Cookie'].replace(/path=\/(,)?\s?/gi, '').
                            replace(/expires=[^;]+?;\s?/gi, '').trim();
                        return signUp(host, msg.opts.email, ck);
                    });
                    if (ps2.length > 0) {
                        let res2 = await Promise.all(ps2);
                        let msg = res2.map(j => `${j.opts.email}签到成功：${JSON.parse(j.body)?.msg}`).reduce((pre, nex) => {
                            return pre + '\n' + nex;
                        });
                        console.log(msg);
                        if (failed == undefined || failed.length === 0) {
                            break;
                        }
                    }
                } catch (e) {
                    if (typeof e !== 'object') {
                        console.log('未知异常：' + e);
                    } else {
                        if (Object.keys(e).length === 0) {
                            console.log('未知异常:{}');
                        } else {
                            console.log(`error:${e.error} , 
                        opts: ${e.opts ? JSON.stringify(e.opts) : ''},
                        type: ${e.type}`);
                            if (e.type === 'sign') {
                                failed = Object.keys(obj).map(i => {
                                    return {
                                        error: 'sign error',
                                        type: 'sign',
                                        opts: { email: i ,host}
                                    }
                                });
                            }
                        }
                    }
                }
            }
        } finally {
            if (failed && failed.length > 0) {
                console.log('任务执行失败:' + failed.map(i =>{
                    return `${i.type}-${i.opts.host}-${i.opts.email}-${i.error}`
                }).join('\n'));
            }
            $done();
        }
    })();
} else {
    console.log('ikuuu执行任务失败,请提供用户凭证');
    $done();
}
function toCastFail(failedList, rowList) {
    if (!!failedList && failedList.length > 0) {
        return [...failedList.map(i => i.opts.email)];
    } else {
        return rowList;
    }
}
function post(req, opts = null, timeout = 5000, type = 'api') {
    return Promise.race([new Promise((a, b) => {
        setTimeout(() => {
            b({ error: `请求超时\n`, opts, type });
        }, timeout);
    }), new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            res({ ...response, opts: opts });
        }, reason => {
            rej({ opts, error: reason.error, type });
        });
    })])
}

function loginUp(host, email, passwd) {
    let bd = `host=${host}&email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(passwd)}&code=`;
    const req = {
        url: `https://${host}/auth/login`,
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': `https://${host}/auth/login`,
            'Sec-Ch-Ua': '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Fetch-Dest': 'empty',
            'Origin': `https://${host}`,
            'Sec-Fetch-Mode': "cors",
            'Sec-Fetch-Site': "same-origin",
            'Host': host,
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
    return post(req, { email,host }, 6000, 'login');
}
function signUp(host, emailKey, ck) {
    const req = {
        url: `https://${host}/user/checkin`,
        method: 'POST',
        headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            Cookie: ck,
            Origin: `https://${host}`,
            Referer: `https://${host}/user`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    return post(req, { email: emailKey,host }, undefined, 'sign');
}







