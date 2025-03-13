export const checkResetNeeded = async () => {
    const lastPlayed = new Date(await localStorage.getItem('FD_DAILY_STREAK_TIME'));
    const now = new Date();
    lastPlayed.setUTCHours(0);
    lastPlayed.setMinutes(0);
    lastPlayed.setMilliseconds(0);

    const timeDifferenceMs = now - lastPlayed;
    const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

    return hoursDifference;
};
