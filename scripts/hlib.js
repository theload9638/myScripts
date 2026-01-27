let html = $response.body;
const url = $request.url;

let styleStr = '#suggest,#rnlist,#comments,#exo-native-widget-5098390-adX3C,.my-2,video,.pHS5vbgQ_main_outstream,.exo_wrapper_show,.container-xl{display:none !important;pointer-events: none !important;}';

html = html.replace(/<html\s*>/,'<html data-bs-theme="dark">');
html = html.replace(/<script(.*?)src=\".*?(?=a.magsrv.com).*?\"[^>]*>/g,'<script>');
html = html.replace(/<iframe(.*?)<\/iframe>/gs,'');
html = html.replace(/alert\(/g,"console.log(");

html = html.replace(/<\/head>/, '<style>'+styleStr + '</style><meta name="theme-color" content="black"></head>');

$done({ body: html });