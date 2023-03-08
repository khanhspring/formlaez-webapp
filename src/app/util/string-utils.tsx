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

export function toQuery(obj: any, prefix: string = ''): string {
  var str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && typeof obj[p] !== 'object') {
      str.push(prefix + encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    if (obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
      str.push(toQuery(obj[p], `${p}.`))
    }
  }
  return str.join("&");
}

export function trimCharAtEnd(val: string, char: string): string {
  if (!val) {
    return val;
  }
  const regex = new RegExp(char + '+$');
  return val.replace(regex, '');
}

const StringUtils = {
  firstLetters,
  toQuery,
  trimCharAtEnd
}

export default StringUtils;