const key = 'ikuuu';
const vals = $prefs.valueForKey(key);
if (vals !== undefined) {
    const arr = JSON.parse(vals);
    const ps1 = [];
    for(let i of arr){
        ps1.push(loginUp({
            email:i.split('&')[0],
            passwd:i.split('&')[1]
        }));
    }
    Promise.all(ps1).then(res=>{
        console.log('完成');
    }).finally(()=>{
        console.log('结束');
        $done();
    });
    // const arr = vals.split('&');
    // const ps = [];
    // for (item of arr) {
    //     let emailKey = item;
    //     const ck = $prefs.valueForKey(emailKey);
    //     ps.push(signUp(emailKey,ck));
    // }
    // Promise.all(ps).then(res => {
    //     console.log(res.reduce((a, b) => a + '\n' + b, ''))
    //     $done();
    // }).catch(rej => {
    //     console.log(rej);
    //     $done();
    // });

} else {
    console.log('ikuuu签到失败,没有提供用户凭证');
    $done();
}

function loginUp(obj) {
    const req = {
        url: 'https://ikuuu.de/auth/login',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://ikuuu.de/auth/login',
            'Sec-Ch-Ua': '"Microsoft Edge";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: {
            host: 'ikuuu.de',
            email: obj.email,
            passwd: obj.passwd,
            code: undefined
        }
    };
    return new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            console.log(typeof response.headers==='string');
            
            
            res();
        }, reason => {
            rej(reason);
        });
    })
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
    return new Promise((res, rej) => {
        $task.fetch(req).then(res => {
            const body = JSON.parse(res.body);
            ok(`${emailKey}签到成功：${body.msg}`);
        }, err => {
            rej(`${emailKey}签到失败：${err.error}`)
        });
    });
}







