import * as _ from 'lodash';
import { toast } from 'react-toastify';

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

export const showError = () => {
    toast.error("There was an error has ocurred. Please try again!")
};

export const showErrorIgnore403 = (error: any, message?: string) => {
    if (error.response?.status === 403) {
        return;
    }
    if (error.response?.status === 402) {
        toast.error("Your workspace has reached its usage limit. Please contact owners for more detail.", {autoClose: 5500})
        return;
    }
    toast.error(message || "There was an error has ocurred. Please try again!")
};

export const showSuccess = () => {
    toast.success("Successfully!")
};