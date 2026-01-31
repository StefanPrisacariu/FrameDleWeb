import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

export const getDailyStreak = () => {
    const value = safeGetItem("FD_DAILY_STREAK");
    return value ? Number(value) : 0;
};

export const getDailyStreakTime = () => {
    const jsonValue = safeGetItem("FD_DAILY_STREAK_TIME");
    return jsonValue !== null ? jsonValue : "";
};

export const storeDailyStreak = (value: number) => {
    safeSetItem("FD_DAILY_STREAK", value.toString());
};

export const storeDailyStreakTime = () => {
    safeSetItem("FD_DAILY_STREAK_TIME", new Date().toISOString());
};

//ABILITY

export const getAbilityStreak = () => {
    const jsonValue = safeGetItem("FD_ABILITY_STREAK");
    return jsonValue != null ? Number(jsonValue) : 0;
};

export const getAbilityStreakTime = () => {
    const jsonValue = safeGetItem("FD_ABILITY_STREAK_TIME");
    return jsonValue !== null ? jsonValue : "";
};

export const storeAbilityStreak = (data: number) => {
    safeSetItem("FD_ABILITY_STREAK", data.toString());
};

export const storeAbilityStreakTime = () => {
    safeSetItem("FD_ABILITY_STREAK_TIME", new Date().toISOString());
};
