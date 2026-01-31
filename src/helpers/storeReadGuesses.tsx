import { decodeStorage, encodeStorage } from "@/app/helpers/encoder";

type StoredGuesses = {
    dayKey: string;
    guesses: Warframe[];
};

type StoredAbilityGuesses = {
    dayKey: string;
    guesses: WarframeAbility[];
};

export const storeGuesses = (dk: string, guesses: Warframe[]) => {
    const dayKey = encodeStorage(dk);
    localStorage.setItem(
        "FD_DAILY_GUESSES",
        JSON.stringify({ dayKey, guesses }),
    );
};

export const getGuesses = (dk: string) => {
    try {
        const raw = localStorage.getItem("FD_DAILY_GUESSES");
        if (!raw) return [];

        const parsed = JSON.parse(raw) as StoredGuesses;
        const dayKey = decodeStorage(parsed.dayKey);
        return dayKey === dk ? parsed.guesses : [];
    } catch {
        return [];
    }
};

export const storeAbilityGuesses = (dk: string, guesses: WarframeAbility[]) => {
    const dayKey = encodeStorage(dk);
    localStorage.setItem(
        "FD_ABILITY_GUESSES",
        JSON.stringify({ dayKey, guesses }),
    );
};

export const getAbilityGuesses = (dk: string) => {
    try {
        const raw = localStorage.getItem("FD_ABILITY_GUESSES");
        if (!raw) return [];

        const parsed = JSON.parse(raw) as StoredAbilityGuesses;
        const dayKey = decodeStorage(parsed.dayKey);
        return dayKey === dk ? parsed.guesses : [];
    } catch {
        return [];
    }
};
