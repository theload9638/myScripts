/*
# !name=起点净化
# !author=theload9638

****************

[rewrite_local]

#qidian
  #猜你喜欢
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/dailyrecommend\/recommendBook url reject-dict
  #每日导读
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v2\/dailyrecommend\/getdailyrecommend url jsonjq-response-body '.Data.Items=[]'
  #开屏
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v4\/client\/getsplashscreen url jsonjq-response-body '.Data.List=[]|.Data.SplashTime=0|.Data.ShowTimes=0'
  #广告
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v2\/video\/adv url reject
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/(v1|v2)\/(bookshelf|client|adv)\/(getHoverAdv|iosad|getadvlistbatch|getad|getadvlist) url reject
  #弹窗/卡片
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/popup\/batchget url jsonjq-response-body '.Data.PopupList=[]'
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/(bookshelf|freshman|popup|booksquare|freshman|bookshelf)\/(getTopOperation|freshmanGuidePopup|getfloatcard) url jsonjq-response-body '{"Message":"未命中策略","Result":-452000}'
  #弹窗广告配置
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/getconf url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/getconfSpecify url jsonjq-response-body '.Data.AdvideoPositionConfig=[]'
  #更新配置
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/client\/iOSUpdateNew url jsonjq-response-body '.Data.ForceUpdate=0'
  #发现净化
^https:?\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/discovery/getdiscoverpagefeeds url jsonjq-response-body '.|del(.Data.AdvItem)|del(.Data.BroadCasts)'
  #章节净化
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v1\/assembly\/toolbar url jsonjq-response-body '.|del(.Data.Toolbar.Adv)'
  #签到
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v3/checkin\/getcurrentweekcheckininfo url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qd.js
  #页信息
^https?:\/\/(magev6|h5)\.if\.qidian\.com\/argus\/api\/v3/midpage\/pageinfo url jsonjq-response-body '{"Message":"","Result":-280015}'

[mitm]
hostname = magev6.if.qidian.com,h5.if.qidian.com

*/

const url = $request.url;
try {
  if (!$response.body) {
      $done({});
      return;
  }
  let bd = JSON.parse($response.body);
  if (url.includes('/v1/client/getconf')) {
    delete bd['Data']['ActivityPopup'];
    delete bd['Data']['AudioGuide'];
    delete bd['Data']['ActivityIcon'];
    delete bd['Data']['BookShelfBottomIcons'];
    if (bd.Data?.AudioConfig?.AudioUnLoginGuide) {
      delete bd.Data.AudioConfig.AudioUnLoginGuide;
    }
    bd['Data']['RemoveAllNotificationsOnTap'] = '1';
    bd['Data']['BusinessSplashCoolDownTime'] = '0';
    bd['Data']['AdVideoPositionConfig'] = [];
    bd['Data']['ClientLocalNotify2'] = [];
    bd['Data']['EnableSearchUser'] = '1';
    bd['Data']['IsFreeReadingUser'] = true;
    bd['Data']['SplashScreenRoundCount'] = 0;
    bd['Data']['CloudSetting']['ReadPageVideoTimes'] = '0';
  } else if (url.includes('/checkin/getcurrentweekcheckininfo')) {
    bd['Data']['AdvEnable'] = 0;
    bd['Data']['PushSwitchPopData']['ShowPop'] = 0;
    bd['Data']['ReCheckInCardCount'] = 99;
    bd['Data']['ReCheckPrice'] = 0;
    bd['Data']['IsMember'] = 1;
    bd['Data']['FreeRecheckChanceUsed'] = 0;
  }
  $done({ body: JSON.stringify(bd) });
} catch (e) {
  console.log('error: ' + e.message);
  $done({});
}