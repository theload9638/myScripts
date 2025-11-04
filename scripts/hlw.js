const html = $response.body;
const url = $request.url;
if(!$response.headers['Content-Type'].includes('text/html')){
    $done({});
    return
}
if (/(heiliao|18hlw)(?!\/index)/.test(url) && html) {
    html = html.replace(/<style>/g,'<style> .addbox,.modal,.slider-banners,.slider-wrapper,.infomation,.footer{display:none !important;} ');
    html = html.replace(/<div\s*class=\"video-item\"[^>]*>.*?(?!<\/h3>).*?<\/div>/gs,'');
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style> .list-sec-top,.list-sec,.common{display:none !important;}');
    }
    $done({ body: html });
}else{
    $done({});
}


