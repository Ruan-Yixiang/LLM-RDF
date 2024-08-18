export const isObject = (val) => val !== null && typeof val === 'object';
export const clone = (target) => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime());
    }
    if (target instanceof Array) {
        const cp = [];
        target.forEach((v) => {
            cp.push(v);
        });
        return cp.map((n) => clone(n));
    }
    if (typeof target === 'object' && Object.keys(target).length) {
        const cp = Object.assign({}, target);
        Object.keys(cp).forEach((k) => {
            cp[k] = clone(cp[k]);
        });
        return cp;
    }
    return target;
};
//# sourceMappingURL=object.js.map