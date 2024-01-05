
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
})