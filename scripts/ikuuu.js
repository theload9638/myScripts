const url = $request.url;
const headers = $request.headers;
const key = 'ikuuu';

if(/^https?:\/\/ikuuu\.de\/user\/profile/.test(url)){
    const e = headers['Cookie'];
    const emailKey = (e.split(';')[0]).split('=')[1].replace('%40','@');
    if($prefs.setValueForKey(e, emailKey)){
        $notify('获取Cookie成功', '',`key=${emailKey}`);
        const obj = $prefs.valueForKey(key);
        if(obj===undefined){
            obj = [];
            obj.push(emailKey);
            $prefs.setValueForKey(JSON.stringify(obj),key);
        }else{
            const arr = JSON.parse(obj);
            console.log('当前cookie数量',arr?.length);
            if(Array.isArray(arr) && !arr.includes(emailKey)){
                arr.push(emailKey);
                $prefs.setValueForKey(JSON.stringify(arr), key);
            }
        }

    }else{
        $notify('获取Cookie失败', 'error','请检查脚本');
    }
}
$done({});




