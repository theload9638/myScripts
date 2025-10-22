const url = $request.url;
const headers = $request.headers;
const key = 'ikuuu';

if(/^https?:\/\/ikuuu\.de\/user\/profile/.test(url)){
    const e = headers['Cookie'];
    const emailKey = (e.split(';')[0]).split('=')[1].replace('%40','@');
    if($prefs.setValueForKey(e, emailKey)){
        $notify('获取Cookie成功', '',`key=${emailKey}`);
        const obj = $prefs.valueForKey(key);
        console.log(obj);

    }else{
        $notify('获取Cookie失败', 'error','请检查脚本');
    }
}
$done({});




