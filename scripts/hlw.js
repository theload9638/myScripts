let html = $response.body;
const url = $request.url;
if (html) {
    html = html.replace(/<style>/g,'<style> .addbox,.modal,.slider-banners,.slider-wrapper,.infomation,.footer{display:none !important;} .video-item{margin-top: .65rem;width:100%;display:none;} .video-item:has(h3){display:block !important;}');
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style> .list-sec-top,.list-sec,.common{display:none !important;}');
    }
    $done({ body: html });
}else{
    $done({});
}


