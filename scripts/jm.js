const url = $request.url;

if(url.includes('/ad_template')){
    let html = $response.body;
    Array.from(html.matchAll(/<style>.*?<\/style>/gs)).forEach(match=>{
        html = html.replace(match,'');
    });
    html = html.replace(/<script>.*?(?=ad_encode).*?<\/script>/gs,'');
    html = html.replace(/<a.*?>.*?<\/a>/gs,'');
    html = html.replace(/resizeAd\(\)\s*;/g,'');
    html = html.replace(/AD/g,'');
    $done({body:html});
}else if(url.includes('/v1/api.php')){
    let body = JSON.parse($response.body);
    body['zones']=[];
    $done({body: JSON.stringify(body)});
}else if(url.includes('/chapter_view_template')){
    let html = $response.body;
    html = html.replace(/resizeAd\(\)\s*;/g,'');
    html = html.replace(/<div\s*(?:class=\"ad-body\"([^>]*?))style=\".*?\"\s*>/g,'<div class="ad-body" $1 style="height:0px;">');
    html = html.replace(/<a.*?(?:target=\"_blank\").*?>[\s\S]*?<\/a>/g,'');
    html = html.replace(/<ins[^>]*?><\/ins>/g,'');
    html = html.replace(/<div\s*class=\"group-notice\">/g,'<div>');
    html = html.replace('/AD/g','');
    $done({body:JSON.stringify(html)});
}else{
    $done({});
}