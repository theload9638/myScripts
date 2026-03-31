/*
 #!name=wink 净化解锁
 #!author=theload9638
 #!version=

[mitm]
hostname = api-wink.meitumv.com,api-sub.meitu.com,h5api-winkcut.meitu.com,web-rabbit.meitustat.com

[rewrite_local]
# wink
^https?:\/\/api-sub\.meitu\.com\/v2\/user\/vip_info_by_group\.json url jsonjq-response-body '.data.account_type=1|walk(if type == "boolean" then true else . end)'
^https?:\/\/api-sub\.meitu\.com\/v2\/entrance\/marketing\/get_marketing_module\.json url jsonjq-response-body 'walk(if type == "object" and has("banner_nav_switch") then .banner_nav_switch=0 else . end)'
^https?:\/\/api-sub\.meitu\.com\/v2\/user\/info_by_entrance\.json url jsonjq-response-body '.data.vip_info.account_type=1|.data.account_type=1|walk(if type == "boolean" then true else . end)'
^https?:\/\/api-sub\.meitu\.com\/v1\/virtual\/account\/balance\.json url jsonjq-response-body '.data.meiye_balance="999999"|.data.meidou_balance="999999"|.data.total_amount="999999"'
^https?:\/\/api-sub\.meitu\.com\/v1\/virtual\/account\/balance\/query_detail\.json url jsonjq-response-body '.data.meiye_available_amount="999999"|.data.meidou_available_amount="999999"|.data.total_amount="999999"|.data.meiye_forever_amount="999999"'

^https?:\/\/api-wink\.meitumv\.com\/common\/interact\.json url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wink.js
^https?:\/\/api-wink\.meitumv\.com\/user\/coin_info\.json url jsonjq-response-body '.data.vip_type=1|.data.show_coin=9999999|.data.coin=9999999'
^https?:\/\/api-wink\.meitumv\.com\/user\/show\.json url jsonjq-response-body '.data.coin=9999999|.data.friendship_status=1|.data.vip_type=1|.data.show_coin=9999999'
^https?:\/\/h5api-winkcut\.meitu\.com\/friends_pay\/index\.json url jsonjq-response-body '.data.banner_list=[]'
^https?:\/\/web-rabbit.meitustat.com\/report url reject-200
*/

const url = $request.url;
if (!$response.body) {
    $done({});
    return;
}
try {
    let bd = JSON.parse($response.body);
    if (typeof bd.data === 'object' && Object.keys(bd.data).length === 0) {
        $done({});
        return;
    }
    if (url.includes('/common/interact.json')) {
        if (bd.data.save_rec_popup_list) {
            bd.data.save_rec_popup_list = {}; // 移除弹窗
        }
        if (bd.data.hasOwnProperty('switch')) {
            const s = bd.data.switch;
            s.join_vip_intercept_dialog_banner.switch = 0; // 关闭banner
            s.music_download.switch = 1; // 开启音乐下载
            s.vip_sub_config_register.switch = 0;
            s.live_wallpaper_tip_h5.switch = 0; // 关闭动态壁纸设置提示
            s.hide_share_and_save_product_when_no_free_trail.switch = 0;
            s.video_edit_scene_recognition_threshold.switch = 1;
            s.video_edit_hevc.switch = 1;
            s.app_icon_switch.switch = 1; // app图标切换
        }
        bd.data.subscribe_rich_tip ??= {};
        bd.data.subscribe_text ??= {};
        bd.data.home_banner ??= [];
        bd.data.popup ??= {};
        bd.data.new_release_popup ??= {};
    } 

    $done({ body: JSON.stringify(bd) });
} catch (e) {
    console.log('error : ' + e.message);
    $done({});
}