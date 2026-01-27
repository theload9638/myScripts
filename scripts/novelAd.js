const url = $request.url;
let type = $response.headers['Content-Type'];

if (type.includes("html")) {
    let html = $response.body;
    let styleStr = '';
    html = html.replace(/<script(.*?)src=\".*?(?=www.googletagmanager.com).*?\"[^>]*>/g, '<script>');
    html = html.replace(/<script(.*?)src=\".*?(?=www.google-analytics.com).*?\"[^>]*>/g, '<script>');
    html = html.replace(/<script(.*?)src=\".*?(?=pagead2.googlesyndication.com).*?\"[^>]*>/g, '<script>');
    html = html.replace(/<script(.*?)src=\".*?(?=fundingchoicesmessages.google.com).*?\"[^>]*>/g, '<script>');
    html = html.replace(/<script(.*?)src=\".*?(?=cd.ladsp.com).*?\"[^>]*>/g, '<script>');
    html = html.replace(/<ins(.*?)<\/ins>/gs,'');
    html = html.replace(/<iframe(.*?)<\/iframe>/gs,'');
    if(/^https?:\/\/syosetu\.org/.test(url)){
        styleStr += '#footer,#immersive-translate-popup{display:none !important;pointer-events: none !important;}';
    }
    if(styleStr!==''){
        html = html.replace(/<\/head>/, '<style>'+styleStr +'</head>');
    }
    $done({ body: html });
} else {
    $done();
}
