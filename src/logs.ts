
const networkLogInfo = {
    isDebug: true,
    tag: 'network'
};

const defaulutInfo = {
    isDebug: true,
    tag: 'tag'
}


function XLog() {

    function log(...message: any[]) {
        const { tag, isDebug } = defaulutInfo;
        if (isDebug) {
            console.log(`>>>${tag} `, ...message);
        }
    }

    function logN(...message: any[]) {
        const { tag, isDebug } = networkLogInfo;
        if (isDebug) {
            console.log(`>>>${tag} `, ...message);
        }
    }

    return {
        logN,
        log
    }

}

const xLog = XLog();
const logN = xLog.logN;
const log = xLog.log;

export {
    logN,
    log
}
