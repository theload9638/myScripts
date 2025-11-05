let html = $response.body;
const url = $request.url;
if (html && /^https?:\/\/heiliao\.com(?!\/(index|static))/.test(url)) {
    html = html.replace(/<style>/g,'<style> .addbox,.modal,.slider-banners,.slider-wrapper,.infomation,.footer{display:none !important;} .video-item{margin-top: .65rem;width:100%;display:none;} .video-item:has(h3){display:block !important;}');
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style> .list-sec-top,.list-sec,.common{display:none !important;}');
    }
    $done({ body: html });
}else if(html && /^https?:\/\/(www\.)?91cg1\.com(?!\/(index|static))/.test(url)){
    html = html.replace(/<style>/g,"<style> article,.adspop,horizontal-banner,#foot-menu,#footer{display:none !important;} article:has(span[itemprop='datePublished']){display:block !important;}")
    if(url.includes('/archives')){
        html = html.replace(/<style>/g,'<style> .article-ads-btn,.post-content,#comments{display:none !important;}');
    }
    $done({ body: html });
}
else{
    $done({});
}


