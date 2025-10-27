const url = $request.url;
if(url.includes('/user/profile')){
    let obj = JSON.parse($response.body);
    let types = ['game','banner','commerce'];
    delete obj['finance_tab'];
    delete obj['namoaixud_entry'];
    delete obj['duxiaoman_entry'];
    obj['zone_info']=obj['zone_info'].filter(item=>!types.includes(item.type));
    obj['zone_info']=obj['zone_info'].map(item=>{
        if(item!=='common_func'){
            return item;
        }
        item['common_func']['common_func_other']=[];
        return item;
    });
    
    $done({body:JSON.stringify(obj)});
}else{
    $done({})
}



