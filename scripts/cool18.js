let html = $response.body;
let styleStr = '<style>td:has(iframe),.bottom-nav,.comment-section,.post-list,.view_ad_bottom,.vote-section,.view-gift,.view_tools_box,.adv-6park,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;} * {background: #706a6a !important;} a:link{color: #fcfafb; !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
$done({ body: html });
