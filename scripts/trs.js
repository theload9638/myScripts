const uint8Buffer = new Uint8Array($response.bodyBytes);
const url = $request.url;

let html = new TextDecoder('gb2312',{ fatal: false, ignoreBOM: true }).decode(uint8Buffer);

let styleStr = '*{background: #494747 !important;}';

html = html.replace('gb2312','utf-8');
if(/[a-zA-Z_]+\/\d+\/\d+\.html$/.test(url)){
    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"topReadContent\"([^>]*?)>/s,'<div class="topReadContent">');
    styleStr= styleStr +' .next_pre,.hotlist{display:none !important;pointer-events: none !important;}';
}

html = html.replace(/<\/head>/, '<style>'+styleStr + '</style></head>');

const gb2312Bytes = new TextEncoder().encode(html);
$done({ bodyBytes: gb2312Bytes.buffer });