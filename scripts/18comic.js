/*
# !name = jm去广告
# !desc = jm no ad , supports app and web ,超级净化,支持App和网页版
# !author = theload9638
# 配合使用 https://raw.githubusercontent.com/theload9638/myScripts/main/filters/block.list 

# cdn-msp*.jmapiproxy*.* , cn-appdata.jmapiproxy*.cc ,
# cdn-msp*.jmdanjonproxy*.* , cdn-msp*.18comic.*, tencent.jmdanjonproxy.xyz


************************************

[rewrite_local]
  # 入口/章节
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/ad_template url reject-200
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/chapter_view_template url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/novel.js
  # 广告/视频/游戏
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/(advertise|allgames|videos|advertise_all|ad_content_all) url reject-dict
^https?:\/\/(s|syndication)\.(chnsrv|realsrv)\.com\/v1\/api\.php url response-body "zones":\[.+\],"renderers":\{.+\} response-body "zones":[],"renderers":{}
^https?:\/\/a\.(chnsrv|realsrv)\.com\/ url reject-200

^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/(setting|login) url script-response-body jm.js

  # web
^https?:\/\/(18comic|jmcomic-zzz)\.(vip|ink|one|org) text/html url-and-header script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/novel.js

[mitm]
hostname = syndication.realsrv.com,a.realsrv.com,jmcomic-zzz.one,jmcomic-zzz.org,18comic.ink,18comic.vip,www.cdnbea.org,www.cdnsha.org,www.cdnzack.cc,www.cdnntr.cc,www.cdnhth.club,www.cdngwc.cc,www.cdngwc.club,www.cdngwc.net,www.cdnhjk.cc,s.chnsrv.com,a.chnsrv.com

*/

var Crypto=(function(){function cmhx(text){var chrsz=8;function cm1(x,len){x[len>>5]|=0x80<<(len%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=cm3(a,b,c,d,x[i+0],7,-680876936);d=cm3(d,a,b,c,x[i+1],12,-389564586);c=cm3(c,d,a,b,x[i+2],17,606105819);b=cm3(b,c,d,a,x[i+3],22,-1044525330);a=cm3(a,b,c,d,x[i+4],7,-176418897);d=cm3(d,a,b,c,x[i+5],12,1200080426);c=cm3(c,d,a,b,x[i+6],17,-1473231341);b=cm3(b,c,d,a,x[i+7],22,-45705983);a=cm3(a,b,c,d,x[i+8],7,1770035416);d=cm3(d,a,b,c,x[i+9],12,-1958414417);c=cm3(c,d,a,b,x[i+10],17,-42063);b=cm3(b,c,d,a,x[i+11],22,-1990404162);a=cm3(a,b,c,d,x[i+12],7,1804603682);d=cm3(d,a,b,c,x[i+13],12,-40341101);c=cm3(c,d,a,b,x[i+14],17,-1502002290);b=cm3(b,c,d,a,x[i+15],22,1236535329);a=cm4(a,b,c,d,x[i+1],5,-165796510);d=cm4(d,a,b,c,x[i+6],9,-1069501632);c=cm4(c,d,a,b,x[i+11],14,643717713);b=cm4(b,c,d,a,x[i+0],20,-373897302);a=cm4(a,b,c,d,x[i+5],5,-701558691);d=cm4(d,a,b,c,x[i+10],9,38016083);c=cm4(c,d,a,b,x[i+15],14,-660478335);b=cm4(b,c,d,a,x[i+4],20,-405537848);a=cm4(a,b,c,d,x[i+9],5,568446438);d=cm4(d,a,b,c,x[i+14],9,-1019803690);c=cm4(c,d,a,b,x[i+3],14,-187363961);b=cm4(b,c,d,a,x[i+8],20,1163531501);a=cm4(a,b,c,d,x[i+13],5,-1444681467);d=cm4(d,a,b,c,x[i+2],9,-51403784);c=cm4(c,d,a,b,x[i+7],14,1735328473);b=cm4(b,c,d,a,x[i+12],20,-1926607734);a=cm5(a,b,c,d,x[i+5],4,-378558);d=cm5(d,a,b,c,x[i+8],11,-2022574463);c=cm5(c,d,a,b,x[i+11],16,1839030562);b=cm5(b,c,d,a,x[i+14],23,-35309556);a=cm5(a,b,c,d,x[i+1],4,-1530992060);d=cm5(d,a,b,c,x[i+4],11,1272893353);c=cm5(c,d,a,b,x[i+7],16,-155497632);b=cm5(b,c,d,a,x[i+10],23,-1094730640);a=cm5(a,b,c,d,x[i+13],4,681279174);d=cm5(d,a,b,c,x[i+0],11,-358537222);c=cm5(c,d,a,b,x[i+3],16,-722521979);b=cm5(b,c,d,a,x[i+6],23,76029189);a=cm5(a,b,c,d,x[i+9],4,-640364487);d=cm5(d,a,b,c,x[i+12],11,-421815835);c=cm5(c,d,a,b,x[i+15],16,530742520);b=cm5(b,c,d,a,x[i+2],23,-995338651);a=cm6(a,b,c,d,x[i+0],6,-198630844);d=cm6(d,a,b,c,x[i+7],10,1126891415);c=cm6(c,d,a,b,x[i+14],15,-1416354905);b=cm6(b,c,d,a,x[i+5],21,-57434055);a=cm6(a,b,c,d,x[i+12],6,1700485571);d=cm6(d,a,b,c,x[i+3],10,-1894986606);c=cm6(c,d,a,b,x[i+10],15,-1051523);b=cm6(b,c,d,a,x[i+1],21,-2054922799);a=cm6(a,b,c,d,x[i+8],6,1873313359);d=cm6(d,a,b,c,x[i+15],10,-30611744);c=cm6(c,d,a,b,x[i+6],15,-1560198380);b=cm6(b,c,d,a,x[i+13],21,1309151649);a=cm6(a,b,c,d,x[i+4],6,-145523070);d=cm6(d,a,b,c,x[i+11],10,-1120210379);c=cm6(c,d,a,b,x[i+2],15,718787259);b=cm6(b,c,d,a,x[i+9],21,-343485551);a=cm7(a,olda);b=cm7(b,oldb);c=cm7(c,oldc);d=cm7(d,oldd)}return Array(a,b,c,d)}function cm2(q,a,b,x,s,t){return cm7(cm8(cm7(cm7(a,q),cm7(x,t)),s),b)}function cm3(a,b,c,d,x,s,t){return cm2((b&c)|((~b)&d),a,b,x,s,t)}function cm4(a,b,c,d,x,s,t){return cm2((b&d)|(c&(~d)),a,b,x,s,t)}function cm5(a,b,c,d,x,s,t){return cm2(b^c^d,a,b,x,s,t)}function cm6(a,b,c,d,x,s,t){return cm2(c^(b|(~d)),a,b,x,s,t)}function cm7(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}function cm8(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function cm9(str){var bin=[];var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin}function cm10(ba){var hxt='0123456789abcdef';var out=new Array(ba.length*8);var p=0;for(var i=0;i<ba.length*4;i++){out[p++]=hxt[(ba[i>>2]>>((i%4)*8+4))&0xF];out[p++]=hxt[(ba[i>>2]>>((i%4)*8))&0xF]}return out.join('')}return cm10(cm1(cm9(text),text.length*chrsz))}var bte1=new TextEncoder();var btd1=new TextDecoder();function b28(str){var bin=atob(str);var len=bin.length;var arr=new Uint8Array(len);for(var i=0;i<len;i++)arr[i]=bin.charCodeAt(i);return arr}function u2b(arr){var chunk=0x8000;var ret='';for(var i=0;i<arr.length;i+=chunk){ret+=String.fromCharCode.apply(null,arr.subarray(i,i+chunk))}return btoa(ret)}function s28(str){return bte1.encode(str)}function u2s(arr){return btd1.decode(arr)}var SBOX=new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22]);var INV_SBOX=new Uint8Array(256);for(var i=0;i<256;i++)INV_SBOX[SBOX[i]]=i;var RCON=new Uint8Array([0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36]);function at1(a){return((a<<1)^(((a>>7)&1)*0x1b))&0xff}function at2(a){let t=a[0]^a[1]^a[2]^a[3],u=a[0];a[0]^=t^at1(a[0]^a[1]);a[1]^=t^at1(a[1]^a[2]);a[2]^=t^at1(a[2]^a[3]);a[3]^=t^at1(a[3]^u)}function at3(a){let u=at1(at1(a[0]^a[2])),v=at1(at1(a[1]^a[3]));a[0]^=u;a[1]^=v;a[2]^=u;a[3]^=v;at2(a)}function at4(a){let Nk=a.length/4,Nr=Nk+6,w=new Uint8Array(16*(Nr+1)),temp=new Uint8Array(4);w.set(a);for(var i=Nk;i<4*(Nr+1);i++){temp[0]=w[(i-1)*4];temp[1]=w[(i-1)*4+1];temp[2]=w[(i-1)*4+2];temp[3]=w[(i-1)*4+3];if(i%Nk===0){var t=temp[0];temp[0]=SBOX[temp[1]]^RCON[i/Nk];temp[1]=SBOX[temp[2]];temp[2]=SBOX[temp[3]];temp[3]=SBOX[t]}else if(Nk>6&&i%Nk===4){temp[0]=SBOX[temp[0]];temp[1]=SBOX[temp[1]];temp[2]=SBOX[temp[2]];temp[3]=SBOX[temp[3]]}for(var j=0;j<4;j++)w[i*4+j]=w[(i-Nk)*4+j]^temp[j]}return{w,Nr}}function at5(a,w,b){for(var i=0;i<16;i++)a[i]^=w[b*16+i]}function at6(a){for(var i=0;i<16;i++)a[i]=SBOX[a[i]]}function at7(a){for(var i=0;i<16;i++)a[i]=INV_SBOX[a[i]]}function at8(s){var t=new Uint8Array(s);s[1]=t[5];s[5]=t[9];s[9]=t[13];s[13]=t[1];s[2]=t[10];s[6]=t[14];s[10]=t[2];s[14]=t[6];s[3]=t[15];s[7]=t[3];s[11]=t[7];s[15]=t[11]}function at9(s){var t=new Uint8Array(s);s[1]=t[13];s[5]=t[1];s[9]=t[5];s[13]=t[9];s[2]=t[10];s[6]=t[14];s[10]=t[2];s[14]=t[6];s[3]=t[7];s[7]=t[11];s[11]=t[15];s[15]=t[3]}function am1(s){for(var i=0;i<4;i++)at2(s.subarray(i*4,i*4+4))}function am2(s){for(var i=0;i<4;i++)at3(s.subarray(i*4,i*4+4))}function am3(a,c){var b=new Uint8Array(a);at5(b,c.w,0);for(var r=1;r<c.Nr;r++){at6(b);at8(b);am1(b);at5(b,c.w,r)}at6(b);at8(b);at5(b,c.w,c.Nr);return b}function am4(a,c){var b=new Uint8Array(a);at5(b,c.w,c.Nr);for(var r=c.Nr-1;r>0;r--){at9(b);at7(b);at5(b,c.w,r);am2(b)}at9(b);at7(b);at5(b,c.w,0);return b}function am5(a){let b=16-(a.length%16),c=new Uint8Array(a.length+b);c.set(a);for(var i=a.length;i<c.length;i++)c[i]=b;return c}function am6(a){return a.slice(0,a.length-a[a.length-1])}function am7(a,b){let c=at4(b);a=am5(a);let d=new Uint8Array(a.length);for(var i=0;i<a.length;i+=16)d.set(am3(a.slice(i,i+16),c),i);return d}function am8(a,b){var c=at4(b);var d=new Uint8Array(a.length);for(var i=0;i<a.length;i+=16)d.set(am4(a.slice(i,i+16),c),i);return am6(d)}return{dec:function(a,b,c,d=true){return JSON.parse(u2s(am8(b28(b),s28(cmhx(d?(c+a):a)))))},enc:function(a,b,c,d=true){return u2b(am7(s28(JSON.stringify(b)),s28(cmhx(d?(c+a):a))))},}})();

let cl = $response.headers['Content-Length'];
if (!$response.body || (cl && parseInt(cl) == 0)) {
    console.log('empty response');
    $done({});
    return;
}
let secrets_json = $prefs.valueForKey('jm_secrets');
if (!secrets_json) {
    console.log('unknow secret');
    $done({});
    return;
}

let ts = ($request.headers['tokenparam'] || $request.headers['Tokenparam'] || $request.headers['TokenParam'] || '').split(',')[0];
let url = $request.url;
if (!ts && $request.url.includes('?')) {
    let am = new URL($request.url);
    if (am.searchParams.size > 0) {
        ts = am.searchParams.get('t') || am.searchParams.get('v');
        console.log(`no tokenparam , use ts from ?t=&v= , headers:\n${JSON.stringify($request.headers)}\n`);
    }
}
if (ts) {
    try {
        let bd = JSON.parse($response.body);
        if (bd.code !== 200 || !bd.data) {
            console.log('unknow data');
            $done({});
            return;
        }
        let secrets = JSON.parse(secrets_json);
        if (typeof secrets !== 'object' && !Array.isArray(secrets) && secrets.length == 0) {
            console.log('secrets is empty');
            $done({});
            return;
        }
        let count=0;
        for (let sec of secrets) {
            try {
                let res = Crypto.dec(sec,bd.data, ts);
                if (url.includes('/setting')) {
                    res['float_ad'] = false;
                    res['ad_cache_version'] = '';
                    res['version_info:'] = '';
                    res['jm3_version_info'] = '';
                    res['is_hot_update']=false;
                } else if (url.includes('/login')) {
                    res['ad_free'] = true;
                    res['ad_free_before'] = '9999-12-30 23:59:59';
                }
                bd.data = Crypto.enc(sec,res, ts);
                break;
            } catch (e) {
                console.log(`secret is invalid: ${sec}`);
                count++;
            }
        }
        if(count===secrets.length){
            console.log('all secret is invalid');
            $done({});
            return;
        }
        $done({ body: JSON.stringify(bd) });
    } catch (e) {
        console.log(`script fail because: ${e.message}`);
        $done({});
    }
} else {
    console.log('unknow ts');
    $done({});
}