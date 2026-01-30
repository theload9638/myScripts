const uint8Buffer = new Uint8Array($response.bodyBytes);
const url = $request.url;
let html = new TextDecoder('gb2312', { fatal: false, ignoreBOM: true }).decode(uint8Buffer);

let bgColor = '#494747';
let styleStr = `#ad-container,.ad-video,.GoogleActiveViewInnerContainer,.google-auto-placed,video,#Image,#smx_wrap,#video-ad-ui,#aswift_9,#aswift_9_host,.adsbygoogle,.adsbygoogle-noablate{display:none !important;pointer-events: none !important;} *{background: ${bgColor} !important;} .infos{color:#78867e !important;}`;

html = html.replace(/<script.*?src=\"\/skin\/default\/js\/(tongji|googgg|goge|gls)\.js\"[^>]*>/g, '<script>');
html = html.replace(/<script(.*?)src=\".*?(?=www.googletagmanager.com).*?\"[^>]*>/g, '<script>');
html = html.replace(/<script(.*?)src=\".*?(?=pagead2.googlesyndication.com).*?\"[^>]*>/g, '<script>');
html = html.replace(/<script(.*?)src=\".*?(?=fundingchoicesmessages.google.com).*?\"[^>]*>/g, '<script>');

html = html.replace(/<ins(.*?)<\/ins>/gs, '');
html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
html = html.replace(/<video(.*?)<\/video>/gs, '');

html = html.replace('gb2312', 'utf-8');
if (/[a-zA-Z_]+\/\d+\.html/.test(url)) {
    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"readContent\">/s, '<div class="readContent">');
} else if (/[a-zA-Z_]+\/\d+\/\d+\.html/.test(url)) {
    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"topReadContent\"([^>]*?)>/s, '<div class="topReadContent">');
    styleStr = styleStr + ' .next_pre,.hotlist{display:none !important;pointer-events: none !important;}';
}

html = html.replace(/<\/head>/, '<style>' + styleStr + '</style></head>');

const gb2312Bytes = new TextEncoder().encode(html);
$done({ bodyBytes: gb2312Bytes.buffer });