const url = $request.url;
if(url.includes('/user/profile')){
    let obj = JSON.parse($response.body);
    let types = ['game','banner','commerce','common_func'];
    delete obj['finance_tab'];
    delete obj['namoaixud_entry'];
    delete obj['duxiaoman_entry'];
    delete obj['recom_naws_list'];
    delete obj['bubble_info'];
    delete obj['vip_banner'];
    obj['zone_info']=obj['zone_info'].
    filter(item=>!types.includes(item.type));
    
    $done({body:JSON.stringify(obj)});
}else if(url.includes('/sidebar/home')){
    let obj = JSON.parse($response.body);
    delete obj['vip_banner'];
    delete obj['game_center'];
    delete obj['tools'];

    $done({body: JSON.stringify(obj)});
}else{
    $done({})
}



