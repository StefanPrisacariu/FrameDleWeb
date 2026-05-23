import { decodeStorage, encodeStorage } from "@/app/helpers/encoder";

type StoredGuesses = {
    dayKey: string;
    guesses: Warframe[];
};

type StoredAbilityGuesses = {
    dayKey: string;
    guesses: WarframeAbility[];
};

type StoredEmojiGuesses = {
    dayKey: string;
    guesses: WarframeEmojisCorrected[];
};

// MAIN
export const storeGuesses = (dk: string, guesses: Warframe[]) => {
    const dayKey = dk;
    localStorage.setItem(
        "FD_DAILY_GUESSES",
        encodeStorage(JSON.stringify({ dayKey, guesses })),
    );
};

export const getGuesses = (dk: string) => {
    const raw = localStorage.getItem("FD_DAILY_GUESSES");
    if (!raw) return [];
    const decoded = decodeStorage(raw);
    try {
        const parsed = JSON.parse(decoded as string) as StoredGuesses;
        if (parsed.dayKey !== dk) {
            return [];
        }
        return parsed.guesses || [];
    } catch {
        return [];
    }
};

// ABILITY
export const storeAbilityGuesses = (dk: string, guesses: WarframeAbility[]) => {
    const dayKey = dk;
    localStorage.setItem(
        "FD_ABILITY_GUESSES",
        encodeStorage(JSON.stringify({ dayKey, guesses })),
    );
};

export const getAbilityGuesses = (dk: string) => {
    const raw = localStorage.getItem("FD_ABILITY_GUESSES");
    if (!raw) return [];
    const decoded = decodeStorage(raw);
    try {
        const parsed = JSON.parse(decoded as string) as StoredAbilityGuesses;
        if (parsed.dayKey !== dk) {
            return [];
        }
        return parsed.guesses || [];
    } catch {
        return [];
    }
};

// EMOJI
export const storeEmojiGuesses = (
    dk: string,
    guesses: WarframeEmojisCorrected[],
) => {
    const dayKey = dk;
    localStorage.setItem(
        "FD_EMOJI_GUESSES",
        encodeStorage(JSON.stringify({ dayKey, guesses })),
    );
};

export const getEmojiGuesses = (dk: string) => {
    const raw = localStorage.getItem("FD_EMOJI_GUESSES");
    if (!raw) return [];
    const decoded = decodeStorage(raw);
    try {
        const parsed = JSON.parse(decoded as string) as StoredEmojiGuesses;
        if (parsed.dayKey !== dk) {
            return [];
        }
        return parsed.guesses || [];
    } catch {
        return [];
    }
};
