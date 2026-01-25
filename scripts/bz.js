let html = $response.body;
let styleStr = '<style>.slide-ad,.footer,.slide,#ad,#immersive-translate-popup{display:none !important;} * {background: #575353 !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
html = html.replace(/class=\"slide-ad\"/g,'');
html = html.replace(/<div\s*class=\"footer\"(.*)?/s,'</div></body></html>');
$done({ body: html });