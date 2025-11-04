let html = $response.body;
const url = $request.url;
if (html) {
    html = html.replace(/<style>/g,'<style> .addbox,.modal,.slider-banners,.slider-wrapper,.infomation,.footer{display:none !important;} ');
    html = html.replace(/(<div\s*class=\"video-item\s*\"([^>]*)>)(.*?(?!<\/h3>).*?<\/div>)/gs,'<div style="display:none !important;" class="video-item "$2>$3');
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style> .list-sec-top,.list-sec,.common{display:none !important;}');
    }
    $done({ body: html });
}else{
    $done({});
}


