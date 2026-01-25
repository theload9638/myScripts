let html = $response.body;
const url = $request.url;

let style = '#popup_box,.banner_box,.banner,.note_box,.foot_box,.shortcut_box,#immersive-translate-popup,.place_holder_box,#comment_list,.dmca_box,.popular_box{display:none !important;pointer-events: none !important;}';

html = html.replace(/<div\s*id=\"popup_box\".*?<script\s*type=\"text\/javascript\">/s,'<script type="text/javascript">');
html = html.replace(/<div\s*class=\"banner_box\".*?<div\s*class=\"main_box\">/s,'<div class="main_box">');
html = html.replace(/<iframe(.*?)<\/iframe>/gs,'');

if(url.includes('/novel/chapter?id=')){
    
}
html = html.replace(/<\/head>/,'<style>'+style+'</style></head>');
$done({ body: html });