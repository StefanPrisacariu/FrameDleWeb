import { safeGetItem } from "@/app/helpers/safeStorage";

export const checkResetNeeded = (storage: string) => {
    const storedTime = safeGetItem(storage);

    if (!storedTime) {
        console.log("No stored time found, returning 0 hours.");
        return 0; // Default case if no time was previously stored
    }

    const lastPlayed = new Date(storedTime); // Ensure storedTime is a valid string before using Date constructor
    const now = new Date();

    lastPlayed.setUTCHours(0, 0, 0, 0); // Reset time to start of the day

    const timeDifferenceMs = now.getTime() - lastPlayed.getTime(); // Use getTime() for safe arithmetic
    const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

    return hoursDifference;
};
