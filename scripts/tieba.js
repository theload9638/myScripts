const url = $request.url;
if(url.includes('/user/profile')){
    let obj = JSON.parse($response.body);
    delete obj['finance_tab'];
    delete obj['namoaixud_entry'];
    delete obj['duxiaoman_entry'];
    $done({body:JSON.stringify(obj)});
}else{
    $done({})
}



