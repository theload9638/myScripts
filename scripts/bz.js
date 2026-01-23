let html = $response.body;
let styleStr = '<style>.slide-ad,#ad{display:none !important;} * {background:#a8a1a1 !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
$done({ body: html });