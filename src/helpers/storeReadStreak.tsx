import { safeGetItem } from "@/app/helpers/safeStorage";

export const getDailyStreak = () => {
    const value = safeGetItem("FD_DAILY_STREAK");
    return value ? Number(value) : 0;
};

//ABILITY

export const getAbilityStreak = () => {
    const jsonValue = safeGetItem("FD_ABILITY_STREAK");
    return jsonValue != null ? Number(jsonValue) : 0;
};

//EMOJI

export const getEmojiStreak = () => {
    const jsonValue = safeGetItem("FD_EMOJI_STREAK");
    return jsonValue != null ? Number(jsonValue) : 0;
};
