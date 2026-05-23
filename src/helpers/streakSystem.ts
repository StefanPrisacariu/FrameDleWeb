import { decodeStorage, encodeStorage } from "@/app/helpers/encoder";

export type GamemodeProgress = {
    streak: number;
    lastCompletedDailyId: string | null;
};

const STORAGE_PREFIX = "FD_PROGRESS";

const getStorageKey = (mode: string) => {
    return `${STORAGE_PREFIX}_${mode.toUpperCase()}`;
};

export const getProgress = (mode: string): GamemodeProgress => {
    const date = new Date();

    date.setUTCDate(date.getUTCDate() - 1);

    const prev = date.toISOString().split("T")[0] as string;
    try {
        const raw = localStorage.getItem(getStorageKey(mode));
        const oldStreak = localStorage.getItem(
            `FD_${mode.toUpperCase()}_STREAK`,
        );

        if (!raw) {
            if (!oldStreak) {
                saveProgress(mode, {
                    streak: 0,
                    lastCompletedDailyId: prev,
                });
                return {
                    streak: 0,
                    lastCompletedDailyId: prev,
                };
            }

            saveProgress(mode, {
                streak: Number(decodeStorage(oldStreak)),
                lastCompletedDailyId: prev,
            });

            return {
                streak: Number(decodeStorage(oldStreak)),
                lastCompletedDailyId: prev,
            };
        }

        const decoded = decodeStorage(raw);

        return JSON.parse(decoded as string) as GamemodeProgress;
    } catch {
        return {
            streak: 0,
            lastCompletedDailyId: prev,
        };
    }
};

export const saveProgress = (mode: string, progress: GamemodeProgress) => {
    localStorage.setItem(
        getStorageKey(mode),
        encodeStorage(JSON.stringify(progress)),
    );
};

export const getPreviousDailyId = (dailyId: string) => {
    const date = new Date(dailyId);

    date.setUTCDate(date.getUTCDate() - 1);

    return date.toISOString().split("T")[0];
};
export const getCurrentDailyId = () => {
    const date = new Date();

    date.setUTCDate(date.getUTCDate());

    return date.toISOString().split("T")[0];
};

export const completeDaily = (mode: string, currentDailyId: string) => {
    const progress = getProgress(mode);

    const streak = Number(progress.streak) + 1;

    if (progress.lastCompletedDailyId === currentDailyId) {
        return progress;
    }

    const updated = {
        streak,
        lastCompletedDailyId: currentDailyId,
    };

    saveProgress(mode, updated);

    return updated;
};
