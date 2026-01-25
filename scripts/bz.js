let html = $response.body;
const url = $request.url;
let styleStr = '.slide-ad,.footer,.slide,#ad,#immersive-translate-popup{display:none !important;pointer-events: none !important;} * {background: #494747 !important;}';
html = html.replace(/class=\"slide-ad\"/g,'');
html = html.replace(/<div\s*class=\"footer\"(.*)?/s,'</div></body></html>');
if(url.includes('action=article')){
    styleStr = styleStr + ' .header,.tuijian,#announceinfo{display:none !important;pointer-events: none !important;}';
}
html = html.replace(/<\/head>/, '<style>'+styleStr + '</style></head>');
$done({ body: html });