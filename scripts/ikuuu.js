const url = $request.url;
const headers = $request.headers;

if(/^https?:\/\/ikuuu\.de\/user\/profile/.test(url)){
    const e = headers['Cookie'];
    const emailKey = (e.split(';')[0]).split('=')[1];
    console.log(emailKey);
    $notify('获取Cookie成功', `key=${emailKey}`, Date.now());
}
$done({});




