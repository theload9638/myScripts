$configuration.sendMessage({action: "dns_clear_cache"}).then(resolve => {
    if (resolve.error) {
        console.log(`dns cache clear error ：${resolve.error}`);
    }
    if (resolve.ret) {
        console.log('dns cache clear ok!');
    }
    $done();
}, reject => {
    $done();
});