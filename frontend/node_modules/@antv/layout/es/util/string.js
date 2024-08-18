export const isString = (val) => typeof val === 'string';
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
// export const capitalize = cacheStringFunction(
//   (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
// )
//# sourceMappingURL=string.js.map