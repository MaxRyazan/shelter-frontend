export function $rs(param: number | string | undefined, precision = 3): string {
    if (!param) return toNum(param).toFixed(precision)
    let strParam = param.toString();
    let strArr = strParam.split(".");

    if (strArr.length === 2) {
        const delta = precision - (strArr[1]?.length ?? 0);

        if (delta > 0) {
            for (let i = 0; i < delta; i++) {
                strArr[1] += '0';
            }
            return Number(strArr[0] + '.' + strArr[1]).toFixed(precision);
        } else {
            const multiplier = Math.pow(10, precision);
            const rounded = Math.round(toNum(param) * multiplier) / multiplier;
            return rounded.toFixed(precision);
        }
    } else {
        return toNum(param).toFixed(precision);
    }
}

export function toNum(arg: any): number {
    if (arg === null || arg === undefined || typeof arg === 'object') return 0;
    if (typeof arg === 'boolean') return arg ? 1 : 0;
    if (typeof arg === 'string' && !/^-?\d*\.?\d+$/.test(arg.trim())) return 0;
    const num = Number(arg);
    return isNaN(num) ? 0 : num;
}