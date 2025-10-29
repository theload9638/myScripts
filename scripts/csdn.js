const url = $request.url;

if(url.includes('profile/app/get-ios-config')){
    let body = JSON.parse($response.body);
    let p1 = ['大学生专区','学习','直播','问答','关注'];
    let p2 = ['首页','消息','我的'];
    body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'] = body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'].filter(item=>{
        return !p1.includes(item.parameter.titleName);
    });
    body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'] = body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'].filter(item=>{
        return p2.includes(item.title);
    });
    $done({body: JSON.stringify(body)});
}else{
    $done({});
}