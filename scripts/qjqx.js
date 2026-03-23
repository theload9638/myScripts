/*
 * #!name qdqx 净化
 * 
*******************************

[rewrite_local]
# ddcx
  # >首页 车主服务区域 + 优惠券区域
^https?:\/\/conf\.diditaxi\.com\.cn\/homepage\/v1\/other\/fast\? url reject-dict
  # >我的 去除底部卡片列表
^https?:\/\/common\.diditaxi\.com\.cn\/usercenter\/layout url jsonjq-response-body '.data.instances.center_widget_list.data=[]'

# ddcx - qjqx
^https?:\/\/htwkop-st\.xiaojukeji\.com/gateway\?api=cms\.htw\.delivery\.batch url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/qjqx.js 

[mitm]
hostname = conf.diditaxi.com,common.diditaxi.com,htwkop-st.xiaojukeji.com

 * 
 */

let body = JSON.parse($response.body);
let ads = [
    'qj-wxapplet-home-activity-center-hm-banner',
    'qj-wxapplet-home-activity-center-htw-banner',
    'h5-home-weixin-ads',
    'bike-homepage-popup',
    'qj-wxapplet-home-hm-daily-banner',
    'qj-wxapplet-home-htw-large-banner',
    'qj-wxapplet-home-hm-large-banner',
    'qj-wxapplet-home-htw-daily-banner',
    'bike-homepage-ad-banner'
];
if(body.data){
    ads.forEach(k=>delete body.data[k]);
}
$done({ body: JSON.stringify(body) });



