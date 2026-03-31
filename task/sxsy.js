//尚香书苑签到 >> Qx脚本
let key = 'sxsy18'
let web = 'sxsy18.com';
let baseUrl = 'https://' + web + '/';
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
            console.log('sxsy-cookie 获取成功！');
        }
    }
    $done({});
} else {
    let formhash = '406652d5';
    let base = 'plugin.php?id=k_misign:sign&operation=qiandao&format=text&formhash=';
    let ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1';
    let ck = $prefs.valueForKey(key);
    if (ck) {
        (async () => {
            try {
                const fhGet = await handleFormHash(ck, ua);
                if (fhGet.statusCode === 200) {
                    let fhRes = /formhash=([\w_\-]+)/.exec((fhGet.body || ''));
                    if (fhRes) {
                        formhash = fhRes[1];
                        ck = mergeCk(ck, fhGet.headers['Set-Cookie']);
                    } else {
                        console.log('未查询到formhash,将使用默认值');
                    }
                    const calcHtml = await handleCheckSign(formhash, base, ck, ua);
                    if (calcHtml.statusCode === 200) {
                        let match = (calcHtml.body || '').match(/签到验证[:：]\s*([^=]+)[=＝]\s*\?/);
                        if (match) {
                            let checkRes = (eval(match[1].trim()) + "").trim();
                            ck = mergeCk(ck, calcHtml.headers['Set-Cookie']);
                            const signResult = await handleSign(formhash, base, checkRes, ck, ua);
                            if (signResult.statusCode === 200) {
                                if (signResult.body.includes('已签到')) {
                                    console.log('sxsy签到成功,金币+2 !');
                                } else {
                                    console.log(`sxsy签到状态异常：\n${signResult.body}\n`);
                                }
                                if (signResult.headers.hasOwnProperty('Set-Cookie')) {
                                    $prefs.setValueForKey(mergeCk(ck, signResult.headers['Set-Cookie']), key);
                                }
                            } else {
                                console.log('sxsy签到异常');
                            }
                        } else {
                            if (signHtml.includes('今日已签')) {
                                console.log('sxsy今日已完成签到');
                                $done();
                                return;
                            }
                            console.log(`未匹配到签到验证信息...\n内容正文：\n${signHtml}\n`);
                        }
                    } else {
                        console.log(`sxsy签到验证异常,请尝试手动签到\n res-headers:\n${JSON.stringify(calcHtml.headers)}\n`);
                    }
                } else {
                    console.log('sxsy网站访问('+fhGet.statusCode+')失败,请检查网络状态 或 更换域名');
                }
            } catch (e) {
                console.log('sxsy-SignError: ' + e.message);
            } finally {
                $done();
            }
        })();
    } else {
        console.log('sxsy 未找到cookie');
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
function mergeCk(oldCk, newCk) {
    if (!newCk) {
        return oldCk;
    }
    if (newCk) {
        newCk = newCk.replace(/path=\/(,)?\s?/gi, '').
            replace(/expires=[^;]+?;\s?/gi, '').trim()
    }
    let cookieObj = {};
    oldCk.split(";").forEach(item => {
        let [k, v] = item.trim().split("=");
        cookieObj[k] = v;
    });
    newCk.forEach(sc => {
        let pair = sc.split(";")[0];
        let [k, v] = pair.split("=");
        cookieObj[k] = v;
    });
    return Object.entries(cookieObj)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");
}
function handleFormHash(ck, ua) {
    let access_url = baseUrl + '/index.php?mobile=2';
    return post({
        url: access_url,
        method: 'GET',
        headers: {
            'Host': web,
            'Referer': access_url,
            'Cookie': ck,
            'User-Agent': ua,
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Dest': 'document',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
    })
}
function handleCheckSign(formhash, base, ck, ua) {
    return post({
        url: baseUrl + '/' + base + formhash,
        method: 'GET',
        headers: {
            'Host': web,
            'Referer': baseUrl + '/index.php?mobile=2',
            'Cookie': ck,
            'User-Agent': ua
        }
    });
}
function handleSign(formhash, base, checkRes, ck, ua) {
    return post({
        url: baseUrl + '/' + base + formhash + `&mathverify_answer=${checkRes}&inajax=1&ajaxtarget=signBtn`,
        method: 'GET',
        headers: {
            'Host': web,
            'Referer': baseUrl + '/index.php?mobile=2',
            'Cookie': ck,
            'User-Agent': ua,
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Fetch-Dest': 'empty',
            'Accept': 'application/xml, text/xml, */*; q=0.01',
            'Connection': 'keep-alive',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        }
    });
}
