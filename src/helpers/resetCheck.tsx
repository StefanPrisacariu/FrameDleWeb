export const checkResetNeeded = async (): Promise<number> => {
    try {
        const storedValue = await localStorage.getItem('FD_DAILY_STREAK_TIME');
        if (!storedValue) return Number.POSITIVE_INFINITY;

        const lastPlayed = new Date(storedValue);
        const now = new Date();

        lastPlayed.setUTCHours(0, 0, 0, 0);

        const timeDifferenceMs = now.getTime() - lastPlayed.getTime();
        const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

        return hoursDifference;
    } catch (e) {
        console.error('Error checking reset:', e);
        return Number.POSITIVE_INFINITY;
    }
};
