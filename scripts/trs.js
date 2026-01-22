const uint8Buffer = new Uint8Array($response.bodyBytes);
const html = new TextDecoder('gb2312',{ fatal: false, ignoreBOM: true }).decode(uint8Buffer);
const styleStr = '<style>*{background:#595757 !important;}</style>';
let processedHtml = html.replace(/<\/head>/, styleStr + '</head>');
processedHtml = processedHtml.replace('gb2312','utf-8');
const gb2312Bytes = new TextEncoder().encode(processedHtml);
$done({ bodyBytes: gb2312Bytes.buffer });