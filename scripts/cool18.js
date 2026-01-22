let html = $response.body;
let styleStr = '<style>td:has(iframe),.adv-6park,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;} * {background:#595757 !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
$done({ body: html });