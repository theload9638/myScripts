let html = $response.body;
let str = `<script ${html.match(/nonce="\w*"/g)[0]}>
    setInterval(()=>{
        let signDoms = document.querySelectorAll('.signFlowModal');
        let closDoms = document.querySelectorAll('.Modal-closeButton');
        let tipDoms = document.querySelectorAll('.css-woosw9');
        if(signDoms && closDoms && signDoms.length >0 && closDoms.length >0){
            closDoms[0].click();
        }
        if(tipDoms.length>0){
            tipDoms[0].remove();
        }
        console.log(1);
    },200);
    setTimeout(()=>{
        let bns = document.querySelector('.AppBanner');
        bns && bns.parentNode.remove();
        document.querySelector('.Question-main').removeAttribute('class');
        document.querySelectorAll('.css-dvccr2').forEach(i=>i.remove());
        document.querySelectorAll('.ContentItem-expandButton').forEach(i=>i.click());
    },600);
</script>
</html>
`;
html = html.replace(/<\/html>/,str);
$done( { body: html } );

