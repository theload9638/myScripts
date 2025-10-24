const url = $request.url;
const headers = $request.headers;
const key = 'ikuuu';

console.log(url);
if (/^https?:\/\/ikuuu\.de\/user\/profile/.test(url)) {
    const e = headers['Cookie'];
    console.log(e);
    const emailKey = (e.split(';')[0]).split('=')[1].replace('%40', '@');
    if ($prefs.setValueForKey(e, emailKey)) {
        $notify('获取Cookie成功', '', `key=${emailKey}`);
        let obj = $prefs.valueForKey(key);
        if (obj === undefined) {
            $prefs.setValueForKey(emailKey, key);
        } else {
            const arr = obj.split('&');
            if (!arr.includes(emailKey)) {
                obj = obj + '&' + emailKey;
                $prefs.setValueForKey(obj, key);
            }
        }
    } else {
        $notify('获取Cookie失败', 'error', '请检查脚本');
    }
}
$done({});




