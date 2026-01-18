import { safeGetItem } from "@/app/helpers/safeStorage";

export const checkResetNeeded = (storageKey: string): boolean => {
    const storedTime = safeGetItem(storageKey);

    if (!storedTime) {
        return false;
    }

    const last = new Date(storedTime);
    const now = new Date();

    return (
        last.getUTCFullYear() !== now.getUTCFullYear() ||
        last.getUTCMonth() !== now.getUTCMonth() ||
        last.getUTCDate() !== now.getUTCDate()
    );
};
