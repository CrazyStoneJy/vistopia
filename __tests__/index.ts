import fetcher from '../src/net'
import { writeArrayBuffer } from '../src/fs'

function foo(a: number, b: number): number {
    return a + b;
}

describe('test', () => {
    test('foo', () => {
        // console.log(foo(1, 2));
        expect(foo(1, 2)).toBe(3);
    })
    test('encode', async () => {
        const str = '我爱中国';
        console.log(encodeURI(str));
        console.log(encodeURIComponent(str));
        
        
        // const obj = {
        //     name: 'test.mp3',
        //     url: 'http://cdn.vistopia.com.cn/1562159898422.mp3'
        // }
        // const res = await fetcher.download(obj.url);
        // writeArrayBuffer(`./resource/${obj.name}`, res)
    })
})