/*
# !name=起点净化
# !author=theload9638

****************

[rewrite_local]

#qidian
  #猜你喜欢
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/dailyrecommend\/recommendBook\? url reject-dict
  #开屏
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v4\/client\/getsplashscreen\? url reject-200
  #图标/banner/弹窗广告
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/(v1|v2|v4)\/(bookshelf|adv|client|popup|freshman|dailyrecommend)\/(getHoverAdv|getad|getadvlistbatch|getsplashscreen|batchget|iosad|freshmanGuidePopup|getdailyrecommend|getTopOperation) url reject-200
  #我的净化
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v3\/user\/getaccountpage url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
  #弹窗广告配置
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/client\/getconf url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/client\/getconfSpecify url jsonjq-response-body '.Data.AdvideoPositionConfig=[]'
  #更新配置
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/client\/iOSUpdateNew url jsonjq-response-body '.Data.ForceUpdate=0'
  #发现净化
^https:?\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/user\/getsimplediscover url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
^https:?\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/discovery/getdiscoverpagefeeds url jsonjq-response-body '.|del(.Data.AdvItem)|del(.Data.BroadCasts)'
  #章节净化
^https?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/assembly\/toolbar url jsonjq-response-body '.|del(.Data.Toolbar.Adv)'

[mitm]
hostname = magev6.if.qidian.com

*/

const url = $request.url;

if(url.includes('/v3/user/getaccountpage')){
    let body = JSON.parse($response.body);
    let v1 = ['游戏中心','卡牌广场','周边商城'];
    let v2 = ['我发布的','关注收藏','我的全订','浏览记录'];
    body['Data']['BenefitButtonList']=body['Data']['BenefitButtonList'].filter(i=>!v1.includes(i['Name']));
    body['Data']['FunctionButtonList']=body['Data']['FunctionButtonList'].filter(i=>v2.includes(i['Name']));
    body['Data']['BottomButtonList']=body['Data']['BottomButtonList'].filter(i=>i['Name'].includes('帮助'));
    body['Data']['Member']['SubTitle']='';
    $done({body:JSON.stringify(body)});
}else if(url.includes('/v1/client/getconf')){
    let bd = JSON.parse($response.body);
    delete bd['Data']['ActivityPopup'];
    delete bd['Data']['ActivityIcon'];
    delete bd['Data']['BookShelfBottomIcons'];
    bd['Data']['AdVideoPositionConfig']=[];
    bd['Data']['ClientLocalNotify2']=[];
    bd['Data']['EnableSearchUser']='1';
    bd['Data']['IsFreeReadingUser']=true;
    bd['Data']['SplashScreenRoundCount']=0;
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v1/user/getsimplediscover')){
    let bd = JSON.parse($response.body);
    let v1 =['游戏','游戏中心f','周边商城','卡牌广场','热门角色'];
    bd['Data']['Items'] = bd['Data']['Items'].filter(i=>!v1.includes(i['ShowName']));
    $done({body:JSON.stringify(bd)});
}
else{
    $done({});
}