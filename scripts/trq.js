const url = $request.url;
const uint8Buffer = new Uint8Array($response.bodyBytes);
let html = new TextDecoder('gb2312',{ fatal: false, ignoreBOM: true }).decode(uint8Buffer);

let styleStr = '#ad-container,.ad-video,.GoogleActiveViewInnerContainer,.google-auto-placed,video,#Image,#smx_wrap,#video-ad-ui,#aswift_9,#aswift_9_host,.adsbygoogle,.adsbygoogle-noablate{display:none !important;pointer-events: none !important;} * {background: #494747 !important;} .reading{ padding: 0px !important;}';
html = html.replace(/<div\s*id=\"immersive-translate-popup\"(.*?)/s,'</html>');

html = html.replace(/<script.*?src=\"\/skin\/default\/js\/(tongji|googgg|goge|gls)\.js\"[^>]*>/g,'<script>');
html = html.replace(/<script(.*?)src=\".*?(?=www.googletagmanager.com).*?\"[^>]*>/g,'<script>');
html = html.replace(/<script(.*?)src=\".*?(?=pagead2.googlesyndication.com).*?\"[^>]*>/g,'<script>');
html = html.replace(/<script(.*?)src=\".*?(?=fundingchoicesmessages.google.com).*?\"[^>]*>/g,'<script>');

if(/[a-zA-Z_]+\/\d+\.html/.test(url)){
    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"readContent\">/s,'<div class="readContent">');
}else if(/[a-zA-Z_]+\/\d+\/\d+\.html/.test(url)){
    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"topReadContent\"([^>]*?)>/s,'<div class="topReadContent">');
    html = html.replace(/<ins(.*?)<\/ins>/gs,'');
    html = html.replace(/<iframe(.*?)<\/iframe>/gs,'');
    styleStr= styleStr +' .next_pre,.hotlist{display:none !important;pointer-events: none !important;}';
}

html = html.replace(/<\/head>/,'<style>'+styleStr+'</style></head>');
html = html.replace('gb2312','utf-8');

const utf8Bytes = new TextEncoder().encode(html);
$done({ bodyBytes: utf8Bytes.buffer });