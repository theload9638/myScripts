
let body = $response.body;
body = body.replace('<script crossorigin="" src="https://static.zhihu.com/heifetz/chunks/main-question-routes.164f38600b688da61abe.js"></script>','');
$done({body:body});

