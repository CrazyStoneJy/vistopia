import { existsSync,mkdirSync } from 'fs';
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
        expect(encodeURI(str)).toBe(encodeURIComponent(str))
    })
    test('file', () => {
        const path = '/Users/crazystone/codespace/vistopia/temp/test.mp3'
        const dir = path.substring(0, path.lastIndexOf('/'));
        expect(dir).toBe('/Users/crazystone/codespace/vistopia/temp');
        // expect(existsSync(dir)).toBe(true)
        // const res = mkdirSync(dir)
        // console.log(res);
        
    });
})