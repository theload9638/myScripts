const url = $request.url;
const type = $response.headers['Content-Type'];
console.log(type);
if (type.includes('text/html')) {
    let html = $response.body;
    let style = '#popup_box,.balance_insufficient_dialog_box,.banner_box,.banner,.note_box,.foot_box,.shortcut_box,#immersive-translate-popup,.place_holder_box,#comment_list,.dmca_box,.popular_box{display:none !important;pointer-events: none !important;}';

    html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');

    if (url.includes('/novel/chapter?id=')) {
        html = html.replace(/<div\s*class=\"article\"(.*?)code=\"3\">/gs, '<div class="article"$1 code="999" >')
    }
    html = html.replace(/<\/head>/, '<style>' + style + '</style></head>');

    $done({ body: html });
} else {
    //个人信息
    if (url.includes('/api/console/app/user/info')) {
        let bd = JSON.parse($response.body);
        bd.model.balance = 999999999.00;
        bd.model.salary = 999999999.00;
        bd.model.gameBalance = 999999999.0;
        bd.model.shareRate = 999999999.0;
        bd.model.freeAi = 1;
        bd.model.freeXj = 1;
        bd.model.roles.push({
            "id": "773078093760958465",
            "roleName": "vip",
            "roleDesc": "会员",
            "type": 1,
            "status": 1,
            "creatorId": "746392368932204788",
            "creatorName": "admin",
            "updateTime": "2022-09-30T04:48:39.000+00:00",
            "createTime": "2022-09-30T04:17:26.000+00:00",
            "available": null,
            "userRoles": null,
            "statusDesc": "正常",
            "typeDesc": "前台角色"
        });
        bd.model.vipLevel = 9;
        bd.model.isVip = true;
        bd.model.roleNames = "vip会员";
        $done({ body: JSON.stringify(bd) });
    }else{
        $done();
    }

}

