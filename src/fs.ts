import { JSONValue } from "./net";
import { existsSync, writeFileSync, appendFileSync, mkdirSync } from 'fs';

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
        appendFileSync(path, data, { encoding: 'utf-8', flag: 'a' });
    } else {
        writeFileSync(path, data, { encoding: 'utf-8', flag: 'w' });
    }
}

function writeArrayBuffer(path: string, data: ArrayBuffer) {
    if (!path) {
        throw Error("path can not be empty.");
    }
    // check directory exists whether or not.
    const dir = path.substring(0, path.lastIndexOf('/'));
    const has_dir = existsSync(dir);
    if (!has_dir) {
        mkdirSync(dir);
    }

    // check file exists whether or not.
    const isExists = existsSync(path);
    if (isExists) {
        appendFileSync(path, new Uint8Array(data), { encoding: 'utf-8', flag: 'a' });
    } else {
        writeFileSync(path, new Uint8Array(data), { encoding: 'utf-8', flag: 'w' });
    }
}


export {
    write,
    writeArrayBuffer
}