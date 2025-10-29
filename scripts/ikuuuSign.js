const key = 'ikuuu';
const vals = $prefs.valueForKey(key);
if (vals !== undefined) {
    (async () => {
        const obj = JSON.parse(vals);
        const p1 = [];
        Object.entries(obj).forEach(arr => {
            p1.push(loginUp(arr[0], arr[1]));
        });
        try{
            console.log('执行');
            const r1 = await Promise.all(p1);
            r1.forEach(i=>{
                console.log(Object.keys(i.headers));
            });
            $done({});

        }catch(e){
            console.log(e);
        }finally{
            $done({});
        }
    })();
    // const arr = vals.split('&');
    // const ps = [];
    // for (item of arr) {
    //     let emailKey = item;
    //     const ck = $prefs.valueForKey(emailKey);
    //     ps.push(signUp(emailKey,ck));
    // }
    // Promise.all(ps).then(res => {
    //     for (let j of res) {
    //         let body = JSON.parse(j.body);
    //         console.log(`${j.opts?.name}签到成功: ${body.msg}`);
    //     }
    // }).catch(rej => {
    //     console.log(`${rej.opts?.name}签到失败: ${rej.error}`);
    // }).finally(() => {
    //     $done();
    // })
} else {
    console.log('ikuuu签到失败,没有提供用户凭证');
    $done();
}

function post(config={}) {
    let {req,opts,timeout,type} = config;
    if(!timeout){
        timeout = 5000;
    }
    if(!type){
        type = 'api';
    }
    return Promise.race([new Promise((a, b) => {
        setTimeout(() => {
            b(`${type}请求超时`);
        }, timeout);
    }), new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            res({ ...response, opts });
        }, reason => {
            rej({ opts, error: reason.error });
        });
    })])
}

function loginUp(email, passwd) {
    const req = {
        url: 'https://ikuuu.de/auth/login',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive'
        },
        body: `host=${ikuuu.de}&email=${email}&passwd=${passwd}&code=`,
        opts: {
            redirection: false
        }
    };
    return post({
        req:req, 
        opts:{ email },
        timeout:6000,
        type:'登录'
    });
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
    return post({
        req:req, 
        opts:{ name: emailKey },
        type:'签到'
    });
}







