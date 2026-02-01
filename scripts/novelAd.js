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
        'googleads.g.doubleclick.net',
        'jl00.jkugbfvh.icu',
        '.tagtoo.co',
        'y.clarity.ms',
        'adc.tamedia.com.tw',
        'pos.baidu.com',
        'wn.pos.baidu.com',
        'cpro.baidustatic.com',
        'banner',
        'ad-provider',
        'textad',
        'adBlock',
        'javlib',
        '_ad',
        'ads',
        '/ad',
        'logo',
        '/ad-',
        '_adv',
        'ad-body',
        '-ad',
        '-adv',
        'javascript:void(0)',
        'video',
        'audio',
        'popup',
        'collect'
    ];
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let html = $response.body;
    let styleStr = 'ins,iframe,video,audio,#__copy,div[data-ad],.banner,.ad-body,.logo_box,.ad_encode,#ad_encode,#ad-body,#banner,.ad-video,#video-ad-ui,.copyright,.GoogleActiveViewInnerContainer,.adsbygoogle,.adsbygoogle-noablate.google-auto-placed,#ad-video,#ad-container,.adBlock,#adBlock,.ad-mob,#ad-mob,.mobile-ad,#mobile-ad,.m-ad,#m-ad,.popup,.ads,#ads,.advertisement,#advertisement,embed,object,.ad,.ad-container,.ad-wrap,#ad-wrap,.ad-box,#ad-box,#ad,.footer,#footer{display:none !important;pointer-events: none !important;user-select: none !important;}';
    let bodyStr = '';
    let bgColor = '#494747';
    let enableBgColor = true;
    let enableFloatyWindow = true;
    let ignoreDivImg = true;

    try {
        let rule = new RegExp(`<meta[^>]*?charset\\s*=\\s*(['"]?)([^>'"]+)(['"]?)`, 'gi');
        let charsetRes = rule.exec(html);
        let charset = 'utf8';
        let utf8Flag = true;
        if (charsetRes) {
            charset = charsetRes[2] || 'utf8';
            charset = charset.trim();
        }
        if (/utf-?8/i.test(charset)) {
            utf8Flag = true;
            if (/^https?:\/\/hlib\.cc/.test(url)) {
                styleStr += '#suggest,#rnlist,#comments,#exo-native-widget-5098390-adX3C,.my-2,.pHS5vbgQ_main_outstream,.exo_wrapper_show,.container-xl{display:none !important;pointer-events: none !important;}';
                html = html.replace(/alert\(/g, "//");
            } else if (/^https?:\/\/www\.uaa(.*?)\.com/.test(url)) {
                styleStr += '.center_box,.balance_insufficient_dialog_box,.note_box,.foot_box,.shortcut_box,.swiper-wrapper,.swiper-button-prev,.swiper-button-next,.place_holder_box,#comment_list,.dmca_box{display:none !important;pointer-events: none !important;}';
                if (url.includes('/novel/chapter?id=')) {
                    html = html.replace(/<div\s*class=\"article\"(.*?)code=\"3\">/gs, '<div class="article"$1 code="999" >');
                    styleStr += ' .menu_box,.more_menu,.avatar{display:none !important;pointer-events: none !important;}';
                }
            } else if (/^https?:\/\/www\.cool18\.com/.test(url)) {
                styleStr += '.bottom-nav,.comment-section,.post-list,.vote-section,.view-gift,.view_tools_box,.root--26nWL,.bottomRight--h0VsQ,.slideAnimation--2ih2G{display:none !important;pointer-events: none !important;} a:link{color: #fcfafb; !important;}';
                if (url.includes('act=threadview')) {
                    html = html.replace(/<div\s*class=\"ad-container\">(.*?)<div\s*class=\"main-content\">/s, '<div class="main-content">');
                    styleStr = styleStr + ".subtitle-container,.bottom-nav,.comment-section,.post-list,.ai-detection-feedback{display:none !important;pointer-events: none !important;}";
                }
            } else if (/^https?:\/\/m\.diyibanzhu\.(me|rest)/.test(url)) {
                styleStr += '.slide{display:none !important;pointer-events: none !important;}';
                if (url.includes('action=article')) {
                    styleStr = styleStr + ' .header,.tuijian,#announceinfo{display:none !important;pointer-events: none !important;}';
                }
            } else if (/^https?:\/\/m\.shuhaige\.net\/\d+\/\w+\.html/.test(url)) {
                styleStr += '.path,.tui,.bYtYBpFi,.tmwac{display:none !important;pointer-events: none !important;}';
                html = html.replace(/<script[^>]*>.*?<\/script>/gs, '');
                html = html.replace(/<div\s*style=\"margin:0;padding:0;outline:0;margin-top:15px\">/, '<div style="display:none !important;">')
                html = html.replace(/<([a-z]+)\s+style=\"display:\s*block;\s*z-index:\s*\d+;\s*position:\s*fixed;.*?\"><\/\1>/gi, '');
            } else if (/https?:\/\/www\.novel543\.com/.test(url)) {
                if (/\/\d+(\/)?(dir)?$/.test(url)) {
                    styleStr += '.mt-3,aside,.sidebar,.is-9{display:none !important;pointer-events: none !important;}';
                } else if (/\/\d+\/w+\.html/.test(url)) {
                    styleStr += 'img{display:none !important;pointer-events: none !important;}';
                    html = html.replace(/<([a-zA-Z0-9]+)\s+[^>]*?(src|href|class|id)\s*=\s*(['"])[^'"]*?\/auth\/govip[^'"]*?\3[^>]*?>/gi, '<$1 style="display:none !important;pointer-events: none !important;">');
                }
            } else if (/https?:\/\/www\.tongrenxsw\.com/.test(url)) {
                ignoreDivImg = false;
                domains.splice(domains.indexOf('popup'), 1);
                styleStr += '.headerW,.topM,.navM,.searchBoxM,.about,.btnAddBook,.navM2,.recoBox2,.btnErrorW{display:none !important;pointer-events: none !important;}';
                if (/\/book\/\w+(-\w+)?(-\w+)?\.html/i.test(url)) {
                    html = html.replace(/<script\s*>[^>]*?<\/script>/gs, '');
                }
            }
        } else {
            utf8Flag = false;
            const unKnowBuf = new Uint8Array($response.bodyBytes);
            html = new TextDecoder(charset, { fatal: false, ignoreBOM: true }).decode(unKnowBuf);

            styleStr += `#Image,#onclickshowdiv,#smx_wrap,#aswift_9,#aswift_9_host{display:none !important;pointer-events: none !important;} .infos{color:#78867e !important;}`;
            html = html.replace(charset, 'utf-8');
            html = html.replace(/<script.*?src=\"\/skin\/default\/js\/(tongji|googgg|goge|gls)\.js\"[^>]*>/g, '<script>');

            if (/^https?:\/\/www\.tongrenquan\.org/.test(url)
                || /^https?:\/\/tongrenshe\.cc/.test(url)
                || /^https?:\/\/(www\.)?trxs\.cc/.test(url)
                || /^https?:\/\/www\.qbtr\.cc/.test(url)
            ) {
                if (/[a-zA-Z_]+\/\d+\.html/.test(url)) {
                    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"readContent\">/s, '<div class="readContent">');
                } else if (/[a-zA-Z_]+\/\d+\/\d+\.html/.test(url)) {
                    html = html.replace(/<div\s*class=\"head\">(.*)?<div\s*class=\"topReadContent\"([^>]*?)>/s, '<div class="topReadContent">');
                    styleStr = styleStr + ' .next_pre,.hotlist{display:none !important;pointer-events: none !important;}';
                }
            }
        }
        html = html.replace(/<ins(.*?)<\/ins>/gs, '');
        html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
        html = html.replace(/<video(.*?)<\/video>/gs, '');

        domains.map(escapeRegExp).forEach(domain => {
            html = html.replace(new RegExp(`<([a-zA-Z0-9]+)\\s+[^>]*?(src|href|class|id)\\s*=\\s*(['"])[^'"]*?${domain}[^'"]*?\\3[^>]*?>`, 'gi'), '<$1 style="display:none !important;pointer-events: none !important;">');
        });
        html = html.replace(/<([a-zA-Z0-9]+)\s+[^>]*?(src|href)\s*=\s*(['"])[^'"]*?\/\/\d+[a-z]+\.[a-z]+.\.(cc|com|xyz|net|org):?[^'"]*?\3[^>]*?>/gi, '<$1 style="display:none !important;pointer-events: none !important;">');
        if (enableFloatyWindow) {
            let fyobj = applyFloatyW(html);
            if (fyobj) {
                styleStr += fyobj.styleStr;
                bodyStr += fyobj.result;
            }
        }
        if (bodyStr !== '') {
            html = html.replace(/<\/body>/, bodyStr + '</body>');
        }
        if (styleStr !== '') {
            if (ignoreDivImg) {
                styleStr += 'div{ background-image:none !important;}';
            }
            if (enableBgColor) {
                styleStr += '* {background: ' + bgColor + ' !important;}';
            }
            html = html.replace(/<\/head>/, '<style>' + styleStr + '</style></head>');
        }
        const newHeaders = { ...$response.headers };
        newHeaders["Cross-Origin-Embedder-Policy"] = "unsafe-none";
        newHeaders["Cross-Origin-Opener-Policy"] = "unsafe-none";
        newHeaders["Cross-Origin-Resource-Policy"] = "cross-origin";

        delete newHeaders["Content-Security-Policy"];
        delete newHeaders["content-security-policy"];
        delete newHeaders["X-Frame-Options"];
        delete newHeaders["x-frame-options"];
        delete newHeaders["Referrer-Policy"];
        if (!utf8Flag) {
            const utf8Bytes = new TextEncoder().encode(html);
            $done({ headers: newHeaders , bodyBytes: utf8Bytes.buffer });
        } else {
            $done({ headers: newHeaders , body: html });
        }
    } catch (e) {
        console.log(`novel adBlock Error: ${error.message}`);
        $done({});
    }
} else {
    $done();
}

function applyFloatyW(html) {
    let pnObj = calcPrvANex(html);
    if (!pnObj.prev && !pnObj.next) {
        return null;
    }
    let sty = `.qx-fw{position:fixed;right:4px;top:54%;transform:translateY(-46%);z-index:9999;display:flex;flex-direction:column;align-items:center;gap:8px;background-color: transparent !important;border-radius: 50%;}.qx-fw .qx-fw__main,.qx-fw .qx-fw__btn{border-radius:50%;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;color:#fff;display:flex;align-items:center;justify-content:center;transition: transform 0.2s ease,box-shadow 0.2s ease;user-select:none;}.qx-fw .qx-fw__main{position:relative;width:50px;height:50px;font-size:14px;box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);cursor: grab;}.qx-fw .qx-fw__main:active { cursor: grabbing;}.qx-fw .qx-fw__btn {display:none;width:40px;height:40px;padding:0;border:none;font-size:10px;line-height:1.2;box-shadow: 0 2px 10px rgba(102, 126, 234, 0.35);}.qx-fw.qx-fw--open .qx-fw__btn{ display: flex; }.qx-fw .qx-fw__btn:hover { opacity: 0.95; transform: scale(1.05); }.qx-fw .qx-fw__btn:active { transform: scale(0.98); }.qx-fw .qx-fw__btn--prev { order: 1; }.qx-fw .qx-fw__main { order: 2; }.qx-fw .qx-fw__btn--next { order: 3; }`;
    let floy = `<div class="qx-fw" id="qx-fw"><button type="button" class="qx-fw__btn qx-fw__btn--prev">上</button><div class="qx-fw__main" id="qx-fw-main" draggable="true">QX</div><button type="button" class="qx-fw__btn qx-fw__btn--next">下</button></div>`
    let scp = `<script type="text/javascript">(function(){let wrap=document.querySelector('#qx-fw');let main = document.querySelector('#qx-fw-main');let edge=4;let dragStartX=0;let hasJustDragged=false;function snapToSide(dx){if(dx<0){wrap.style.left=edge+'px';wrap.style.right='auto'}else{wrap.style.right=edge+'px';wrap.style.left='auto'}}main.addEventListener('dragstart',function(e){dragStartX=e.clientX;hasJustDragged=false;e.dataTransfer.setData('text/plain','');e.dataTransfer.effectAllowed='move'});main.addEventListener('dragend',function(e){let endX=e.clientX;let dx=endX-dragStartX;if(Math.abs(dx)>10){hasJustDragged=true;snapToSide(dx)}});function triggerByClass(classStr){if (!classStr||classStr==='null'||classStr==='undefined'){return;}let el=document.querySelector(classStr);if(el){el.click();}}wrap.addEventListener('click',function(e){e.stopPropagation();if(e.target === main || main.contains(e.target)){if (hasJustDragged) { hasJustDragged = false; return; }wrap.classList.toggle('qx-fw--open');}else if(e.target.classList.contains('qx-fw__btn--prev')){triggerByClass('${pnObj.prev}');}else if(e.target.classList.contains('qx-fw__btn--next')){triggerByClass('${pnObj.next}');}});document.addEventListener('click',function(){wrap.classList.remove('qx-fw--open');});})();</script>`;
    return {
        styleStr: sty,
        result: floy + scp
    };
}
function calcPrvANex(html) {
    let prvs = ['上一章', '上一页'];
    let nexts = ['下一页', '下一章'];
    let targetDom = ['a', 'button', 'div'];
    const calcRgx = (str) => new RegExp(`<([a-z]+)\\s+[^>]*?(href|class|id)\\s*=\\s*(['"])([^'"]*?)\\3[^>]*?>[^<]*?${str}[^<]*?</\\1>`, 'g');
    const getCssSelector = (tagName, attrName, attrValue) => {
        if (!targetDom.includes(tagName.toLowerCase())) {
            return null;
        }
        let cssSelector = tagName.toLowerCase();
        switch (attrName.toLowerCase()) {
            case 'class':
                const classList = attrValue.trim().split(/\s+/).filter(cls => cls);
                if (classList.length > 0) { cssSelector += '.' + classList.join('.'); }
                break;
            case 'id':
                const idValue = attrValue.trim();
                if (idValue) { cssSelector += '#' + idValue; }
                break;
            case 'href':
                const hrefValue = attrValue.trim();
                if (hrefValue) { cssSelector += `[href*="${hrefValue}"]`; }
                break;
            default:
                break;
        }
        return cssSelector;
    };
    let prvSelector = null;
    let nextSelector = null;
    for (let i = 0; i < prvs.length; i++) {
        let res = calcRgx(prvs[i]).exec(html);
        if (res) {
            prvSelector = getCssSelector(res[1], res[2], res[4]);
            break;
        }
    }
    for (let i = 0; i < nexts.length; i++) {
        let res = calcRgx(nexts[i]).exec(html);
        if (res) {
            nextSelector = getCssSelector(res[1], res[2], res[4]);
            break;
        }
    }
    return {
        prev: prvSelector,
        next: nextSelector
    }
}
