const url = $request.url;

if(/^https?:\/\/www\.tongrenquan\.org\/tongren\/(.*)+?.html/.test(url)){
     let html = $response.body;
     let styleStr = '<style>.google-auto-placed,.adsbygoogle,.adsbygoogle-noablate{display:none !important;} *{background:#595757 !important;}</style>';
     html = html.replace(/<\/head>/,styleStr+'</head>');
     $done({ body: html });
}else{
    $done({});
}