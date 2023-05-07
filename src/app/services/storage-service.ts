const storage = localStorage;

export function setItem(key: string, value: any) {
    storage.setItem(key, value);
}

export function removeItem(key: string) {
    storage.removeItem(key);
}

export function getItem(key: string) {
    return storage.getItem(key);
}

const StorageService = {
    setItem,
    removeItem,
    getItem
};

export default StorageService;