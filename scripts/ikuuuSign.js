const key = 'ikuuu';
const url = 'https://ikuuu.de/user/checkin';

const vals = $prefs.valueForKey(key);
if (vals !== undefined) {
    const arr = vals.split('&');
    console.log(`签到用户数量：${arr['length']}`);
    for (emailKey of arr) {
        const ck = $prefs.valueForKey(emailKey);
        const req = {
            url: url,
            method: 'POST',
            headers: {
               Accept:'application/json, text/javascript, */*; q=0.01',
               'Accept-Encoding':'gzip, deflate, br, zstd',
               'Accept-Language':'zh-CN,zh;q=0.9',
               Cookie:ck,
               Origin:'https://ikuuu.de',
               Referer:'https://ikuuu.de/user',
               'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
               'X-Requested-With':'XMLHttpRequest'
            }
        };

        $task.fetch(req).then(res=>{
            console.log(`${emailKey}签到成功：${decodeURIComponent(res.body.msg)}`);
            $done();
        },err=>{
            console.log(`签到失败：${err.error}`);
        });
    }
}








