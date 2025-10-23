//wxapplet ddcx - qjqx
//cms\.htw\.delivery\.batch

let body = JSON.parse($response.body);
//电单车底部卡片
body.data['qj-wxapplet-home-activity-center-hm-banner'] = {};
//单车底部的卡片
body.data['qj-wxapplet-home-activity-center-htw-banner'] = {};
//单车首页弹窗
body.data['bike-homepage-popup'] = {};
//广告
body.data['h5-home-weixin-ads'] = {};
//电单车的领券微信 和一些可能的广告弹窗
body.data['qj-wxapplet-home-hm-daily-banner'] = {};

// body.data['qj-wxapplet-home-htw-large-banner'] && (body.data['qj-wxapplet-home-htw-large-banner'].isAd = 0);
// body.data['qj-wxapplet-home-hm-large-banner'] && (body.data['qj-wxapplet-home-hm-large-banner'].isAd=0);
// body.data['qj-wxapplet-home-htw-daily-banner'] && (body.data['qj-wxapplet-home-htw-daily-banner'].isAd=0);
$done({ body: JSON.stringify(body) });



