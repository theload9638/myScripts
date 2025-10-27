let html = $response.body;
let str = `<script type='text/javascript'>
    let zhChecker1_2 = undefined;
    let cleanStatu_k_1 = 0;
    function clearPopCheckKl_(){
        let signDoms = document.querySelectorAll('.signFlowModal');
        let closDoms = document.querySelectorAll('.Modal-closeButton');
        let tipDoms = document.querySelectorAll('.css-woosw9');
        if(signDoms && closDoms && signDoms.length >0 && closDoms.length >0){
            closDoms[0].click();
        }
        if(tipDoms.length>0){
            tipDoms[0].remove();
        }
        if(!cleanStatu_k_1){
            clearBannerCheckKl_2();
        }
    }
    function clearBannerCheckKl_2(){
        let bns = document.querySelector('.AppBanner');
        bns && bns.parentNode.remove();
        document.querySelector('.Question-main').removeAttribute('class');
        document.querySelectorAll('.css-dvccr2').forEach(i=>i.remove());
        document.querySelectorAll('.ContentItem-expandButton').forEach(i=>i.click());
        cleanStatu_k_1=1;
    }
    zhChecker1_2=setInterval(clearPopCheckKl_,200);
</script></html>`;
html = html.replace(/<\/html>/,str);
$done({body:html});

