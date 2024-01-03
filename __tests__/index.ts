function foo(a: number, b: number): number {
    return a + b;
}

describe('test', () => {
    test('foo', () => {
        // console.log(foo(1, 2));
        expect(foo(1, 2)).toBe(3);
    })
})