export function safeSetItem(key: string, value: string) {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.error("localStorage.setItem failed:", err);
        }
    }
}

export function safeGetItem(key: string): string | null {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            return localStorage.getItem(key);
        } catch (err) {
            console.error("localStorage.getItem failed:", err);
            return null;
        }
    }
    return null;
}

export function safeRemoveItem(key: string) {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error("localStorage.removeItem failed:", err);
        }
    }
}

export function safeClear() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
            localStorage.clear();
        } catch (err) {
            console.error("localStorage.clear failed:", err);
        }
    }
}
