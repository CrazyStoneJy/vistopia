import { JSONValue } from "./net";
import { existsSync, writeFileSync, appendFileSync } from 'fs';

function write(path: string, data: JSONValue | string) {
    if (!path) {
        throw Error("path can not be empty.");
    }
    // check file exists whether or not.
    const isExists = existsSync(path);
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    if (isExists) {
        writeFileSync(path, data, { encoding: 'utf-8', flag: 'w' });
    } else {
        appendFileSync(path, data, { encoding: 'utf-8', flag: 'w' });
    }
}

function writeArrayBuffer(path: string, data: ArrayBuffer) {
    if (!path) {
        throw Error("path can not be empty.");
    }
    // check file exists whether or not.
    const isExists = existsSync(path);
    if (isExists) {
        writeFileSync(path, data, { encoding: 'utf-8', flag: 'w' });
    } else {
        appendFileSync(path, data, { encoding: 'utf-8', flag: 'w' });
    }
}


export {
    write,
    writeArrayBuffer
}