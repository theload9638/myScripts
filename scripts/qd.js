/*
# !name=起点净化
# !author=theload9638

****************

[rewrite_local]

#qidian
  #猜你喜欢
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/dailyrecommend\/recommendBook url reject-dict
  #开屏
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v4\/client\/getsplashscreen url reject-200
  #广告
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v2\/video\/adv url reject-200
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/(v1|v2)\/(bookshelf|client|adv)\/(getHoverAdv|iosad|getadvlistbatch|getad|getadvlist) url reject-200
  #弹窗/卡片
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/(popup|booksquare|freshman|bookshelf|dailyrecommend)\/(batchget|getfloatcard|freshmanGuidePopup|getTopOperation|getdailyrecommend) url reject-dict
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/widget\/getContent url reject-dict
  #搜索
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/(v2|v1)\/booksearch\/(shardWord|hotWords|getsearchpage) url reject-dict
  #我的净化
^https:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v3\/user\/getaccountpage url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
  #弹窗广告配置
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/getconf url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/getconfSpecify url jsonjq-response-body '.Data.AdvideoPositionConfig=[]'
  #更新配置
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/iOSUpdateNew url jsonjq-response-body '.Data.ForceUpdate=0'
  #发现净化
^https:?\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/user\/getsimplediscover url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
^https:?\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/discovery/getdiscoverpagefeeds url jsonjq-response-body '.|del(.Data.AdvItem)|del(.Data.BroadCasts)'
  #章节净化
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/assembly\/toolbar url jsonjq-response-body '.|del(.Data.Toolbar.Adv)'
  #签到
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v2\/checkin\/simpleinfo url jsonjq-response-body '.|del(.Data.PushSwitchPopData)|.Data.MemberFlag=1'
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v3\/checkin\/getcurrentweekcheckinfo url jsonjq-response-body '.|del(.Data.PushSwitchPopData)|.Data.AdvEnable=0|.Data.IsMember=1|.Data.FreeRecheckChanceUsed=1'

[mitm]
hostname = magev6.if.qidian.com,h5.if.qidian.com

*/

const url = $request.url;

if(url.includes('/user/getaccountpage')){
    let body = JSON.parse($response.body);
    let v1 = ['游戏中心','卡牌广场','周边商城'];
    let v2 = ['我发布的','关注收藏','我的全订','浏览记录'];
    body['Data']['BenefitButtonList']=body['Data']['BenefitButtonList'].filter(i=>!v1.includes(i['Name']));
    body['Data']['FunctionButtonList']=body['Data']['FunctionButtonList'].filter(i=>v2.includes(i['Name']));
    body['Data']['BottomButtonList']=body['Data']['BottomButtonList'].filter(i=>i['Name'].includes('帮助'));
    body['Data']['Member']['SubTitle']='';
    body['Data']['Member']['isMember']=1;
    body['Data']['Member']['ExpireTime']=4930070511912;
    body['Data']['Member']['IsAuto']=1;
    delete body['Data']['AccountBalance']['RechargeAd'];
    body['Data']['AccountBalance']['YdFreeBalance']=9999;
    body['Data']['AccountBalance']['YdBalance']=9999;
    body['Data']['AccountBalance']['YdWorthBalance']=9999;
    body['Data']['AccountBalance']['QdWorthBalance']=9999;
    body['Data']['AccountBalance']['QdBalance']=9999;
    body['Data']['AccountBalance']['QdFreeBalance']=9999;
    body['Data']['AccountBalance']['Coupon']=9999;
    body['Data']['AccountBalance']['NewCoupon']=9999;
    $done({body:JSON.stringify(body)});
}else if(url.includes('/v1/client/getconf')){
    let bd = JSON.parse($response.body);
    delete bd['Data']['ActivityPopup'];
    delete bd['Data']['AudioGuide'];
    delete bd['Data']['ActivityIcon'];
    delete bd['Data']['BookShelfBottomIcons'];
    delete bd['Data']['AudioConfig']['AudioUnLoginGuide'];
    bd['Data']['RemoveAllNotificationsOnTap']='1';
    bd['Data']['BusinessSplashCoolDownTime']='0';
    bd['Data']['AdVideoPositionConfig']=[];
    bd['Data']['ClientLocalNotify2']=[];
    bd['Data']['EnableSearchUser']='1';
    bd['Data']['IsFreeReadingUser']=true;
    bd['Data']['Member']={
      'ExpireTime':4930070511912,
      'IsAuto':1,
      'IsMember':1,
      'ExpireTimeMonth':12,
      'NextFeeTime':0,
      'FirstOpenStatus':1,
      'NextPayFee':0,
      'FirstOpenDesc':'',
      'ExpireTimeYear':12,
      'MemberType':1
    };
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