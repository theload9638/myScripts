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
    let styleStr = 'ins,iframe,video,audio,#__copy,.banner,.ad-body,.logo_box,.ad_encode,#ad_encode,#ad-body,#banner,.ad-video,#video-ad-ui,.copyright,.GoogleActiveViewInnerContainer,.adsbygoogle,.adsbygoogle-noablate.google-auto-placed,#ad-video,#ad-container,.adBlock,#adBlock,.ad-mob,#ad-mob,.mobile-ad,#mobile-ad,.m-ad,#m-ad,.popup,.ads,#ads,.advertisement,#advertisement,embed,object,.ad,.ad-container,.ad-wrap,#ad-wrap,.ad-box,#ad-box,#ad,.footer,#footer{display:none !important;pointer-events: none !important;user-select: none !important;}';
    let bodyStr = '';
    let bgColor = '#494747';
    let enableBgColor = true;
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
                    let fyobj = applyFloatyW(html);
                    styleStr += fyobj.styleStr;
                    bodyStr += fyobj.result;
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
        if (styleStr !== '') {
            if (ignoreDivImg) {
                styleStr += 'div{ background-image:none !important;}';
            }
            if (enableBgColor) {
                styleStr += '* {background: ' + bgColor + ' !important;}';
            }
            html = html.replace(/<\/head>/, '<style>' + styleStr + '</style></head>');
        }
        if (bodyStr !== '') {
            html = html.replace(/<\/body>/, bodyStr + '</body>');
        }
        if (!utf8Flag) {
            const utf8Bytes = new TextEncoder().encode(html);
            $done({ bodyBytes: utf8Bytes.buffer });
        } else {
            $done({ body: html });
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
    let sty = `.qx-fw{position:fixed;right:8px;top:50%;transform:translateY(-50%);z-index:9999;display:flex;flex-direction:column;align-items:center;gap:8px;}.qx-fw .qx-fw__main,.qx-fw .qx-fw__btn {border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba210 0%) !important;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform0.2sease,box-shadow0.2sease;user-select:none;-webkit-user-select:none;}.qx-fw .qx-fw__main {position:relative;width:30px;height:30px;font-size:14px;box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);}.qx-fw .qx-fw__main:hover{transform: scale(1.08);box-shadow: 0 6px 28px rgba(102, 126, 234, 0.5);}.qx-fw .qx-fw__main:active{transform: scale(0.98);}.qx-fw .qx-fw__main.qx-fw__main--dragging{cursor:grabbing;}.qx-fw .qx-fw__main{cursor:grab;}.qx-fw .qx-fw__main .qx-fw__icon{line-height: 1;pointer-events: none;}.qx-fw .qx-fw__btn {display:none;width:36px;height:36px;padding:0;border:none;font-size:10px;line-height:1.2;box-shadow: 0 2px 10px rgba(102, 126, 234, 0.35);}.qx-fw.qx-fw--open .qx-fw__btn{display: flex;}.qx-fw .qx-fw__btn:hover {opacity: 0.95;transform: scale(1.05);}.qx-fw .qx-fw__btn:active {transform: scale(0.98);}.qx-fw .qx-fw__btn--prev{order: 1;}.qx-fw .qx-fw__main {order:2;}.qx-fw .qx-fw__btn--next{order: 3;}`;
    let floy = `<div class="qx-fw" id="qx-fw"><button type="button" class="qx-fw__btn qx-fw__btn--prev" title="上一页">上</button><div class="qx-fw__main" id="qx-fw-main" title="悬浮窗"><span class="qx-fw__icon">qx</span></div><button type="button" class="qx-fw__btn qx-fw__btn--next" title="下一页">下</button></div>`
    let scp = `<script>(function(){var wrap=document.querySelector('#qx-fw');var main=document.querySelector('#qx-fw-main');var dragging=false,startY=0,startTop=0,hasJustDragged=false;var margin=8;var expandedH=118;function triggerByClass(classStr){var el=document.querySelector(classStr);if(el){el.click();}}function onMove(e){if(!dragging){return;}var minTop=margin;var maxTop=window.innerHeight-expandedH-margin;var top=startTop+(e.clientY-startY);top=(top < minTop)?minTop:(top>maxTop?maxTop:top);wrap.style.top=top+'px';wrap.style.transform='none';if(Math.abs(e.clientY-startY)>5){hasJustDragged = true;}}function onUp(){if(!dragging){return;}dragging=false;main.classList.remove('qx-fw__main--dragging');document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);}main.addEventListener('mousedown',function (e){if(e.button!==0){return;}e.preventDefault();dragging=true;hasJustDragged=false;main.classList.add('qx-fw__main--dragging');startY=e.clientY;startTop=wrap.getBoundingClientRect().top;wrap.style.top=startTop+'px';wrap.style.transform='none';document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);});function clampWrapTop(){var top=wrap.style.top?parseFloat(wrap.style.top):wrap.getBoundingClientRect().top;var minT=margin,maxT =window.innerHeight-expandedH-margin;if(top<minT || top>maxT){top=(top<minT)?minT:((top>maxT)?maxT:top);wrap.style.top=top+'px';wrap.style.transform='none';}}wrap.addEventListener('click',function(e){e.stopPropagation();if(e.target===main || main.contains(e.target)){if(hasJustDragged){hasJustDragged=false;return;}wrap.classList.toggle('qx-fw--open');if(wrap.classList.contains('qx-fw--open')){clampWrapTop();}}else if(e.target.classList.contains('qx-fw__btn--prev')){triggerByClass(${pnObj.prev});}else if(e.target.classList.contains('qx-fw__btn--next')){triggerByClass(${pnObj.next});}});document.addEventListener('click',function(){wrap.classList.remove('qx-fw--open');});})();</script>`;
    return {
        styleStr: sty,
        result: floy + scp
    };
}
function calcPrvANex(html) {
    let prvs = ['上一章'];
    let nexts = ['下一页'];
    let targetDom = ['a', 'button', 'div'];
    const calcRgx = (str) => new RegExp(`<([a-z]+)\\s+[^>]*?(href|class|id)\\s*=\\s*(['"])([^'"]*?)\\3[^>]*?>${str}</\\1>`, 'g');
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
    let prvSelector;
    let nextSelector;
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
