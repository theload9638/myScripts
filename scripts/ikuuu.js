const url = $request.url;
const headers = $request.headers;

if(/^https?:\/\/ikuuu\.de\/user/.test(url)){
    const e = headers['Cookie'];
    console.log(e);
}
$done({});




