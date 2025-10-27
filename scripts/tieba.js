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
    let others = ['度小满钱包','装扮中心','贴贝商城','印记中心','短故事','书架'];
    delete obj['vip_banner'];
    delete obj['game_center'];
    delete obj['tools']['yunying_tools_list'];
    obj['tools']['show_tools_list']=obj['tools']['show_tools_list'].
    filter(item=>item['class_name']==='社区工具').
    map(item=>{
        return item['tools_list'].filter(tool=>!others.includes(tool['title']));
    });
    obj['tools']['all_tools_list']=obj['tools']['all_tools_list'].filter(item=>!others.includes(item['title']));

    $done({body: JSON.stringify(obj)});
}else{
    $done({})
}



