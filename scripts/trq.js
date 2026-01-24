const uint8Buffer = new Uint8Array($response.bodyBytes);
let html = new TextDecoder('gb2312',{ fatal: false, ignoreBOM: true }).decode(uint8Buffer);

let styleStr = '<style>#ad-container,.GoogleActiveViewInnerContainer,.google-auto-placed,video,#Image,#smx_wrap,#video-ad-ui,#aswift_9,#aswift_9_host,.adsbygoogle,.adsbygoogle-noablate{display:none !important;} * {background:#9c9999 !important;} .reading{ padding: 0px !important;}</style>';
html = html.replace(/<\/head>/, styleStr + '</head>');
html = html.replace('gb2312','utf-8');

const utf8Bytes = new TextEncoder().encode(html);
$done({ bodyBytes: utf8Bytes.buffer });