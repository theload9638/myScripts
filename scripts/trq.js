const url = $request.url;
let html = $response.body;
let styleStr = '<style>.google-auto-placed,.adsbygoogle,.adsbygoogle-noablate{display:none !important;} * {background:#595757 !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
$done({ body: html });