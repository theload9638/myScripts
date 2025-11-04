const url = $request.url;

if(url.includes('/v3/user/getaccountpage')){
    let body = JSON.parse($response.body);
    let v1 = ['游戏中心','卡牌广场','周边商城'];
    let v2 = ['我发布的','关注收藏','我的全订','浏览记录'];
    body['Data']['BenefitButtonList']=body['Data']['BenefitButtonList'].filter(i=>!v1.includes(i['Name']));
    body['Data']['FunctionButtonList']=body['Data']['FunctionButtonList'].filter(i=>v2.includes(i['Name']));
    body['Data']['BottomButtonList']=body['Data']['BottomButtonList'].filter(i=>i['Name'].includes('帮助'));
    $done({body:JSON.stringify(body)});
}else if(url.includes('/v1/client/getconf')){
    let bd = JSON.parse($response.body);
    delete bd['Data']['ActivityPopup'];
    delete bd['Data']['ActivityIcon'];
    delete bd['Data']['BookShelfBottomIcons'];
    bd['Data']['AdVideoPositionConfig']=[];
    bd['Data']['ClientLocalNotify2']=[];
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v1/user/getsimplediscover')){
    let bd = JSON.parse($response.body);
    let v1 =['游戏','游戏中心f','周边商城','卡牌广场','热门角色'];
    bd['Data']['Items'] = bd['Data']['Items'].filter(i=>!v1.includes(i['ShowName']));
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v1/booksquare/getsquarepagepiece')){
    let bd = JSON.parse($response.body);
    bd['Data']['Items'] = bd['Data']['Items'].map(i=>{
        if(i['CommonExt'] || i['Type']===1){
            if(i['CommonExt']['ColumnName']==='banner'){
                i['Data']['List']=[];
            }
        }else if(i['Type']===3){
            i['Data']['MultiList']=i['Data']['MultiList'].map(j=>{
                if(j['CommonExt'] && j['CommonExt']['ColumnName']==='broadcast'){
                    j['List']=[];
                }
                return j;
            })
        }
        return i;
    });
    $done({body:JSON.stringify(bd)});
}else if(url.includes('/v1/audiosquare/page')){
    let bd = JSON.parse($response.body);
    bd['Data']['Items'] = bd['Data']['Items'].map(i=>{
        if(i['ColumnName']==='banner'){
            i['Data']['Items']=[];
            return i;
        }
        return i;
    });
    $done({body:JSON.stringify(bd)});
}
else{
    $done({});
}