const url = $request.url;

if(/^https?:\/\/www\.tongrenshe\.cc\/tongren\/(.*)+?.html/.test(url)){
     let html = $response.body;
     let styleStr = '<style>*{background:#595757 !important;}</style>';
     html = html.replace(/<\/head>/,styleStr+'</head>');
     $done({ body: html });
}else{
    $done({});
}