let html = $response.body;
let str = `<script defer>
    let zhChecker1_2 = undefined;
    function clearPopCheckKl_(){
        let signDoms = document.querySelectorAll('.signFlowModal');
        let closDoms = document.querySelectorAll('.Modal-closeButton');
        let tipDoms = document.querySelectorAll('.css-woosw9');
        if(signDoms && closDoms && signDoms.length >0 && closDoms.length >0){
            closDoms[0].click();
            clearInterval(zhChecker1_2);
        }
        if(tipDoms.length>0){
            tipDoms[0].remove();
        }
        zhChecker1_2=null;
    }
    zhChecker1_2=setInterval(clearPopCheckKl_,200);
</script></html>`;
html = html.replace('</html>',str);
$done({body:html});

