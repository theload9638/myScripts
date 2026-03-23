/*
 * #!name=hlw

[rewrite_local]
^https?:\/\/heiliao\.com(?!\/(index(?!\/search)|static)) text/html url-and-header script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/hlw.js
   
[mitm]
hostname = heiliao.com
 * 
 */

const url = $request.url;
let html = $response.body;
let str = '<style> .addbox,.modal,.slider-banners,.slider-wrapper,.infomation,.footer{display:none !important;} ';
let str1 =' .video-item{margin-top: .65rem;width:100%;display:none;} .video-item:has(h3){display:block !important;}';
if(!url.includes('/index/search')){
    str=str+str1;   
}
html = html.replace(/<style>/g,str);
if(url.includes('/archives')){
    html = html.replace(/<style>/g,'<style> .list-sec-top,.list-sec,.common{display:none !important;}');
}
$done({ body: html });


