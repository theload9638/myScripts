//version fsd3
const url = $request.url;
let type = $response.headers['Content-Type'] || $response.headers['content-type'];
let defaultSetting = {
    'auto_nxt': true,
    'auto_block_ad': false,
    'auto_scroll': false,
    'scroll_speed': 1.2,
    'scroll_delay': 2000
};
var settingCfg = defaultSetting;
let dsJson = $prefs.valueForKey('qx-fw-dfs_');
if (dsJson) {
    let _sobj1 = JSON.parse(dsJson);
    settingCfg = {
        ...defaultSetting,
        ..._sobj1
    };
}
if ($response.statusCode === 200 && (url.includes('html') || (type && type.includes("text")))) {
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
        '/ad-',
        '_adv',
        'logo',
        'slide-ad',
        'ad-body',
        '-ad',
        '-adv',
        'Qtqi',
        'ObJh',
        'javascript:void(0)',
        'video',
        'audio',
        'popup',
        'collect'
    ];
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let styleStr = 'ins,iframe,frame,video,audio,#__copy,#infoad,div[data-ad],.banner,.ad-body,.logo_box,.ad_encode,#ad_encode,#ad-body,#banner,.ad-video,#video-ad-ui,.copyright,.GoogleActiveViewInnerContainer,.adsbygoogle,.adsbygoogle-noablate.google-auto-placed,#ad-video,#ad-container,.adBlock,#adBlock,.ad-mob,#ad-mob,.mobile-ad,#mobile-ad,.m-ad,#m-ad,.popup,.ads,#ads,.advertisement,#advertisement,embed,object,.ad,.ad-container,.ad-wrap,#ad-wrap,.ad-box,#ad-box,#ad,.footer,#footer{display:none !important;pointer-events: none !important;}';
    let bodyStr = '';
    let scriptStr = '';
    let beginHeadStr = '';
    let bgColor = '#242628';
    let baseColor = '#e7e9eb';
    let fontSize = '11';
    let enableBgColor = true;
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
                styleStr += '.balance_insufficient_dialog_box,.note_box,.foot_box,.shortcut_box,.swiper-wrapper,.swiper-button-prev,.swiper-button-next,.place_holder_box,#comment_list,.dmca_box{display:none !important;pointer-events: none !important;}';
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
                styleStr += '.slide,img,picture,canvas,svg,image{display:none !important;pointer-events: none !important;}';
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
                domains.splice(domains.indexOf('popup'), 1);
                styleStr += '.headerW,.topM,.navM,.about,.introM,.aboutM,.conR,.navM2,.recoBox2,.btnErrorW{display:none !important;pointer-events: none !important;}';
                if (/\/book\/\w+(-\w+)?(-\w+)?\.html/i.test(url)) {
                    html = html.replace(/<script\s*>[^>]*?<\/script>/gs, '');
                }
            }
        } else {
            utf8Flag = false;
            const unKnowBuf = new Uint8Array($response.bodyBytes);
            html = new TextDecoder(charset, { fatal: false, ignoreBOM: true }).decode(unKnowBuf);

            styleStr += `#Image,#onclickshowdiv,#smx_wrap,#aswift_9,#aswift_9_host,.book_download{display:none !important;pointer-events: none !important;} .infos{color:#78867e !important;}`;
            html = html.replace(charset, 'utf-8');
            html = html.replace(/<script[^>]*?src=\"\/skin\/default\/js\/(tongji|googgg|goge|gls|socre|print_start|goooge)\.js\"[^>]*>/g, '<script>');

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

        try {
            let fyobj = applyFloatyW(html);
            bodyStr += fyobj.bodyStr;
            styleStr += fyobj.styleStr;
        } catch (e) {
            console.log('fail apply floaty window : '+e.message);
        }

        if (bodyStr) {
            html = html.replace(/<\/body>/, bodyStr + '</body>');
        }

        if (beginHeadStr) {
            html = html.replace(/<head[^>]*?>/, '<head>' + beginHeadStr);
        }
        if (styleStr) {
            if (enableBgColor) {
                styleStr += '* {background-color: ' + bgColor + ' !important; color: ' + baseColor + ' !important; font-size: ' + fontSize + 'px !important;}';
            }
            if (!scriptStr) {
                scriptStr = '<script type="text/javascript">try{top.location.hostname;if(top.location.hostname!=window.location.hostname){top.location.href=window.location.href}}catch(e){top.location.href=window.location.href}</script>';
            }
            html = html.replace(/<\/head>/, '<style>' + styleStr + '</stylebackground-image>' + scriptStr + '</head>');
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
    console.log(`the url {${url}} is ignored , the content-type is ${type} , code = ${$response.statusCode}`);
    $done({});
    return;
}

function applyFloatyW(html) {
    let pnObj = calcPrvANex(html);
    calcFwSearchParam();
    let cn = '<div class="qx-qw qx-qw-right"><div class="qx-main"><span>QX</span></div><div class="qx-btn qx-btn-prv"><span>上页</span></div><div class="qx-btn qx-btn-setting"><span>设置</span></div><div class="qx-btn qx-btn-dir"><span>目录</span></div><div class="qx-btn qx-btn-nxt"><span>下页</span></div></div>';
    cn += `<div class="qx-qw-setting-box"><div class="qx-qw-setting-layout"><div class="qx-qw-setting-head"><h3>设置</h3><button type="button"class="qx-fw-setting-close">×</button></div><div class="qx-qw-sl-box"><div class="qx-qw-setting-line"><span>自动下一章</span><input type="checkbox"${settingCfg.auto_nxt ? ' checked="1" ' : ' '}id="qxSetCkIP"><label for="qxSetCkIP"class="qxSetingtoggleSwitch"></label></div><div class="qx-qw-setting-line"><span>强力拦截广告</span><input type="checkbox"${settingCfg.auto_block_ad ? ' checked="1" ' : ' '}id="qxSetCkIP1"><label for="qxSetCkIP1"class="qxSetingtoggleSwitch"></label></div><div class="qx-qw-setting-line"><span>自动滚动</span><input type="checkbox"${settingCfg.auto_scroll ? 'checked="1"' : ''}id="qxSetCkIP2"><label for="qxSetCkIP2"class="qxSetingtoggleSwitch"></label></div></div><div class="qx-qw-setting-line"><span class="qx-qw-btn-close">关闭</span></div></div></div>`;
    let scp = '<script>(function(){';
    scp += `let container=document.querySelector('.qx-qw');let settingContainer=document.querySelector('.qx-qw-setting-box');let ctCls=document.querySelector('.qx-qw-btn-close');ctCls.addEventListener('click',function(e){window.confirm("确定要关闭悬浮窗吗?")&&(container.style.display="none")});let settingCfg={'auto_nxt':${settingCfg.auto_nxt},'auto_block_ad':${settingCfg.auto_block_ad},'auto_scroll':${settingCfg.auto_scroll}};let nxt_timerId=null;let obv_nxt=null;const AutoScroller={speed:${settingCfg.scroll_speed},interval:16,delay:${settingCfg.scroll_delay},delayTimer:null,running:false,rafId:null,lastTime:0,start(options={}){if(this.running||this.delayTimer){return}if(options.speed){this.speed=options.speed}if(options.interval){this.interval=options.interval}if(options.delay!==undefined){this.delay=options.delay}this.delayTimer=setTimeout(()=>{this.running=true;this.lastTime=performance.now();this.loop()},this.delay)},stop(){this.running=false;if(this.rafId){cancelAnimationFrame(this.rafId);this.rafId=null}if(this.delayTimer){clearTimeout(this.delayTimer);this.delayTimer=null}},toggle(){(this.running||this.delayTimer)?this.stop():this.start()},setSpeed(newSpeed){this.speed=newSpeed},loop(){if(!this.running)return;const now=performance.now();const delta=now-this.lastTime;if(delta>=this.interval){this.lastTime=now;const scrollTop=window.scrollY;const maxScroll=document.documentElement.scrollHeight-window.innerHeight;if(scrollTop>=maxScroll){this.stop();return}window.scrollBy(0,this.speed)}this.rafId=requestAnimationFrame(()=>this.loop())}};if(settingCfg.auto_nxt){let cs='${pnObj.next}';if(typeof cs!="string"||cs==='undefined'||cs==='null'){}else{let nxt_btn=document.querySelector(cs);obv_nxt=new IntersectionObserver(changes=>{if(changes&&changes.length>0&&!nxt_timerId){let changeEntry=changes[0];if(changeEntry.isIntersecting){nxt_timerId=setTimeout(()=>{clearTimeout(nxt_timerId);nxt_btn&&nxt_btn.click()},500)}}},{threshold:1});if(nxt_btn){obv_nxt.observe(nxt_btn)}}}if(settingCfg.auto_scroll){AutoScroller.start()}`;
    scp+= `const KillRender={running:false,rafId:null,observer:null,TAGS:new Set(['IMG','VIDEO','IFRAME','OBJECT','EMBED','AUDIO','PICTURE','SOURCE','SVG','IMAGE','FRAME','INS']),removeIfTarget(node){if(node.nodeType!==1)return;if(this.TAGS.has(node.tagName)){node.remove();return}if(node.querySelectorAll){node.querySelectorAll([...this.TAGS].join(',')).forEach(el=>el.remove())}},cleanStyleSheets(){for(const sheet of document.styleSheets){let rules;try{rules=sheet.cssRules}catch(e){continue}if(!rules)continue;for(let i=rules.length-1;i>=0;i--){const rule=rules[i];if(rule.style&&rule.style.backgroundImage&&rule.style.backgroundImage.includes('url')){rule.style.backgroundImage='none';rule.style.display='none'}}}},sweep(){document.querySelectorAll([...this.TAGS].join(',')).forEach(el=>el.remove());this.cleanStyleSheets()},loop(){if(!this.running)return;this.sweep();this.rafId=requestAnimationFrame(()=>this.loop())},initObserver(){this.observer=new MutationObserver(mutations=>{for(const m of mutations){for(const node of m.addedNodes){this.removeIfTarget(node)}}});this.observer.observe(document.documentElement,{childList:true,subtree:true})},hookDOMInsert(){const methods=['appendChild','insertBefore','replaceChild'];methods.forEach(method=>{const original=Node.prototype[method];Node.prototype[method]=function(...args){const node=args[0];if(node&&node.tagName&&KillRender.TAGS.has(node.tagName)){return node}return original.apply(this,args)}})},hookCanvas(){const originalGetContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=new Proxy(originalGetContext,{apply(target,thisArg,args){const type=args[0];if(type==='2d'||type==='webgl'||type==='webgl2'||type==='experimental-webgl'){return null}return Reflect.apply(target,thisArg,args)}})},start(){if(this.running)return;this.running=true;this.hookDOMInsert();this.hookCanvas();this.initObserver();this.loop()},stop(){this.running=false;if(this.rafId){cancelAnimationFrame(this.rafId);this.rafId=null}if(this.observer){this.observer.disconnect();this.observer=null}}};if(settingCfg.auto_block_ad){KillRender.start()}let settingCtCls=document.querySelector('.qx-fw-setting-close');settingCtCls.addEventListener('click',function(e){if(true){let stChanged=false;let autoNxtbtn=document.querySelector('#qxSetCkIP');let old=Object.assign({},settingCfg);if(autoNxtbtn.checked!==settingCfg.auto_nxt){stChanged=true;settingCfg.auto_nxt=autoNxtbtn.checked;if(settingCfg.auto_nxt){if(obv_nxt!=null){obv_nxt.observe(document.querySelector('${pnObj.next}'))}}else{if(obv_nxt!=null){obv_nxt.unobserve(document.querySelector('${pnObj.next}'))}}}let autoClrbtn=document.querySelector('#qxSetCkIP1');if(autoClrbtn.checked!==settingCfg.auto_block_ad){stChanged=true;settingCfg.auto_block_ad=autoClrbtn.checked;if(settingCfg.auto_block_ad){KillRender.start()}else{KillRender.stop()}}let autoScrollbtn=document.querySelector('#qxSetCkIP2');if(autoScrollbtn.checked!==settingCfg.auto_scroll){stChanged=true;settingCfg.auto_scroll=autoScrollbtn.checked;AutoScroller.toggle()}if(stChanged){document.addEventListener('click',function(e){if(e.target.nodeName==='A'){e.preventDefault();let am=new URL(e.target.href,window.location.origin);if(autoNxtbtn.checked!==old.auto_nxt){am.searchParams.set('auto_nxt',autoNxtbtn.checked)}if(autoClrbtn.checked!==old.auto_block_ad){am.searchParams.set('auto_block_ad',autoClrbtn.checked)}if(autoScrollbtn.checked!==old.auto_scroll){am.searchParams.set('auto_scroll',autoScrollbtn.checked)}window.location.href=am.toString()}})}}settingContainer.classList.remove('qx-fw-setting--show')});`;
    scp += `function clickBtn(cs){if(typeof cs!="string"||cs==='undefined'||cs==='null'){return}let bn=document.querySelector(cs);bn&&bn.click()}let moveX=-1;let hasMove=false;function snapToSide(dx){if(dx>0){container.classList.remove('qx-qw-left');container.classList.add('qx-qw-right')}else{container.classList.add('qx-qw-left');container.classList.remove('qx-qw-right')}AutoScroller.toggle();}container.addEventListener('touchstart',(e)=>{if(e.touches.length>1){e.preventDefault();return}let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(e.target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){if(e.changedTouches.length>0){moveX=e.changedTouches[0].clientX;hasMove=false}else if(e.targetTouches.length>0){moveX=e.targetTouches[0].clientX;hasMove=false}else if(e.touches.length>0){moveX=e.touches[0].clientX;hasMove=false}}});let lastTouchEnd=0;container.addEventListener('touchend',(e)=>{let now=Date.now();if(now-lastTouchEnd<=500){lastTouchEnd=now;e.preventDefault();return}else{lastTouchEnd=now}let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(e.target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){let endX=e.changedTouches[0].clientX;let dx=endX-moveX;if(moveX!==-1&&Math.abs(dx)>100){hasMove=true;moveX=-1;snapToSide(dx)}}});container.addEventListener('click',function(e){e.stopPropagation();let target=e.target;let par=e.target.parentElement;let isSp=target.nodeName=='SPAN';if(target.classList.contains('qx-main')||(isSp&&par.classList.contains('qx-main'))){document.cookie="boomolastsearchtime=; Max-Age=0; path=/";if(hasMove){return}container.classList.toggle('qx-qw-open')}else if(target.classList.contains('qx-btn-prv')||(isSp&&par.classList.contains('qx-btn-prv'))){clickBtn('${pnObj.prev}')}else if(target.classList.contains('qx-btn-nxt')||(isSp&&par.classList.contains('qx-btn-nxt'))){clickBtn('${pnObj.next}')}else if(target.classList.contains('qx-btn-dir')||(isSp&&par.classList.contains('qx-btn-dir'))){clickBtn('${pnObj.dir}')}else if(target.classList.contains('qx-btn-setting')||(isSp&&par.classList.contains('qx-btn-setting'))){settingContainer.classList.add('qx-fw-setting--show')}});document.addEventListener('click',function(e){container.classList.remove('qx-qw-open')});`;
    scp += '})();</script>';
    return {
        styleStr: calcQWStyle(),
        bodyStr: cn + scp
    };
}
function calcFwSearchParam() {
    let am = new URL($request.url);
    if (am.searchParams.size > 0) {
        let sfchanged = false;
        const flagCkS = (str) => str === 'true';
        if (am.searchParams.has('auto_nxt')) {
            sfchanged = true;
            settingCfg.auto_nxt = flagCkS(am.searchParams.get('auto_nxt'));
        }
        if (am.searchParams.has('auto_block_ad')) {
            sfchanged = true;
            settingCfg.auto_block_ad = flagCkS(am.searchParams.get('auto_block_ad'));
        }
        if (am.searchParams.has('auto_scroll')) {
            sfchanged = true;
            settingCfg.auto_scroll = flagCkS(am.searchParams.get('auto_scroll'));
        }
        if (sfchanged) {
            console.log('change setting');
            $prefs.setValueForKey(JSON.stringify(settingCfg), 'qx-fw-dfs_');
        }
    }
}
function calcPrvANex(html) {
    let calc_prvs = ['上一章', '上一页', '上一章节', '上一篇'];
    let calc_nexts = ['下一章', '下一页', '下一章节', '下一篇'];
    let calc_mls = ['目录', '全部章节', '章节目录'];
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
    for (let i = 0; i < calc_prvs.length; i++) {
        let res = calcRgx(calc_prvs[i]).exec(html);
        if (res) {
            prvSelector = getCssSelector(res);
            break;
        }
    }
    for (let i = 0; i < calc_nexts.length; i++) {
        let res = calcRgx(calc_nexts[i]).exec(html);
        if (res) {
            nextSelector = getCssSelector(res);
            break;
        }
    }
    for (let i = 0; i < calc_mls.length; i++) {
        let res = calcRgx(calc_mls[i]).exec(html);
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
    let size = 4;
    let tmpStr = ".qx-qw{all:initial;--size:48px;--itemSize:36px;background:transparent !important;border-radius:50%;position:fixed;z-index:9999;top:50%;transform:translateY(-50%);width:var(--size);height:var(--size);display:flex;justify-content:center;align-items:center}.qx-qw-left{left:3px;right:'auto'}.qx-qw-right{right:3px;left:'auto'}";
    tmpStr += ".qx-qw>div{position:absolute;border-radius:50%;z-index:4;justify-content:center;align-items:center;text-align:center;box-sizing:border-box;transition:transform 0.2s ease,box-shadow 0.2s ease;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%) !important;font-weight:540;overflow:hidden !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-main{width:var(--size);height:var(--size);display:flex;box-shadow:0 4px 40px rgba(98,121,224,0.5);cursor:grabbing}";
    tmpStr += ".qx-main>span,.qx-btn>span{color:#fff !important;font-size:10px;background:transparent !important;font-weight:550 !important;letter-spacing:1px;word-break:normal;overflow:hidden !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-main:hover{transform:scale(1.04)}.qx-qw.qx-qw-open .qx-btn{display:flex}.qx-main>span{color:initial !important;font-size:14px !important}";
    tmpStr += ".qx-btn{display:none;top:calc(var(--size) / 2 * -1 + calc(var(--itemSize) /2 * -1));width:var(--itemSize);height:var(--itemSize);box-shadow:0 2px 10px rgba(102,126,234,0.35);transform-origin:center calc(var(--size) / 2 + var(--itemSize) / 2)}";

    tmpStr += ".qx-qw-setting-box{display:none;position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(40,39,39,0.5) !important;box-shadow:0px 8px 30px rgba(51,48,48,0.74);z-index:10000;align-items:center;justify-content:center}.qx-qw-setting-box.qx-fw-setting--show{display:flex}.qx-qw-setting-layout{width:90%;max-width:190px;min-width:160px;max-height:50vh;background:#fff;border-radius:6px;display:flex;flex-direction:column;overflow:hidden;align-items:center;justify-content:center}.qx-qw-setting-head{width:100%;overflow:hidden;padding:12px 14px;min-height:15px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#828fc6 0%,#5c4572 100%) !important;color:#fff !important}.qx-qw-setting-head h3{margin:0;font-size:16px;height:auto;font-weight:600;background:transparent !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-fw-setting-close{width:28px;height:28px;border:none;background:rgba(255,255,255,0.3);color:#fff;border-radius:50%;cursor:pointer;font-size:18px;line-height:1;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    tmpStr += ".qx-qw-sl-box{width:100%;max-height:25vh;scroll-behavior:smooth;overflow:scroll;overflow-x:hidden}.qx-qw-sl-box::-webkit-scrollbar{width:2px;background:gray}.qx-qw-setting-line{width:100%;padding:8px;color:aliceblue !important;filter:drop-shadow(0 4px 40px rgba(98,121,224,0.5));border:1px solid black;display:flex;align-items:center;justify-content:space-around}.qx-qw-setting-line>span{display:block;font-size:13px;background:transparent !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qx-qw-btn-close{cursor:pointer}";
    tmpStr += "#qxSetCkIP{display:none !important}#qxSetCkIP1{display:none !important}.qxSetingtoggleSwitch{display:flex;align-items:center;justify-content:center;position:relative;width:44px;height:28px;background-color:rgb(119 117 117) !important;border-radius:20px;cursor:pointer;transition-duration:.2s}";
    tmpStr += `.qxSetingtoggleSwitch::after{content:"";position:absolute;height:10px;width:10px;left:5px;background-color:transparent;border-radius:50%;transition-duration:.2s;box-shadow:5px 2px 7px rgba(8,8,8,0.26) !important;border:5px solid white}#qxSetCkIP:checked+.qxSetingtoggleSwitch::after{transform:translateX(100%);transition-duration:.2s;background-color:white}#qxSetCkIP:checked+.qxSetingtoggleSwitch{background-color:rgb(148,118,255) !important;transition-duration:.2s}`;
    tmpStr += `#qxSetCkIP1:checked+.qxSetingtoggleSwitch::after{transform:translateX(100%);transition-duration:.2s;background-color:white}#qxSetCkIP1:checked+.qxSetingtoggleSwitch{background-color:rgb(148,118,255) !important;transition-duration:.2s}`;
    tmpStr += `#qxSetCkIP2{display:none !important}#qxSetCkIP2:checked+.qxSetingtoggleSwitch::after{transform:translateX(100%);transition-duration:.2s;background-color:white}#qxSetCkIP2:checked+.qxSetingtoggleSwitch{background-color:rgb(148,118,255) !important;transition-duration:.2s}`;

    let v1 = size - 1;
    let v2 = 180 / v1;
    let v4 = 0;
    for (let v3 = 3; v3 <= size; v3++) {
        let x1 = 5 + 30 * v4;
        let x2 = v2 * (v4 + 1);
        let x3 = 25;
        tmpStr += `.qx-qw.qx-qw-left>.qx-btn:nth-child(${v3}){transform: translate(${x3}px,${x1}px) rotate(${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-left>.qx-btn:nth-child(${v3})>span{transform: rotate(-${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-right>.qx-btn:nth-child(${v3}){transform: translate(-${x3}px,${x1}px) rotate(-${x2}deg);}`;
        tmpStr += `.qx-qw.qx-qw-right>.qx-btn:nth-child(${v3})>span{transform: rotate(${x2}deg);}`;
        v4++;
    }
    tmpStr += '.qx-qw>.qx-btn:last-child{transform: translate(0px,calc(calc( var(--size) / 2 ) + calc( var(--itemSize) /2) + 8px)) rotate(-180deg);}';
    tmpStr += '.qx-qw>.qx-btn:last-child>span{transform: rotate(180deg);}';
    return tmpStr;
}