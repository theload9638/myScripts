/*
#!name=cs全能王解锁
#!desc=解锁会员+去广告
#!author=theload9638
#!version=7.12.0

[mitm]
hostname = api-cs-us.intsig.net,cs8.intsig.net,open*.camscanner.com

[rewrite_local]

^https?:\/\/(open|open-bak)\.camscanner\.com\/sync\/(get_ad_data|get_ad_cfg|upload_ad_record) url reject-200
^https?:\/\/(open|open-bak)\.camscanner\.com\/sync\/get_ad_control url jsonjq-response-body '.key_free_ad=1|.sdk_init_opt=1.ios_hot_start_show_ad_plan=0|.touch_forbid_launch_ad=0|.android_hot_start_pull_ad_plan=0|.is_show_personalized_ad=0|walk(if type == "object" and has("source_info") then .source_info=[] else . end)'

^https?:\/\/cs8\.intsig\.net\/ad\/cn\/property\/query url jsonjq-response-body '.data.remove_ad.property_status=1|.data.remove_ad.expire_time=253404825935739|.data.remove_ad.first_ad_free_status=1'

^https:\/\/api-cs-us\.intsig\.net\/user\/cs\/account_bind_find url jsonjq-response-body '.data.had_low_purchase=true|.data.is_bound=true'
^https:\/\/api-cs-us\.intsig\.net\/user\/cs\/reward\/reward_handle\? url jsonjq-response-body '.data.is_lifelong_vip=1|.data.value=1'
^https:\/\/api-cs-us\.intsig\.net\/user\/cs\/operating\/app\/get_forceupdate\? url jsonjq-response-body '{"ret":"1","data":{},"err":""}'
^https:\/\/api-cs-us\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/camscan.js
^https:\/\/api-cs-us\.intsig\.net\/purchase\/cs\/verify_products_ios\?  url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/camscan.js

*/
const url = $request.url;
if (!$response.body) {
    $done({});
    return;
}
try {
    let bd = JSON.parse($response.body);
    if (url.includes('/purchase/cs/query_property')) {
        bd.data.psnl_vip_property = {
            "group1_paid": 1,
            "ms_first_pay": 0,
            "vip_type": "svip",
            "auto_renewal": false,
            "in_trial": 0,
            "members_page": 1,
            "renew_type": "year",
            "pc_vip": 1,
            "renew_method": "appstore",
            "ys_first_pay": 0,
            "initial_tm": "1775038211",
            "vip_level_info": {
                "score": 11001,
                "level": 7,
                "next_score": 0,
                "start_score": 11001,
                "create_time": 1775038211
            },
            "grade": 1,
            "nxt_renew_tm": "0",
            "last_payment_method": "appstore",
            "level_info": {},
            "svip": 1,
            "pending": 0,
            "expiry": 9999999999,
            "inherited_flag": 0,
            "is_super_vip": 1,
            "group2_paid": 0
        };
        bd.data.removead = "1";
    } else if (url.includes('/purchase/cs/verify_products_ios')) {
        bd.data.svip_flag = 1;
        bd.data.show_guide = 0;
        bd.data.compress_premium.flag = 2;
        bd.data.formula_premium.flag = 0;
        bd.data.is_premium_cn = 1;
        bd.data.vip_level = {
            "card_flag": 0,
            "level_flag": 7,
            "card_flag_time": 1682870399,
            "card_title": "4"
        };
        bd.data.dual_trial_cn=1;
    }
    $done({ body: JSON.stringify(bd) });
} catch (e) {
    console.log('error : ' + e.message);
    $done({});
}