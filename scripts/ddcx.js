const bodyStr = $response.body;
let obj = JSON.parse(bodyStr);
obj.data.instances['center_widget_list']={
    data:[],
    xins:undefined,
    xcomp:'',
    xtpl:''
};
$done({body:JSON.stringify(obj)});