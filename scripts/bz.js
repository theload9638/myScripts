let html = $response.body;
let styleStr = '<style>.slide-ad,.footer,.slide,#ad,#immersive-translate-popup{display:none !important;} * {background: #dbd7d7 !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
html = html.replace(/class=\"slide-ad\"/g,'class="a"');
html = html.replace(/<div\s*id="immersive-translate-popup"(.*?)/,'</html>');
$done({ body: html });