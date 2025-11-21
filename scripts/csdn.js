const url = $request.url;

if(url.includes('/get-ios-config?keys=homeTabTesting_7_B')){
    let body = JSON.parse($response.body);
    let p1 = ['大学生专区','学习','直播','问答','关注'];
    let p2 = ['首页','消息','我的'];
    body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'] = body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'].filter(item=>{
        return !p1.includes(item.parameter.titleName);
    });
    body.data['homeTabTesting_7_B']['homeParentTagsConfig']['selectTag']=0;
    body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'] = body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'].filter(item=>{
        return p2.includes(item.title);
    });
    $done({body: JSON.stringify(body)});
}else if(url.includes('/download.csdn.net/api/source/detail/v1/userInfo/')){
    let bd = JSON.parse($response.body);
    bd.data.downloadBtn2VipBool = true;
    bd.data.action = {
        ...bd.data.action,
        isSelfResource:true,
        isFreeDownload:true,
        isMoneyEnough:true,
        isVipEnough:true,
        isDownloaded:true
    };
    bd.data.content.sourceInfo.cbeans=0;
    bd.data.content.sourceInfo.score=0;
    bd.data.content.userBenefit.cbeans=9999;
    bd.data.content.userBenefit.score=9999;

    $done({body: JSON.stringify(bd)});
}
else{
    $done({});
}