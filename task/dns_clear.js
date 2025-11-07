$configuration.sendMessage({action: "dns_clear_cache"}).then(resolve => {
    if (resolve.error) {
        console.log(`dns缓存清除异常：${resolve.error}`);
    }
    if (resolve.ret) {
        console.log('dns缓存清除结束!');
    }
    $done();
}, reject => {
    $done();
});