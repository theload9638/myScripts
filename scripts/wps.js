/*

 #!name=wps 增强
 #!author=theload9638
 #!desc=本地解锁+功能增强
 #!version=12.42.0

[mitm]
hostname = vas.wps.cn,www.kdocs.cn,moapi.wps.cn,clouddoc.wps.cn,account.wps.cn,vasclt.wps.cn，docer-api.wps.cn,drive.wps.cn,vip.wps.cn


[rewrite_local]
#更新方面
^https?:\/\/www\.kdocs\.cn\/kfc\/miniprovider\/v1\/cloud\/version\/data\? url jsonjq-response-body 'walk(if type == "object" and has("forceUpdate") then .forceUpdate=0 else . end)'
^https?:\/\/www\.kdocs\.cn\/api\/kdocs\/office\/prefetch\/config url jsonjq-response-body 'walk(if type == "object" and has("must_upgrade") then .must_upgrade=false else . end)'
#游客方面
^https?:\/\/moapi\.wps\.cn\/app\/ios\/v1\/app url jsonjq-response-body 'walk(if type == "object" and has("is_ban_visitor_mode") then .is_ban_visitor_mode=0 else . end)'
#报告
^https?:\/\/clouddoc\.wps\.cn\/office\/v5\/message\/mopush\/api\/user\/reportex url reject-200
^https?:\/\/vasclt\.wps\.cn\/csp-report url reject-200
#vip
^https?:\/\/account\.wps\.cn\/api\/v3\/mine\/vips\? url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
^https?:\/\/account\.wps\.cn\/p\/auth\/check url jsonjq-response-body '.is_plus=true'
^https?:\/\/docer-api\.wps\.cn\/proxy\/userinfo\/user\/v1\/vip_dl_times\?rmsp= url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
^https?:\/\/drive\.wps\.cn\/api\/v3\/userinfo url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
^https?:\/\/vip\.wps\.cn\/partner\/invoke\/usable url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
^https?:\/\/vas\.wps\.cn\/query\/api\/v1\/list_purchase_info\? url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
^https?:\/\/vas\.wps\.cn\/wx_adapter\/v1\/mp\/subscribe\/wps_vip url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js
#空间
^https?:\/\/drive\.wps\.cn\/api\/v3\/spaces url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/wps.js

*/

const url = $request.url;
if (!$response.body) {
    $done({});
    return;
}

try {
    let bd = JSON.parse($response.body);
    if (url.includes('/v3/mine')) {
        if (url.includes("/mine/vips")) {
            bd.vips = [
                {
                    "sku_key": "12",
                    "expire_time": 4092599349,
                    "effect_time": 4092599349,
                    "name": "稻壳会员",
                    "enable": null,
                    "memberid": '12',
                    "has_ad": 0,
                    "type": "vip"
                },
                {
                    "sku_key": "20",
                    "expire_time": 4092599349,
                    "effect_time": 4092599349,
                    "name": "WPS会员",
                    "memberid": '20',
                   "enable": null,
                    "has_ad": 0,
                    "type": "vip"
                },
                {
                    "sku_key": "40",
                    "memberid": '40',
                    "expire_time": 4092599349,
                    "effect_time": 4092599349,
                    "name": "超级会员",
                    "enable": null,
                    "has_ad": 0,
                    "type": "vip"
                },
                {
                    "sku_key": "vip_pro_plus",
                    "expire_time": 4092599349,
                    "effect_time": 4092599349,
                    "name": "WPS超级会员Pro套餐",
                    "enable": null,
                    "has_ad": 0,
                    "type": "vip"
                }
            ];
        } else {
            bd['is_plus'] = true;
        }
    } else if (url.includes('/api/v3/userinfo')) {
        bd['is_plus'] = true;
        bd.vipinfo = {
            'expire_time': '91766394691823',
            'memberid': 40,
            'name': '超级会员',
            'has_ad': 0,
            'enabled': [
                {
                    "name": "超级会员",
                    "memberid": 40,
                    "expire_time": 91766394691823
                },
                {
                    "name": "WPS会员",
                    "memberid": 20,
                    "expire_time": 91766394691823
                },
                {
                    "name": "稻壳会员",
                    "memberid": 12,
                    "expire_time": 91766394691823
                },
                {
                    "sku_key": "cloud_space",
                    "expire_time": 4092599349,
                    "effect_time": 4092599349,
                    "name": "个人空间（赠送）",
                    "type": "privilege"
                }
            ]
        };
        bd.privilege = {
            'create_group': true,
            'remain_group_num': 10000000000
        };
        bd.status = 'active';
    } else if (url.includes('/v3/islogin')) {
        bd.is_plus = true;
    } else if (url.includes('/proxy/userinfo/user/v1/vip_dl_times')) {
        bd['time-stamp'] = 91766394691823;
    } else if (url.includes('/invoke\/usable')) {
        bd = {
            result: 'ok',
            data: {
                'now': (new Date()).getTime(),
                'times': 'infinite',
                'expire_time': 91766394691823
            }
        };
    } else if (url.includes('/list_purchase_info')) {
        bd.data.merchandises = [
            {
                "sku_key": "vip_pro",
                'memberid': '40',
                "expire_time": 4092599349,
                "effect_time": 4092599349,
                "name": "超级会员",
                "type": "vip"
            },
            {
                "sku_key": "vip_pro_plus",
                "expire_time": 4092599349,
                "effect_time": 4092599349,
                "name": "WPS超级会员Pro套餐",
                "type": "vip"
            },
            {
                "sku_key": "cloud_space",
                "expire_time": 4092599349,
                "effect_time": 4092599349,
                "name": "个人空间（赠送）",
                "type": "privilege"
            },
               {
                "sku_key": "12",
                'memberid': '12',
                "expire_time": 4092599349,
                "effect_time": 4092599349,
                "name": "稻壳会员",
                "type": "vip"
            },
            {
                "sku_key": "vip",
                'memberid': '20',
                "expire_time": 4092599349,
                "effect_time": 4092599349,
                "name": "WPS会员",
                "type": "vip"
            }
        ];
    }else if(url.includes('/mp/subscribe/wps_vip')){
        if(bd.result.includes('error')){
            bd.msg='ok';
            bd.result='ok';
        }
    }else if(url.includes('/v3/spaces')){
        bd.total=1100585369600;
    }
    $done({ body: JSON.stringify(bd) });
} catch (e) {
    console.log('error : ' + e.message);
    $done({});
}