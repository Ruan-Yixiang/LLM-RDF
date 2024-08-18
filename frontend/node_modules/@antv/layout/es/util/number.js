export const isNumber = (val) => typeof val === 'number';
export const isNaN = (num) => Number.isNaN(Number(num));
export const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
//# sourceMappingURL=number.js.map