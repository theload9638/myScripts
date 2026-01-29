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
        'www.lovedate.cc',
        's.magsrv.com',
        's3t3d2y1.afcdn.net',
        'banner',
        'adv-',
        'model-',
        '-model',
        'ad-',
        'ad_',
        '_ad',
        '_adv',
        '-ad',
        '-adv',
        'popup',
        'logo'
    ];
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let html = $response.body;
    let styleStr = 'ins,iframe,video{display:none !important;pointer-events: none !important;} div{ background-image:none !important;}';
    let bgColor = '#494747';
    domains.map(escapeRegExp).forEach(domain => {
        html = html.replace(new RegExp(`<([a-zA-Z0-9]+)\\s+[^>]*?(src|href|id|class)\\s*=\\s*(['"]).*?${domain}.*?\\3[^>]*?>`, 'gi'), '<$1>');
    });

    html = html.replace(/<ins(.*?)<\/ins>/gs, '');
    html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
    html = html.replace(/<video(.*?)<\/video>/gs, '');

    if (/^https?:\/\/syosetu\.org/.test(url)) {
        styleStr += '#footer{display:none !important;pointer-events: none !important;}';
    } else if (/^https?:\/\/hlib\.cc/.test(url)) {
        styleStr += '#suggest,#rnlist,#comments,#exo-native-widget-5098390-adX3C,.my-2,.pHS5vbgQ_main_outstream,.exo_wrapper_show,.container-xl{display:none !important;pointer-events: none !important;}';
        html = html.replace(/alert\(/g, "//");
    } else if (/^https?:\/\/www\.uaa(.*?)\.com/.test(url)) {
        styleStr += '.balance_insufficient_dialog_box,.note_box,.foot_box,.shortcut_box,.swiper-wrapper,.swiper-button-prev,.swiper-button-next,.place_holder_box,#comment_list,.dmca_box{display:none !important;pointer-events: none !important;}';
        if (url.includes('/novel/chapter?id=')) {
            html = html.replace(/<div\s*class=\"article\"(.*?)code=\"3\">/gs, '<div class="article"$1 code="999" >')
        }
    } else if (/^https?:\/\/www\.cool18\.com/.test(url)) {
        styleStr += 'td:has(iframe),.bottom-nav,.comment-section,.post-list,.view_ad_incontent,.view_ad_bottom,.vote-section,.view-gift,.view_tools_box,.adv-6park,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;} a:link{color: #fcfafb; !important;}';
        if (url.includes('app=forum&act=threadview')) {
            html = html.replace(/<div\s*class=\"ad-container\">(.*?)<div\s*class=\"main-content\">/s, '<div class="main-content">');
            styleStr = styleStr + ".subtitle-container,.bottom-nav,.comment-section,.post-list,.ai-detection-feedback{display:none !important;pointer-events: none !important;}";
        }
    } else if (/^https?:\/\/m\.diyibanzhu\.(me|rest)/.test(url)) {
        styleStr += '.slide-ad,.footer,.slide,#ad{display:none !important;pointer-events: none !important;} * {background: ' + bgColor + ' !important;}';
        html = html.replace(/class=\"slide-ad\"/g, '');
        if (url.includes('action=article')) {
            styleStr = styleStr + ' .header,.tuijian,#announceinfo{display:none !important;pointer-events: none !important;}';
        }
    }
    if (styleStr !== '') {
        html = html.replace(/<\/head>/, '<style>' + styleStr + '</style></head>');
    }
    $done({ body: html });
} else {
    $done();
}
