const url = $request.url;
let type = $response.headers['Content-Type'] || $response.headers['content-type'];

if (url.includes('html') || (type && type.includes("text"))) {
    let html = $response.body;
    if (!html) {
        console.log(`${url}  / result empty`);
        $done({});
        return;
    }
    const newHeaders = { ...$response.headers };
    let domains = [
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'pagead2.googlesyndication.com',
        'fundingchoicesmessages.google.com',
        'cd.ladsp.com',
        'a.magsrv.com',
        'bundlemoviepumice.com',
        'b.clarity.ms',
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
        '3e87c0802f91cf8cgg.lzicw0.com',
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
        'slide-ad',
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
    let styleStr = 'ins,iframe,frame,video,audio,#__copy,div[data-ad],.banner,.ad-body,.logo_box,.ad_encode,#ad_encode,#ad-body,#banner,.ad-video,#video-ad-ui,.copyright,.GoogleActiveViewInnerContainer,.adsbygoogle,.adsbygoogle-noablate.google-auto-placed,#ad-video,#ad-container,.adBlock,#adBlock,.ad-mob,#ad-mob,.mobile-ad,#mobile-ad,.m-ad,#m-ad,.popup,.ads,#ads,.advertisement,#advertisement,embed,object,.ad,.ad-container,.ad-wrap,#ad-wrap,.ad-box,#ad-box,#ad,.footer,#footer{display:none !important;pointer-events: none !important;}';
    let bodyStr = '';
    let scriptStr = '';
    let beginHeadStr = '';
    let bgColor = '#494747';
    let enableBgColor = true;
    let enableFloatyWindow = true;
    let ignoreDivImg = true;
    let enableDynamicBlock = false;

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
                styleStr += '.slide,img,picture{display:none !important;pointer-events: none !important;} * {background-image:none !important;}';
                enableDynamicBlock = true;
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
            html = html.replace(/<script[^>]*?src=\"\/skin\/default\/js\/(tongji|googgg|goge|gls)\.js\"[^>]*>/g, '<script>');

            if (/^https?:\/\/(www\.)?tongrenquan\.org/.test(url)
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
        html = html.replace(/<object(.*?)<\/object>/gs, '');
        html = html.replace(/<embed(.*?)<\/embed>/gs, '');
        html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
        html = html.replace(/<frame(.*?)<\/frame>/gs, '');
        html = html.replace(/<video(.*?)<\/video>/gs, '');

        domains.map(escapeRegExp).forEach(domain => {
            html = html.replace(new RegExp(`<([a-zA-Z0-9]+)\\s+[^>]*?(src|href|class|id)\\s*=\\s*(['"])[^'"]*?${domain}[^'"]*?\\3[^>]*?>`, 'gi'), '<$1 style="display:none !important;pointer-events: none !important;">');
        });
        html = html.replace(/<([a-zA-Z0-9]+)\s+[^>]*?(src|href)\s*=\s*(['"])[^'"]*?\/\/\d+[a-z]+\.[a-z]+(\.(cc|com|xyz|net|org):?)?[^'"]*?\3[^>]*?>/gi, '<$1 style="display:none !important;pointer-events: none !important;">');

        if (enableFloatyWindow) {
            let fyobj = applyFloatyW(html);
            bodyStr += fyobj.bodyStr;
            styleStr += fyobj.styleStr;
        }
        if (bodyStr) {
            html = html.replace(/<\/body>/, bodyStr + '</body>');
        }
        if (enableDynamicBlock) {
            beginHeadStr += `<script type="text/javascript">(function(){let tags=['iframe','ins','img','video','object','audio','embed'];const kill=(el)=>el.remove();tags.forEach(tag=>{document.querySelectorAll(tag).forEach(kill)});let observer=new MutationObserver((changes)=>{changes.forEach(change=>{if(change.type==='childList'){change.addedNodes.forEach(n=>{if(n.nodeType===1&&tags.includes(n.tagName.toLocaleLowerCase())){kill(n)}})}if(change.type==='attributes'){if(change.target.tagName==='IMG'){kill(change.target)}}})});observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','srcset']})})();</script>`;
            if (!newHeaders['Content-Security-Policy']) {
                newHeaders['Content-Security-Policy'] = "img-src 'none'; media-src 'none'; frame-src 'none'; object-src 'none';child-src 'none'";
            }
        }
        if (beginHeadStr) {
            html = html.replace(/<head[^>]*?>/, '<head>' + beginHeadStr);
        }
        if (styleStr) {
            if (ignoreDivImg) {
                styleStr += 'div{ background-image:none !important;}';
            }
            if (enableBgColor) {
                styleStr += '* {background: ' + bgColor + ' !important;}';
            }
            if (!scriptStr) {
                scriptStr = '<script type="text/javascript">try{top.location.hostname;if(top.location.hostname!=window.location.hostname){top.location.href=window.location.href}}catch(e){top.location.href=window.location.href}</script>';
            }
            html = html.replace(/<\/head>/, '<style>' + styleStr + '</style>' + scriptStr + '</head>');
        }

        newHeaders["Cross-Origin-Embedder-Policy"] = "unsafe-none";
        newHeaders["Cross-Origin-Opener-Policy"] = "unsafe-none";
        newHeaders["Cross-Origin-Resource-Policy"] = "cross-origin";
        newHeaders["X-Frame-Options"] = "DENY";

        if (!utf8Flag) {
            const utf8Bytes = new TextEncoder().encode(html);
            $done({ headers: newHeaders, bodyBytes: utf8Bytes.buffer });
        } else {
            $done({ headers: newHeaders, body: html });
        }
    } catch (e) {
        console.log(`novel adBlock Error: ${e.message}`);
        $done({});
    }
} else {
    console.log(`the url {${url}} is ignored , the content-type is ${type}`);
    $done();
}

function applyFloatyW(html) {
    let pnObj = calcPrvANex(html);
    let aiCfgJson = $prefs.valueForKey('qx-fw-aikey_');
    let settingCfg = {
        'auto_nxt': true
    };
    let cn = '<div class="qx-qw qx-qw-right"><div class="qx-main"><span>QX</span></div><div class="qx-btn qx-btn-prv"><span>上页</span></div><div class="qx-btn qx-btn-ai"><span>AI</span></div><div class="qx-btn qx-btn-setting"><span>设置</span></div><div class="qx-btn qx-btn-dir"><span>目录</span></div><div class="qx-btn qx-btn-nxt"><span>下页</span></div></div>';
    cn += '<div class="qx-fw-ai-mask"><div class="qx-fw-ai-box"><div class="qx-fw-ai-head"><h3>AI助手</h3><button type="button"class="qx-fw-ai-close">×</button></div><div class="qx-fw-ai-body"><textarea class="qx-fw-ai-input"placeholder="输入您的问题..."></textarea><button type="button"class="qx-fw-ai-send">发送</button><div class="qx-fw-ai-reply"></div></div></div></div>';
    cn += `<div class="qx-qw-setting-box"><div class="qx-qw-setting-layout"><div class="qx-qw-setting-head"><h3>设置</h3><button type="button"class="qx-fw-setting-close">×</button></div><div class="qx-qw-sl-box"><div class="qx-qw-setting-line"><span>自动下一章</span><input type="checkbox"${settingCfg.auto_nxt ? 'checked' : ''}id="qxSetCkIP"><label for="qxSetCkIP"class="qxSetingtoggleSwitch"></label></div></div><div class="qx-qw-setting-line"><span class="qx-qw-btn-close">关闭</span></div></div></div>`;
    let scp = `<script>(function(){let container=document.querySelector('.qx-qw');let aiContainer=document.querySelector('.qx-fw-ai-mask');let settingContainer=document.querySelector('.qx-qw-setting-box');let ctCls=document.querySelector('.qx-qw-btn-close');ctCls.addEventListener('click',function(e){window.confirm("确定要关闭吗?")&&(container.style.display="none")});let settingCtCls=document.querySelector('.qx-fw-setting-close');settingCtCls.addEventListener('click',function(e){let setcfm=window.confirm("是否保存配置?");settingContainer.classList.remove('qx-fw-setting--show')});let nxt_timerId=null;let obv_nxt=null;if(${settingCfg.auto_nxt}){let cs='${pnObj.next}';if(typeof cs!="string"||cs==='undefined'||cs==='null'){}else{let nxt_btn=document.querySelector(cs);obv_nxt=new IntersectionObserver(changes=>{if(changes&&changes.length>0&&!nxt_timerId){let changeEntry=changes[0];if(changeEntry.isIntersecting){nxt_timerId=setTimeout(()=>{clearTimeout(nxt_timerId);nxt_btn&&nxt_btn.click()},1000)}}},{threshold:0.5});if(nxt_btn){obv_nxt.observe(nxt_btn)}}}function clickBtn(cs){if(typeof cs!="string"||cs==='undefined'||cs==='null'){return}let bn=document.querySelector(cs);bn&&bn.click()}function createFetch(timeout=6000){return(resource,options)=>{let controller=new AbortController();options=options||{};options.signal=controller.signal;setTimeout(()=>{controller.abort()},timeout);return fetch(resource,options)}}let fetchWithTimeout=createFetch();let moveX=-1;let hasMove=false;function snapToSide(dx){if(dx>0){container.classList.remove('qx-qw-left');container.classList.add('qx-qw-right')}else{container.classList.add('qx-qw-left');container.classList.remove('qx-qw-right')}}container.addEventListener('touchstart',(e)=>{if(e.touches.length>1){e.preventDefault();return}let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(e.target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){if(e.changedTouches.length>0){moveX=e.changedTouches[0].clientX;hasMove=false}else if(e.targetTouches.length>0){moveX=e.targetTouches[0].clientX;hasMove=false}else if(e.touches.length>0){moveX=e.touches[0].clientX;hasMove=false}}});let lastTouchEnd=0;container.addEventListener('touchend',(e)=>{let now=Date.now();if(now-lastTouchEnd<=500){lastTouchEnd=now;e.preventDefault();return}else{lastTouchEnd=now}let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(e.target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){let endX=e.changedTouches[0].clientX;let dx=endX-moveX;if(moveX!==-1&&Math.abs(dx)>100){hasMove=true;moveX=-1;snapToSide(dx)}}});container.addEventListener('click',function(e){e.stopPropagation();let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){document.cookie="boomolastsearchtime=; Max-Age=0; path=/";if(hasMove){return}container.classList.toggle('qx-qw-open')}else if(target.classList.contains('qx-btn-prv')||(isSp&&par.classList.contains('qx-btn-prv'))){clickBtn('${pnObj.prev}')}else if(target.classList.contains('qx-btn-nxt')||(isSp&&par.classList.contains('qx-btn-nxt'))){clickBtn('${pnObj.next}')}else if(target.classList.contains('qx-btn-dir')||(isSp&&par.classList.contains('qx-btn-dir'))){clickBtn('${pnObj.dir}')}else if(target.classList.contains('qx-btn-setting')||(isSp&&par.classList.contains('qx-btn-setting'))){settingContainer.classList.add('qx-fw-setting--show')}else if(target.classList.contains('qx-btn-ai')||(isSp&&par.classList.contains('qx-btn-ai'))){aiContainer.classList.add('qx-fw-ai--show')}});document.addEventListener('click',function(e){container.classList.remove('qx-qw-open')});let aiClose=document.querySelector('.qx-fw-ai-close');let aiSend=document.querySelector('.qx-fw-ai-send');let userInput=document.querySelector('.qx-fw-ai-input');let aiReply=document.querySelector('.qx-fw-ai-reply');aiClose.addEventListener('click',function(e){aiReply.innerText='';userInput.value='';aiContainer.classList.remove('qx-fw-ai--show')});let decoder=new TextDecoder('utf8');let te=new TextEncoder();let aiCfgJson_='${aiCfgJson}';let aiEnabled=aiCfgJson_&&aiCfgJson_!=='null'&&aiCfgJson_!=='undefined';let aiCfg=(aiEnabled)?(JSON.parse(aiCfgJson_)):null;aiSend.addEventListener('click',function(e){if(userInput.value){let text=userInput.value;if(aiEnabled){aiReply.innerText='请稍等,正在生成回复中...';aiCfg.body.prompt=text;let bd=JSON.stringify(aiCfg.body);aiCfg.headers['Content-Length']=te.encode(bd).byteLength;fetchWithTimeout(aiCfg.url,{method:aiCfg.method,headers:aiCfg.headers,body:bd}).then(res=>{if(!res.ok){return new Error('请求失败,状态码:'+res.status)}return res.arrayBuffer()}).then(buf=>{if(buf instanceof Error){aiReply.innerText=buf.message;return}aiReply.innerText=decoder.decode(buf)}).catch(err=>{aiReply.innerText='请求超时'+err.message}).finally(()=>{userInput.value=''})}}})})();</script>`
    return {
        styleStr: calcQWStyle(),
        bodyStr: cn + scp
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
            item = item.replace(/\'/g, '"');
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

function calcQWStyle() {
    let size = 5;
    let tmpStr = ".qx-qw{all:initial;--size:54px;--itemSize:40px;background:transparent !important;border-radius:50%;position:fixed;z-index:9999;top:50%;transform:translateY(-50%);width:var(--size);height:var(--size);display:flex;justify-content:center;align-items:center}.qx-qw-left{left:6px;right:'auto'}.qx-qw-right{right:6px;left:'auto'}";
    tmpStr += ".qx-qw>div{position:absolute;border-radius:50%;z-index:4;justify-content:center;align-items:center;text-align:center;box-sizing:border-box;transition:transform 0.2s ease,box-shadow 0.2s ease;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%) !important;font-weight:540;overflow:hidden !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-main{width:var(--size);height:var(--size);display:flex;box-shadow:0 4px 40px rgba(98,121,224,0.5);cursor:grabbing}";
    tmpStr += ".qx-main>span,.qx-btn>span{color:#fff !important;font-size:11px;background:transparent !important;font-weight:550 !important;letter-spacing:1px;word-break:normal;overflow:hidden !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-main:hover{transform:scale(1.04)}.qx-qw.qx-qw-open .qx-btn{display:flex}.qx-main>span{color:initial !important;font-size:14px !important}";
    tmpStr += ".qx-btn{display:none;top:calc(var(--size) / 2 * -1 + calc(var(--itemSize) /2 * -1));width:var(--itemSize);height:var(--itemSize);box-shadow:0 2px 10px rgba(102,126,234,0.35);transform-origin:center calc(var(--size) / 2 + var(--itemSize) / 2)}";

    tmpStr += ".qx-fw-ai-mask{display:none;position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.5) !important;z-index:10000;align-items:center;justify-content:center}.qx-fw-ai-mask.qx-fw-ai--show{display:flex}.qx-fw-ai-box{width:90%;max-width:400px;max-height:75vh;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;overflow:hidden}";
    tmpStr += ".qx-fw-ai-head{padding:12px 16px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%) !important;color:#fff !important}.qx-fw-ai-head h3{margin:0;font-size:16px;background: transparent !important;font-weight:600;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-fw-ai-close{width:28px;height:28px;border:none;background:rgba(255,255,255,0.3);color:#fff;border-radius:50%;cursor:pointer;font-size:18px;line-height:1;padding:0}";
    tmpStr += ".qx-fw-ai-close:hover{background:rgba(255,255,255,0.5)}.qx-fw-ai-body{padding:16px;flex:1;overflow:auto;display:flex;flex-direction:column;gap:12px}.qx-fw-ai-input{width:100%;min-height:80px;padding:12px;border:1px solid #ddd;border-radius:8px;font-size:14px;resize:vertical;box-sizing:border-box}";
    tmpStr += ".qx-fw-ai-input:focus{outline:none;border-color:#667eea}.qx-fw-ai-send{align-self:flex-end;padding:8px 20px;border:none;border-radius:8px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%) !important;color:#fff;font-size:14px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-fw-ai-send:hover{opacity:0.9}";
    tmpStr += ".qx-fw-ai-reply{min-height:120px;padding:12px;border:1px solid #eee;border-radius:8px;background:#f8f9fa;font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word}.qx-fw-ai-reply:empty::before{content:'AI 回复将显示在这里';color:#999}";

    tmpStr += ".qx-qw-setting-box{display:none;position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(40,39,39,0.5) !important;box-shadow:0px 8px 30px rgba(51,48,48,0.74);z-index:10000;align-items:center;justify-content:center}.qx-qw-setting-box.qx-fw-setting--show{display:flex}.qx-qw-setting-layout{width:90%;max-width:190px;min-width:160px;max-height:50vh;background:#fff;border-radius:6px;display:flex;flex-direction:column;overflow:hidden;align-items:center;justify-content:center}.qx-qw-setting-head{width:100%;overflow:hidden;padding:12px 14px;min-height:15px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#828fc6 0%,#5c4572 100%) !important;color:#fff !important}.qx-qw-setting-head h3{margin:0;font-size:16px;height:auto;font-weight:600;background:transparent !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-fw-setting-close{width:28px;height:28px;border:none;background:rgba(255,255,255,0.3);color:#fff;border-radius:50%;cursor:pointer;font-size:18px;line-height:1;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-qw-sl-box{width:100%;max-height:25vh;scroll-behavior:smooth;overflow:scroll;overflow-x:hidden}.qx-qw-sl-box::-webkit-scrollbar{width:2px;background:gray}.qx-qw-setting-line{width:100%;padding:8px;color:aliceblue !important;filter:drop-shadow(0 4px 40px rgba(98,121,224,0.5));border:1px solid black;display:flex;align-items:center;justify-content:space-around}.qx-qw-setting-line>span{display:block;font-size:13px;background:transparent !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-qw-btn-close{cursor:pointer}#qxSetCkIP{display:none}";
    tmpStr += ".qxSetingtoggleSwitch{display:flex;align-items:center;justify-content:center;position:relative;width:44px;height:28px;background-color:rgb(82,82,82);border-radius:20px;cursor:pointer;transition-duration:.2s}";
    tmpStr += ".qxSetingtoggleSwitch::after{content:'';position:absolute;height:10px;width:10px;left:5px;background-color:transparent;border-radius:50%;transition-duration:.2s;box-shadow:5px 2px 7px rgba(8,8,8,0.26);border:5px solid white}";
    tmpStr += "#qxSetCkIP:checked+.qxSetingtoggleSwitch::after{transform:translateX(100%);transition-duration:.2s;background-color:white}#qxSetCkIP:checked+.qxSetingtoggleSwitch{background-color:rgb(148,118,255);transition-duration:.2s}";

    let v1 = size - 1;
    let v2 = 180 / v1;
    let v4 = 0;
    for (let v3 = 3; v3 <= size; v3++) {
        let x1 = 5 + 25 * v4;
        let x2 = v2 * (v4 + 1);
        tmpStr += `.qx-qw.qx-qw-left>.qx-btn:nth-child(${v3}){transform: translate(25px,${x1}px) rotate(${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-left>.qx-btn:nth-child(${v3})>span{transform: rotate(-${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-right>.qx-btn:nth-child(${v3}){transform: translate(-25px,${x1}px) rotate(-${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-right>.qx-btn:nth-child(${v3})>span{transform: rotate(${x2}deg);}`;
        v4++;
    }
    tmpStr += '.qx-qw>.qx-btn:last-child{transform: translate(0px,calc(calc( var(--size) / 2 ) + calc( var(--itemSize) /2) + 8px)) rotate(-180deg);}';
    tmpStr += '.qx-qw>.qx-btn:last-child>span{transform: rotate(180deg);}';
    return tmpStr;
}