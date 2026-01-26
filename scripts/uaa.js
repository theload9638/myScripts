const url = $request.url;
let html = $response.body;
let style = '#popup_box,#popup_content_box,.balance_insufficient_dialog_box,.banner_box,.banner,.note_box,.foot_box,.shortcut_box,#immersive-translate-popup,.place_holder_box,#comment_list,.dmca_box{display:none !important;pointer-events: none !important;}';

html = html.replace(/<iframe(.*?)<\/iframe>/gs, '');
html = html.replace(/<script(.*?)src=\".*?(?=www.googletagmanager.com).*?\"[^>]*>/g,'<script>');
html = html.replace(/<script(.*?)src=\".*?(?=bundlemoviepumice.com).*?\"[^>]*>/g,'<script>');

if (url.includes('/novel/chapter?id=')) {
    html = html.replace(/<div\s*class=\"article\"(.*?)code=\"3\">/gs, '<div class="article"$1 code="999" >')
}
html = html.replace(/<\/head>/, '<style>' + style + '</style></head>');

$done({ body: html });

