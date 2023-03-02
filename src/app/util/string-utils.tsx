import * as _ from 'lodash';

export function firstLetters(input?: string, num: number = 1): string {
    if (!input) {
        return '';
    }
    const arr = input.split(' ');
    if (arr.length === 0) {
        return '';
    }
    const min = Math.min(num, arr.length - 1);
    let result = '';
    for (let i = 0; i <= min; i++) {
        result += arr[i].substring(0, 1);
    }
    return result;
}

const StringUtils = {
    firstLetters
}

export default StringUtils;