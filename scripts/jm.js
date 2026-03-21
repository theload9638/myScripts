// Jm去广告,超级净化,支持App和网页版
const url = $request.url;

if (url.includes('/ad_template')) {
    let html = $response.body;
    if (html) {
        html = html.replace(/<style>[^<]*?<\/style>/g, '');
        html = html.replace(/<script>.*?(?=ad_encode).*?<\/script>/gs, '');
        html = html.replace(/<a[^>]*?>[^<]*?<\/a>/g, '');
        html = html.replace(/AD/g, '');
    }
    $done({ body: html });
} else if (url.includes('/chapter_view_template')) {
    let html = $response.body;
    if (html) {
        html = html.replace(/resizeAd\(\)\s*;/g, '');
        html = html.replace(/<div\s*(?:class=\"ad-body\"([^>]*?))style=\".*?\"\s*>/g, '<div class="ad-body" $1 style="height:0px;">');
        html = html.replace(/<a.*?(?:target=\"_blank\").*?>[\s\S]*?<\/a>/g, '');
        html = html.replace(/<script[^<]*?src=\".*?ad-provider\.js\"[^>]*?>[\s\S]*?(<div class=\"group-notice\")>/g, '$1');
        html = html.replace(/<div\s*class=\"group-notice\"\s*>?\s*AD/g, '<div>');
        html = html.replace(/resizeAd\(\)\s+[^{}]/g,'');
        html = html.replace(/.group-notice\s*{/g,'.group-notice{\n display:none !important;');
    }
    $done({ body: html });
} else {
    $done({});
}