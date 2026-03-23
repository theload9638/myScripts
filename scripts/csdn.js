/*
 * #!name csdn 净化
*******************************

[rewrite_local]
#csdn
  #首页/我的净化
^https?:\/\/app-gw\.csdn\.net\/community\/.*\/profile\/app\/get-ios-config\?keys=homeTabTesting_7_B url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/csdn.js
^https?:\/\/app-gw\.csdn\.net\/community\/.*\/profile\/app\/version\/config url jsonjq-response-body '.|del(.data.homepage_pop)|del(.data.myAd)'
^https?:\/\/app-gw\.csdn\.net\/ucvip-wrapper\/vip\/.*\/app\/vip_permission\/get_user_vip_info url jsonjq-response-body '.|del(.data.activityAdModList)|del(.data.permissionInfoList)|del(.data.newRegisterActConfig)|del(.data.userCardConfig)'
^https?:\/\/app-gw\.csdn\.net\/ucvip-wrapper\/vip\/.*\/app\/vip_permission\/get_vip_permission url reject-dict
  #疑似广告
^https?:\/\/app-gw\.csdn\.net\/silkroad-api\/api\/.*\/assemble\/list\/pub\/channel\/(app_open_screen_ad|app_ad_v1) url reject-200
^https?:\/\/app-gw\.csdn\.net\/silkroad-api\/api\/.*\/assemble\/list\/pub\/channel\/app_no_ads_user url jsonjq-response-body '.data.isNoAdsUser=true'
^https?:\/\/app-gw\.csdn\.net\/abtesting\/.*\/getList url reject-200
^https?:\/\/app-gw\.csdn\.net\/adThird url reject-dict
^https?:\/\/unet\.quark\.cn\/.*\/ad/show url reject-200
^https?:\/\/img-home\.csdnimg\.cn\/data_json\/jsconfig\/redPacket\.json url reject-dict
  #开屏广告
^https?:\/\/(v2)?mi\.gdt\.qq\.com\/(server_bidding2|gdt_mview\.fcg) url reject-200

[mitm]
hostname = app-gw.csdn.net,img-home.csdnimg.cn,unet.quark.cn,v2mi.gdt.qq.com,mi.gdt.qq.com

* 
 */

const url = $request.url;

if (url.includes('/get-ios-config?keys=homeTabTesting_7_B')) {
    let body = JSON.parse($response.body);
    let p1 = ['大学生专区', '学习', '直播', '问答', '关注'];
    let p2 = ['首页', '消息', '我的'];
    body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'] = body.data['homeTabTesting_7_B']['homeParentTagsConfig']['tags'].filter(item => {
        return !p1.includes(item.parameter.titleName);
    });
    body.data['homeTabTesting_7_B']['homeParentTagsConfig']['selectTag'] = 0;
    body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'] = body.data['homeTabTesting_7_B']['tabbarConfig']['tabNamesList'].filter(item => {
        return p2.includes(item.title);
    });
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}