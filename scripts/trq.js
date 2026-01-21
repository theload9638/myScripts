const url = $request.url;
let type = $response.headers['content-type'] || $response.headers['Content-Type'];
console.log(type);
console.log($response.headers['content-type']);
if(/^https?:\/\/www\.tongrenquan\.org\/tongren\/(.*)+?.html/.test(url)){
     let html = $response.body;
     let styleStr = '<style>.google-auto-placed,.adsbygoogle,.adsbygoogle-noablate{display:none !important;} *{background:#595757 !important;}</style>';
     html = html.replace(/<\/head>/,styleStr+'</head>');
     $done({ body: html });
}else{
    $done({});
}