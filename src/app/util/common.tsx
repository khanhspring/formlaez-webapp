import * as _ from 'lodash';

export const doNothing = () => { };

export function orElseEmptyString<T>(value: T) {
    if (value === undefined || value === null) {
        return '';
    }
    return String(value);
}

export function numberOrUndefined<T>(value: T): number | undefined {
    if (value === undefined || value === null) {
        return undefined;
    }

    if (_.isNaN(+value)) {
        return undefined;
    }

    return Number(value);
}