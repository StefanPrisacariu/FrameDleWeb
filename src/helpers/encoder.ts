export const encodeStorage = (obj: object | string | number): string => {
    const json = JSON.stringify(obj);
    return btoa(json);
};

export const decodeStorage = <T = string>(encoded: string): T | null => {
    try {
        const json = atob(encoded);
        return JSON.parse(json) as T;
    } catch {
        return null;
    }
};
