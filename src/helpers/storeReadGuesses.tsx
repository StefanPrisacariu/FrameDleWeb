import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

type StoredGuesses = {
    dayKey: string;
    guesses: Warframe[];
};

type StoredAbilityGuesses = {
    dayKey: string;
    guesses: WarframeAbility[];
};

export const storeGuesses = async (
    dayKey: string,
    guesses: Warframe[]
): Promise<void> => {
    safeSetItem("FD_DAILY_GUESSES", JSON.stringify({ dayKey, guesses }));
};

export const getGuesses = async (dayKey: string): Promise<Warframe[]> => {
    try {
        const raw = safeGetItem("FD_DAILY_GUESSES");
        if (!raw) return [];

        const parsed = JSON.parse(raw) as StoredGuesses;
        return parsed.dayKey === dayKey ? parsed.guesses : [];
    } catch {
        return [];
    }
};

export const storeAbilityGuesses = async (
    dayKey: string,
    guesses: WarframeAbility[]
) => {
    try {
        const payload: StoredAbilityGuesses = { dayKey, guesses };
        safeSetItem("FD_ABILITY_GUESSES", JSON.stringify(payload));
    } catch (e) {
        console.error("Error storing ability guesses:", e);
    }
};

export const getAbilityGuesses = async (
    dayKey: string
): Promise<WarframeAbility[]> => {
    try {
        const raw = safeGetItem("FD_ABILITY_GUESSES");
        if (!raw) return [];

        const parsed = JSON.parse(raw) as StoredAbilityGuesses;
        return parsed.dayKey === dayKey ? parsed.guesses : [];
    } catch (e) {
        console.error("Error reading ability guesses:", e);
        return [];
    }
};
