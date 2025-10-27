const url = $request.url;
if(url.includes('/user/profile')){
    let obj = JSON.parse($response.body);
    delete obj['finance_tab'];
    $done({body:JSON.stringify(obj)});
}else{
    $done({})
}



