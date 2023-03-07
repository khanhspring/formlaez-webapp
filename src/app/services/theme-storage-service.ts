import { THEME_KEY } from "../constants/global";

const storage = localStorage;

export function saveTheme(theme: 'dark' | 'light') {
    storage.setItem(THEME_KEY, theme);
}

export function removeTheme() {
    storage.removeItem(THEME_KEY);
}

export function getTheme(): 'dark' | 'light' | undefined {
    const val = storage.getItem(THEME_KEY);
    if (!val) {
        return undefined;
    }
    if (['dark', 'light', 'system'].includes(val)) {
        return val as any;
    }
    return undefined;
}

const ThemeStorageService = {
    saveTheme,
    removeTheme,
    getTheme
};

export default ThemeStorageService;