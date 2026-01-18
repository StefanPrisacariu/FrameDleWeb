import { decodeStorage, encodeStorage } from "@/app/helpers/encoder";

export const safeSetItem = (
    key: string,
    value: object | string | number
): void => {
    try {
        localStorage.setItem(key, encodeStorage(value));
    } catch (e) {
        console.error("Error storing:", e);
    }
};

export const safeGetItem = <T = string>(key: string): T | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? decodeStorage<T>(value) : null;
    } catch (e) {
        console.error("Error reading:", e);
        return null;
    }
};
