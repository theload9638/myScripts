const url = $request.url;

if(url.includes('/ad_template')){
    let html = $response.body;
    Array.from(html.matchAll(/<style>.*?<\/style>/gs)).forEach(match=>{
        html = html.replace(match,'');
    });
    html = html.replace(/<script>.*?(?=ad_encode).*?<\/script>/gs,'');
    html = html.replace(/<a.*?>.*?<\/a>/gs,'');
    html = html.replace(/resizeAd\(\)\s*;/g,'');
    $done({body:html});
}else{
    $done({});
}