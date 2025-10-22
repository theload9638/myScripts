const url = $request.url;
const headers = $request.headers;

if(/^https?:\/\/ikuuu\.de\/user/.test(url)){
    console.log(JSON.stringify(headers));
}
$done({});




