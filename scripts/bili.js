const url = $request.url;

if(url.includes('/resource/show/tab/v2')){
    let bd = JSON.parse($response.body);
    let v1 = ['直播','推荐','热门'];
    bd['data']['tab']=bd['data']['tab'].filter(i=>v1.includes(i.name));
    bd['data']['top']=bd['data']['top'].filter(i=>i.name==='消息');
    let v2 = ['首页','关注','我的','发布'];
    bd['data']['bottom']=bd['data']['bottom'].filter(i=>v2.includes(i.name));

    $done({body:JSON.stringify(bd)});
}else{
    $done({});
}