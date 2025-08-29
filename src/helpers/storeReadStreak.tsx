import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

export const getDailyStreak = async (): Promise<number> => {
    try {
        const jsonValue = safeGetItem("FD_DAILY_STREAK");
        return jsonValue !== null ? (JSON.parse(jsonValue) as number) : 0;
    } catch (e) {
        console.error("Error reading streak:", e);
        return 0;
    }
};

export const getDailyStreakTime = async (): Promise<string> => {
    try {
        const jsonValue = safeGetItem("FD_DAILY_STREAK_TIME");
        return jsonValue !== null ? jsonValue : "";
    } catch (e) {
        console.error("Error reading streak time:", e);
        return "";
    }
};

export const storeDailyStreak = async (data: string): Promise<void> => {
    try {
        safeSetItem("FD_DAILY_STREAK", data);
    } catch (e) {
        console.error("Error storing streak:", e);
    }
};

export const storeDailyStreakTime = async (): Promise<void> => {
    try {
        safeSetItem("FD_DAILY_STREAK_TIME", new Date().toISOString());
    } catch (e) {
        console.error("Error storing guess time:", e);
    }
};

//ABILITY

export const getAbilityStreak = async (): Promise<number> => {
    try {
        const jsonValue = safeGetItem("FD_ABILITY_STREAK");
        return jsonValue != null ? Number(jsonValue) : 0;
    } catch (e) {
        console.error("Error reading streak:", e);
        return 0;
    }
};

export const getAbilityStreakTime = async (): Promise<string> => {
    try {
        const jsonValue = safeGetItem("FD_ABILITY_STREAK_TIME");
        return jsonValue !== null ? jsonValue : "";
    } catch (e) {
        console.error("Error reading streak time:", e);
        return "";
    }
};

export const storeAbilityStreak = async (data: number) => {
    try {
        safeSetItem("FD_ABILITY_STREAK", data.toString());
    } catch (e) {
        console.error("Error storing streak:", e);
    }
};

export const storeAbilityStreakTime = async () => {
    try {
        safeSetItem("FD_ABILITY_STREAK_TIME", new Date().toISOString());
    } catch (e) {
        console.error("Error storing guess time:", e);
    }
};
