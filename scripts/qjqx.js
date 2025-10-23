//wxapplet ddcx - qjqx
//cms\.htw\.delivery\.batch

const url = $request.url;
let apiUrl = url.split('?')[1].substr(4);
if(/cms\.htw\.delivery\.batch/.test(apiUrl)){
    let body = JSON.parse($response.body);
    body.data['qj-wxapplet-home-activity-center-hm-banner']={};
    $done({body:JSON.stringify(body)});
}else{
    $done({});
}




