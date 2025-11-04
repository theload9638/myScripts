const html = $response.body;
const url = $request.url;
if (/heiliao|18hlw/.test(url) && html) {
    html = html.replace(/<style>/g,'<style> .addbox{display:none !important;} .modal{display:none !important;} .slider-banners{display:none !important;} .slider-wrapper{display:none !important;} .infomation{display:none !important;} .footer{display:none !important;} ');
    html = html.replace(/<div\s*class=\"video-item\"[^>]*>.*?(?!<\/h3>).*?<\/div>/gs,'');
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style>.list-sec-top{display:none !important;} .list-sec{display:none !important;} .common{display:none !important;}');
    }
    $done({ body: html });
}else{
    $done({});
}


