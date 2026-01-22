const uint8Buffer = new Uint8Array($response.bodyBytes);
const html = iconv.decode(uint8Buffer, 'gb2312');

const styleStr = '<style>*{background:#595757 !important;}</style>';
const processedHtml = html.replace(/<\/head>/, styleStr + '</head>');

const gb2312Bytes = iconv.encode(processedHtml, 'gb2312');
$done({ bodyBytes: gb2312Bytes.buffer });