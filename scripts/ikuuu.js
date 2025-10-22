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
            $prefs.setValueForKey(emailKey,key);
        }else{
            const arr = obj.split('&');
            console.log('当前cookie数量 =',arr?.length);
            console.log(arr,typeof arr);
            // if(!arr.includes(emailKey)){
            //     obj = obj + '&' + emailKey;
            //     if($prefs.removeValueForKey(key)){
            //         $prefs.setValueForKey(obj, key);
            //     }
            // }
        }

    }else{
        $notify('获取Cookie失败', 'error','请检查脚本');
    }
}
$done({});




