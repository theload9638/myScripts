const url = $request.url;

if(url.includes('/resource/show/tab/v2')){
    let bd = JSON.parse($response.body);
    let v1 = ['直播','推荐','热门'];
    bd['data']['tab']=bd['data']['tab'].filter(i=>v1.includes(i.name));
    bd['data']['top']=bd['data']['top'].filter(i=>i.name==='消息');
    let v2 = ['首页','关注','我的'];
    bd['data']['bottom']=bd['data']['bottom'].filter(i=>v2.includes(i.name));
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v2/account/mine')){
    let bd = JSON.parse($response.body);
    let v1 = ['我的课程','我的钱包','我的直播','社区中心'];
    let v2 = ['设置','联系客服'];
    bd['data']['sections_v2'] = bd['data']['sections_v2'].map(i=>{
        if(i?.title==='我的服务'){
            i['items']=i['items'].filter(j=>v1.includes(j.title));
        }else if(i?.title==='更多服务'){
            i['items']=i['items'].filter(j=>v2.includes(j.title));
        }
        return i;
    });
    bd['data']['live_tip']={};
    delete bd['data']['mall_home'];
    bd['data']['enable_bili_link']=false;
    bd['data']['modular_vip_section']['subtitle']={};
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v2/search/square')){
    let bd = JSON.parse($response.body);
    bd['data'] = bd['data'].filter(i=>i.type!=='recommend');
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v2/feed/index')){
    let bd = JSON.parse($response.body);
    bd['data']['items']=bd['data']['items'].filter(i=>{
        return !i['card_type'].includes('banner') 
        || i['card_goto'].indexOf('ad')===-1 
        || !i.hasOwnProperty('ad_info');
    });
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v2/splash/list')){
    let bd = JSON.parse($response.body);
    bd['data']['show']=[];
    bd.data?.list.forEach(i=>{
        i.duration=0;
        i.begin_time=1762444799;
        i.end_time=1762444799;
    });
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/app-interface/v2/index/feed')){
    let bd = JSON.parse($response.body);
    bd['data']['card_list'] = bd['data']['card_list'].filter(i=>i['card_type'].indexOf('banner')===-1);
    $done({body:JSON.stringify(bd)});
}
else{
    $done({});
}