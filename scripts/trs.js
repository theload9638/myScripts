const url = $request.url;
let uint8Buffer = new Uint8Array($response.bodyBytes);
let styleStr = '<style>*{background:#595757 !important;}</style>';
let html = new TextDecoder('utf-8', { fatal: false, ignoreBOM: true }).decode(uint8Buffer);
console.log(html);
html = html.replace(/<\/head>/, styleStr + '</head>');
let utf8Bytes = new TextEncoder().encode(html);
$done({ bodyBytes: utf8Bytes.buffer });