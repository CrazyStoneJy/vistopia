function isArray(arr: any): boolean {
    return Array.isArray(arr);
}

function notEmpty(arr: any) {
    if (!isArray(arr)) {
        return false;
    }
    return (arr !== null || arr !== undefined) && (arr.length > 0);
}

export {
    isArray,
    notEmpty
}