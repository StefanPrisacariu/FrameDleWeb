import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

export const storeGuesses = async (data: Warframe[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(data);
        safeSetItem("FD_GUESSES", jsonValue);
    } catch (e) {
        console.error("Error storing guess:", e);
    }
};

export const getGuesses = async (): Promise<Warframe[]> => {
    try {
        const jsonValue = safeGetItem("FD_GUESSES");
        return jsonValue ? (JSON.parse(jsonValue) as Warframe[]) : [];
    } catch (e) {
        console.error("Error reading guess:", e);
        return [];
    }
};

export const storeAbilityGuesses = async (data: WarframeAbility[]) => {
    try {
        const jsonValue = JSON.stringify(data);
        safeSetItem("FD_ABILITY_GUESSES", jsonValue);
    } catch (e) {
        console.error("Error storing guess:", e);
    }
};

export const getAbilityGuesses = async (): Promise<WarframeAbility[]> => {
    try {
        const jsonValue = await safeGetItem("FD_ABILITY_GUESSES");
        return jsonValue != null
            ? (JSON.parse(jsonValue) as WarframeAbility[])
            : [];
    } catch (e) {
        console.error("Error reading guess:", e);
        return [];
    }
};
