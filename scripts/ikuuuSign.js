const key = 'ikuuu';
const url = 'https://ikuuu.de/user/checkin';

const vals = $prefs.valueForKey(key);
if (vals !== undefined) {
    const arr = vals.split('&');
    console.log(`签到用户数量：${arr['length']}`);
    const ps = [];
    for (item of arr) {
        const p = new Promise((ok, rej) => {
            let emailKey = item;
            const ck = $prefs.valueForKey(emailKey);
            const req = {
                url: url,
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
            $task.fetch(req).then(res => {
                console.log(res.body,typeof res.body==='string');
                ok(`${emailKey}签到成功：${res.body.msg}`);
            }, err => {
                rej(`${emailKey}签到失败：${err.error}`)
            });
        });
        ps.push(p);
    }
    Promise.all(ps).then(res=>{
        res.forEach(i=>{
            console.log(i);
        });
        $done();
    }).catch(rej=>{
        console.log(rej);
        $done();
    });

}else{
    $done();
}









