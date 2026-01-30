const url = $request.url;
let type = $response.headers['Content-Type'];

if (type.includes("text")) {
    let domains = [
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'pagead2.googlesyndication.com',
        'fundingchoicesmessages.google.com',
        'cd.ladsp.com',
        'a.magsrv.com',
        'bundlemoviepumice.com',
        'ad.parkvv.com',
        'go.mavrtracktor.com',
        'creative.mavrtracktor.com',
        'guidepaparazzisurface.com',
        'diagramjawlineunhappy.com',
        'img.doppiocdn.com',
        'ttavej.com',
        'www.interactivebrokers.com',
        'www.lovedate.cc',
        '29782a430255d79f2wap.jigool.org',
        's.magsrv.com',
        's3t3d2y1.afcdn.net',
        '29628kldxjjs.eyiyoxz.xyz',
        '29628odxjccp.nszzkeh.com',
        'cdn.pubfuture-ad.com',
        '29920kldxjjs.dxzgwti.com',
        'hm.baidu.com',
        'nsclick.baidu.com',
        'api.popin.cc',
        'ad.tagtoo.co',
        'onead.onevision.com.tw',
        '.tagtoo.co',
        'adc.tamedia.com.tw',
        'pos.baidu.com',
        'wn.pos.baidu.com',
        'cpro.baidustatic.com',
        'banner',
        'ad-provider',
        'adBlock',
        '_ad',
        'ads',
        '/ad',
        '/ad-',
        '_adv',
        '-ad',
        '-adv',
        'video',
        'audio',
        'popup',
        'collect'
    ];
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let html = $response.body;
    let styleStr = 'ins,iframe,video,audio,.banner,#banner,.adBlock,#adBlock,.ad-mob,.mobile-ad,.m-ad,.popup,.ads,.advertisement,embed,object,.ad,.ad-container,.ad-wrap,.ad-box,#ad,.footer,#footer{display:none !important;pointer-events: none !important;user-select: none !important;} div{ background-image:none !important;}';
    let bgColor = '#494747';
    
    html = html.replace(/<ins(.*?)<\/ins>/gs, '');
    html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
    html = html.replace(/<video(.*?)<\/video>/gs, '');

    if (/^https?:\/\/hlib\.cc/.test(url)) {
        styleStr += '#suggest,#rnlist,#comments,#exo-native-widget-5098390-adX3C,.my-2,.pHS5vbgQ_main_outstream,.exo_wrapper_show,.container-xl{display:none !important;pointer-events: none !important;}';
        html = html.replace(/alert\(/g, "//");
    } else if (/^https?:\/\/www\.uaa(.*?)\.com/.test(url)) {
        styleStr += '.center_box,.logo_box,.balance_insufficient_dialog_box,.note_box,.foot_box,.shortcut_box,.swiper-wrapper,.swiper-button-prev,.swiper-button-next,.place_holder_box,#comment_list,.dmca_box{display:none !important;pointer-events: none !important;}';
        if (url.includes('/novel/chapter?id=')) {
            html = html.replace(/<div\s*class=\"article\"(.*?)code=\"3\">/gs, '<div class="article"$1 code="999" >');
            styleStr +=' .menu_box,.more_menu,.avatar{display:none !important;pointer-events: none !important;}';
        }
    } else if (/^https?:\/\/www\.cool18\.com/.test(url)) {
        styleStr += '.bottom-nav,.comment-section,.post-list,.vote-section,.view-gift,.view_tools_box,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;} a:link{color: #fcfafb; !important;}';
        if (url.includes('act=threadview')) {
            html = html.replace(/<div\s*class=\"ad-container\">(.*?)<div\s*class=\"main-content\">/s, '<div class="main-content">');
            styleStr = styleStr + ".subtitle-container,.bottom-nav,.comment-section,.post-list,.ai-detection-feedback{display:none !important;pointer-events: none !important;}";
        }
    } else if (/^https?:\/\/m\.diyibanzhu\.(me|rest)/.test(url)) {
        styleStr += '.slide{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;}';
        if (url.includes('action=article')) {
            styleStr = styleStr + ' .header,.tuijian,#announceinfo{display:none !important;pointer-events: none !important;}';
        }
    }else if(/^https?:\/\/m\.shuhaige\.net\/\d+\/\w+\.html/.test(url)){
        styleStr += '.path,.tui,.bYtYBpFi,.tmwac{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;}';
        html = html.replace(/<script[^>]*>.*?<\/script>/gs,'');
        html = html.replace(/<div\s*style=\"margin:0;padding:0;outline:0;margin-top:15px\">/,'<div style="display:none !important;">')
        html = html.replace(/<([a-z]+)\s+style=\"display:\s*block;\s*z-index:\s*\d+;\s*position:\s*fixed;.*?\"><\/\1>/gi,'');
    }else if(/https?:\/\/www\.novel543\.com/.test(url)){
        if(/\/\d+(\/)?(dir)?$/.test(url)){
            styleStr += '.mt-3,aside,.sidebar,.is-9{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;}';
        }else if(/\/\d+\/w+\.html/.test(url)){
            styleStr += 'img{display:none !important;pointer-events: none !important;}';
            html = html.replace(/<([a-zA-Z0-9]+)\s+[^>]*?(src|href|class|id)\s*=\s*(['"])[^'"]*?\/auth\/govip[^'"]*?\3[^>]*?>/gi, '<$1 style="display:none !important;pointer-events: none !important;">');
        }
    }
    domains.map(escapeRegExp).forEach(domain => {
        html = html.replace(new RegExp(`<([a-zA-Z0-9]+)\\s+[^>]*?(src|href|class|id)\\s*=\\s*(['"])[^'"]*?${domain}[^'"]*?\\3[^>]*?>`, 'gi'), '<$1 style="display:none !important;pointer-events: none !important;">');
    });
    html = html.replace(/<([a-zA-Z0-9]+)\s+[^>]*?(src|href)\s*=\s*(['"])[^'"]*?\/\/\d+[a-z]+\.[a-z]+.\.(cc|com|xyz|net|org):?[^'"]*?\3[^>]*?>/gi, '<$1 style="display:none !important;pointer-events: none !important;">');
    if (styleStr !== '') {
        html = html.replace(/<\/head>/, '<style>' + styleStr + '</style></head>');
    }
    $done({ body: html });
} else {
    $done();
}
