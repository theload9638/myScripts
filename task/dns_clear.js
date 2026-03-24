$configuration.sendMessage({action: "dns_clear_cache"}).then(resolve => {
    if (resolve.error) {
        console.log(`dns cache clear error ：${resolve.error}`);
    }
    $done();
}, reject => {
    console.log('dns cache clear reject');
    $done();
});