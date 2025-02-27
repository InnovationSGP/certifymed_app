export const getSessionStorageItem = (key) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
};

export const setSessionStorageItem = (key, data) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.setItem(key, data);
    }
    return null;
};
