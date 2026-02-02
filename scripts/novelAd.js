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
    let scriptStr = '';
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

        if (bodyStr) {
            html = html.replace(/<\/body>/, bodyStr + '</body>');
        }
        if (styleStr) {
            if (ignoreDivImg) {
                styleStr += 'div{ background-image:none !important;}';
            }
            if (enableBgColor) {
                styleStr += '* {background: ' + bgColor + ' !important;}';
            }
            if (enableFloatyWindow) {
                let fyobj = applyFloatyW(html);
                if (fyobj) {
                    scriptStr += '<script>'+fyobj.scriptStr+'</script>';
                    styleStr += fyobj.styleStr;
                }
            }
            if (!scriptStr) {
                scriptStr = '';
            }
            html = html.replace(/<\/head>/, '<style>' + styleStr + '</style>' + scriptStr + '</head>');
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
            $done({ headers: newHeaders, bodyBytes: utf8Bytes.buffer });
        } else {
            $done({ headers: newHeaders, body: html });
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
    let tmp = '';
    let ct = 2;
    if (pnObj.prev) {
        tmp += "container.appendChild(createQwBtn('prv', '上页'));";
        ct++;
    }
    if (pnObj.next) {
        tmp += "container.appendChild(createQwBtn('nxt', '下页'));";
        ct++;
    }
    if (pnObj.dir) {
        tmp += "container.appendChild(createQwBtn('dir', '目录'));";
        ct++;
    }
    return {
        styleStr: calcQWStyle(ct),
        scriptStr: `function createQw(){let container=document.createElement('div');container.className='qx-qw';let main=document.createElement('div');main.className='qx-main';main.innerText='QX';container.appendChild(main);${tmp}container.appendChild(createQwBtn('ai','AI'));container.appendChild(createQwBtn('dir','目录'));main.addEventListener('click',function(e){e.stopPropagation();if(e.target.classList.contains('qx-main')){container.classList.toggle('qx-qw-open')}else if(e.target.classList.contains('qx-btn-prv')){clickBtn('${pnObj.prev}')}else if(e.target.classList.contains('qx-btn-nxt')){clickBtn('${pnObj.next}')}else if(e.target.classList.contains('qx-btn-dir')){clickBtn('${pnObj.dir}')}else if(e.target.classList.contains('qx-btn-unlockSearch')){document.cookie="boomolastsearchtime=; Max-Age=0; path=/"}else if(e.target.classList.contains('qx-btn-ai')){}});document.addEventListener('click',function(){ontainer.classList.remove('qx-qw-open')});document.body.appendChild(container)}function clickBtn(cs){if(typeof cs!="string"||cs==='undefined'||cs==='null'){return}let bn=document.querySelector(cs);bn&&bn.click()}function createQwBtn(name,text){let btn=document.createElement('div');btn.classList.add('qx-btn');btn.classList.add('qx-btn-'+name);let desc=document.createElement('span');desc.innerText=text;btn.appendChild(desc);return btn}createQw();`
    };
}
function calcPrvANex(html) {
    let prvs = ['上一章', '上一页', '上一章节'];
    let nexts = ['下一页', '下一章', '下一章节'];
    let mls = ['目录', '全部章节'];
    let targetDom = ['a', 'button', 'div'];
    const calcRgx = (str) => new RegExp(`<([a-z]+)\\s+[^>]*?(href|class|id)\\s*=\\s*(['"])([^'"]*?)\\3[^>]*?>[^<]*?${str}[^<]*?</\\1>`, 'g');
    const itemRule = /[^=]*?=(["'])[^'"]*?\1/;
    const getCssSelector = (resource) => {
        let tagName = resource[1];
        if (!targetDom.includes(tagName.toLowerCase())) {
            return null;
        }
        let cssSelector = tagName.toLowerCase();
        let filterStr = (resource[0].trim()).replace(new RegExp(`<${tagName}\\s*([^>]*?)>.*?$`, 's'), '$1');
        let fss = filterStr.split(/\s+/);
        for (let item of fss) {
            item = item.trim();
            if (itemRule.test(item)) {
                cssSelector += `[${item}]`;
            }
        }
        return cssSelector;
    };
    let prvSelector = null;
    let nextSelector = null;
    let dirSelector = null;
    for (let i = 0; i < prvs.length; i++) {
        let res = calcRgx(prvs[i]).exec(html);
        if (res) {
            prvSelector = getCssSelector(res);
            break;
        }
    }
    for (let i = 0; i < nexts.length; i++) {
        let res = calcRgx(nexts[i]).exec(html);
        if (res) {
            nextSelector = getCssSelector(res);
            break;
        }
    }
    for (let i = 0; i < mls.length; i++) {
        let res = calcRgx(mls[i]).exec(html);
        if (res) {
            dirSelector = getCssSelector(res);
            break;
        }
    }
    return {
        prev: prvSelector,
        next: nextSelector,
        dir: dirSelector
    }
}

function calcQWStyle(size, direct = true) {
    if (size === 1) {
        return;
    }
    let tmpStr = '.qx-qw{all:initial;--size:60px;--itemSize:40px;background:transparent !important;position:fixed;z-index:9999;right:6px;top:50%;transform:translateY(-50%);width:var(--size);height:var(--size);display:flex;justify-content:center;align-items:center}';
    tmpStr += '.qx-qw>div{position:absolute;border-radius:50%;z-index:4;justify-content:center;align-items:center;text-align:center;box-sizing:border-box;transition:transform 0.2s ease,box-shadow 0.2s ease;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%) !important}';
    tmpStr += '.qx-main{width:var(--size);height:var(--size);display:flex;box-shadow:0 4px 40px rgba(98,121,224,0.5);user-select:none;cursor:grabbing}';
    tmpStr += '.qx-main:hover{transform:scale(1.04)}';
    tmpStr += '.qx-btn>span{color:#fff !important;font-size:11px !important;background-color:inherit !important;font-weight:550 !important;letter-spacing:1px;word-break:normal;user-select:none}';
    tmpStr += '.qx-qw.qx-qw-open .qx-btn{display:flex}';
    tmpStr += '.qx-btn{display:none;top:calc(var(--size) / 2 * -1 + calc(var(--itemSize) /2 * -1));width:var(--itemSize);height:var(--itemSize);box-shadow:0 2px 10px rgba(102,126,234,0.35);transform-origin:center calc(var(--size) / 2 + var(--itemSize) / 2);overflow:hidden}';
    const fh = () => {
        let nh = direct === true ? '-' : '';
        direct = !direct;
        return nh;
    };
    if (size <= 3) {
        if (size === 3) {
            let v5 = fh();
            tmpStr += `.qx-qw>.qx-btn:nth-child(3){transform: translate(${v5}28px,30px) rotate(${v5}90deg);}`;
            tmpStr += `.qx-qw>.qx-btn:nth-child(3)>span{transform: rotate(${fh()}90deg);}`;
        }
    } else {
        let v1 = size - 1;
        let v2 = 180 / v1;
        let init = (v1 == 4) ? 5 : 15;
        let step = (v1 == 4) ? 25 : 30;
        let v4 = 0;
        for (let v3 = 3; v3 <= size; v3++) {
            let v5 = fh();
            tmpStr += `.qx-qw>.qx-btn:nth-child(${v3}){transform: translate(${v5}25px,${init + step * v4}px) rotate(${v5}${v2 * (v4 + 1)}deg);}`;
            tmpStr += `.qx-qw>.qx-btn:nth-child(${v3})>span{transform: rotate(${fh()}${v2 * (v4 + 1)}deg);}`;
            v4++;
        }
    }
    tmpStr += '.qx-qw>.qx-btn:last-child{transform: translate(0px,calc(calc( var(--size) / 2 ) + calc( var(--itemSize) /2) + 8px)) rotate(-180deg);}';
    tmpStr += '.qx-qw>.qx-btn:last-child>span{transform: rotate(180deg);}';
    return tmpStr;
}
