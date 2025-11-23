const key = 'ikuuu';
const vals = $prefs.valueForKey(key);
let retry = true;
const retryKey = '_retryTask';
let retryTimes = 3;

if (vals !== undefined) {
    (async () => {
        let failed = undefined;
        const obj = JSON.parse(vals);
        const ps1 = Object.keys(obj).map(key => loginUp(key, obj[key]));
        try {
            const res = await Promise.allSettled(ps1);
            failed = res.filter(i => i.status === 'rejected').map(i => i.reason);
            let suc1 = res.filter(i => i.status === 'fulfilled').map(i => i.value);
            let failed1 = suc1.filter(i => !i.headers.hasOwnProperty('Set-Cookie')).map(msg => {
                return { error: `${msg.opts.email}登录失败,请检查网络状态`, opts: { email: msg.opts.email }, type: 'login' };
            });
            if (failed && failed.length > 0) {
                failed.concat(failed1);
            } else {
                failed = failed1;
            }
            let ps2 = suc1.filter(msg => msg.headers.hasOwnProperty('Set-Cookie')).map(msg => {
                let ck = msg.headers['Set-Cookie'].replace(/path=\/(,)?\s?/gi, '').
                    replace(/expires=[^;]+?;\s?/gi, '').trim();
                let name = msg.opts.email;
                return signUp(name, ck);
            });
            if (ps2.length > 0) {
                await Promise.all(ps2).then(res2 => {
                    let msg = res2.map(j => `${j.opts.name}签到成功：${JSON.parse(j.body)?.msg}`).reduce((pre, nex) => {
                        return pre + '\n' + nex;
                    });
                    console.log(msg);
                });
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
                        failed = Object.keys(obj).map(i=>{
                            return {
                                error:'sign error',
                                type:'sign',
                                opts:{email:i}
                            }
                        });
                    }
                }
            }
        } finally {
            if (failed && failed.length>0) {
                doRetry(failed);
            } 
            $done();
        }
    })();
} else {
    console.log('ikuuu执行任务失败,请提供用户凭证');
    $done();
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
    return post(req, { email }, timeout = 6000, 'login');
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
    return post(req, { name: emailKey }, undefined, 'sign');
}
function doRetry(emails) {
    if (retry && Array.isArray(emails) && emails.length > 0) {
        console.log(`重试队列处理中,错误消息：\n${emails.map(i => i.error).join('\n')}`);
        // return new Promise((resolve, reject) => {
            let obj = JSON.parse(vals);
            let emailKeys = emails.map(i=>{
                return i.opts?i.opts.email:i;
            });
            let arr1 = Object.keys(obj).filter(i => emailKeys.includes(i));
            let task1s = [];
            for (let i = 0; i < arr1.length; i++) {
                let email = arr1[i];
                let bd = `host=ikuuu.de&email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(obj[email])}&code=`;
                let build = {
                    request: {
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
                    },
                    name: 'ikuuu登录',
                    hasNext: true,
                    needResponse: false,
                    mapHanlder: (res) => {
                        if (res && res.headers.hasOwnProperty('Set-Cookie')) {
                            let ck = res.headers['Set-Cookie'].replace(/path=\/(,)?\s?/gi, '').
                                replace(/expires=[^;]+?;\s?/gi, '').trim();
                            let name = res.opts.email;
                            return { ck, name };
                        }
                        throw `${res.opts.email}登录失败,请检查网络状态`;
                    },
                    retryTimes: retryTimes
                };
                build.next = {
                    name: 'ikuuu签到',
                    request: {
                        url: 'https://ikuuu.de/user/checkin',
                        method: 'POST',
                        headers: {
                            Accept: 'application/json, text/javascript, */*; q=0.01',
                            'Accept-Encoding': 'gzip, deflate, br, zstd',
                            'Accept-Language': 'zh-CN,zh;q=0.9',
                            Origin: 'https://ikuuu.de',
                            Referer: 'https://ikuuu.de/user',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    },
                    needResponse: true,
                    preload: function (res) {
                        this.request.headers['Cookie'] = res.ck;
                        this.options = { name: res.name };
                    },
                    mapHanlder: (res) => {
                        return `${res.opts.name}签到成功：${JSON.parse(res.body)?.msg}`;
                    },
                };
                task1s.push(build);
            }
            let retryTasks = $prefs.valueForKey(retryKey);
            if (retryTasks) {
                let arr2 = JSON.parse(retryTasks);
                if (Array.isArray(arr2)) {
                    task1s.concat(arr2);
                }
            }
            console.log(`重试队列处理完毕,新增任务数量：${task1s.length}`);
            $prefs.setValueForKey(JSON.stringify(task1s), retryKey);
            // resolve();
        // });
    }
    // return Promise.resolve();
}






