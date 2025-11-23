const key = '_retryTask';
let vals = $prefs.valueForKey(key);
if (!vals) {
    console.log('暂无重试任务');
    $done();
    return;
}
const arr = JSON.parse(vals);
if(Array.isArray(arr) && arr.length<=0){
    console.log(`任务处理异常：${vals}`);
    $prefs.removeValueForKey(key);
    $done();
    return;
}
console.log('本次执行任务次数：' + arr.length);
$prefs.removeValueForKey(key);
try {
    Promise.allSettled(arr.map(i => new HttpTask(i))).then(res => {
        console.log('本次任务结果数量：'+res.length);
        for (let k of res) {
            console.log(k + '\n');
        }
    });
} catch (e) {
    console.log('未知异常：' + e);
} finally {
    $done();
}
// let taskModel = {
//     request: {},
//     name: '',
//     hasNext: true,
//     needResponse: true,
//     next: {},
//     mapHanlder: (res) => { },
//     preload: (res) => { },
//     options: {},
//     timeout: 3,
//     retryTimes: 3
// };

function HttpTask(task) {
    if (!task) {
        return Promise.reject('task is null');
    }
    const executeRetry = async (locTask, result, retryTimes) => {
        if (!locTask) {
            return result;
        }
        try {
            if (locTask.needResponse && locTask.preload) {
                if (typeof locTask.preload === 'function') {
                    locTask.preload.call(locTask, result);
                }
            }
            let res = await send(locTask);
            if (locTask.mapHanlder && typeof locTask.mapHanlder === 'function') {
                result = locTask.mapHanlder.call(locTask, res);
            } else {
                result = res;
            }
            if (!locTask.hasNext) {
                return result;
            } else {
                return await executeRetry(locTask.next, result, retryTimes);
            }
        } catch (e) {
            if (retryTimes > 0) {
                addRetryTask(task, retryTimes - 1); // 通知机制
            }
            throw new Error(`${locTask.name} 本次重试任务执行失败,opts: ${locTask.options ? JSON.stringify(locTask.options) : null}`);
        }
    };
    return new Promise((resolve, reject) => {
        executeRetry(task, null, task.retryTimes).then(res => resolve(res)).catch(err => reject(err));
    });
}
function send(task) {
    if (!task) {
        return Promise.reject('task is null');
    }
    let req = task.request;
    let opts = task.options;
    let timeout = task.timeout || 5000;
    let type = task.name || 'api';
    if (!req.method) {
        req.method = 'GET';
    }
    if (!req.headers["User-Agent"]) {
        req.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
    }
    if (!req.opts) {
        req.opts = { redirection: false };
    }
    return Promise.race([new Promise((a, b) => {
        setTimeout(() => {
            b({ error: `请求超时\n`, opts, type });
        }, timeout);
    }), new Promise((res, rej) => {
        $task.fetch(req).then(response => {
            res({ ...response, opts });
        }, reason => {
            rej({ opts, error: reason.error, type });
        });
    })])
}
function findLastTask(task) {
    if (!task) {
        return null;
    }
    if (task.hasNext === false) {
        return task;
    } else {
        if (task.hasOwnProperty('next')) {
            return findLastTask(task.next);
        }
        return task;
    }
}
function addRetryTask(task, availableTimes) {
    console.log(`${task.name}进行任务重试,剩余重试次数：${availableTimes} , options: ${task.options ? JSON.stringify(task.options) : null}`);
    task.retryTimes = availableTimes;
    let vals = $prefs.valueForKey(key);
    let arr = [task];
    if (vals) {
        arr = JSON.parse(vals);
        arr.push(task);
    }
    $prefs.setValueForKey(JSON.stringify(arr), key);
}
