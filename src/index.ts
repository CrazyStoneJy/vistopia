// import { request } from "./request";

import { fetchAudios, search } from "./api";
import { writeArrayBuffer } from "./fs";
import fetcher from "./net";

async function test_download() {
    const obj = {
        name: 'test3.mp3',
        url: 'http://cdn.vistopia.com.cn/1564483846664.mp3'
    }
    const res = await fetcher.download(obj.url);
    writeArrayBuffer(`./resources/${obj.name}`, res)
    console.log("download successfully.");
}

function main() {
    // fetchAudios();
    // test_download();
    search('袁长庚');
}
 
main();