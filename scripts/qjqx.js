//applet ddcx - qjqx
//cms\.htw\.delivery\.batch

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



