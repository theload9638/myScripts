let html = $response.body;
const url = $request.url;

let styleStr = 'td:has(iframe),.bottom-nav,#immersive-translate-popup,.comment-section,.post-list,.view_ad_incontent,.view_ad_bottom,.vote-section,.view-gift,.view_tools_box,.adv-6park,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;pointer-events: none !important;} * {background: #494747 !important;} a:link{color: #fcfafb; !important;}';

if(url.includes('app=forum&act=threadview')){
   html = html.replace(/<div\s*class=\"ad-container\">(.*?)<div\s*class=\"main-content\">/s,'<div class="main-content">'); 
   styleStr = styleStr + ".subtitle-container,.bottom-nav,.comment-section,.post-list,.ai-detection-feedback{display:none !important;pointer-events: none !important;}";
}

html = html.replace(/<script(.*?)src=\".*?(?=ad.parkvv.com).*?\"[^>]*>/g,'<script>');

html = html.replace(/<\/head>/, '<style>'+styleStr + '</style></head>');

$done({ body: html });
