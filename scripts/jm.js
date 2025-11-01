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
}else{
    $done({});
}