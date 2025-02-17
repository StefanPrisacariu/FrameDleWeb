export const getDailyStreak = async () => {
    try {
        const jsonValue = await localStorage.getItem('FD_DAILY_STREAK');
        return jsonValue != null ? JSON.parse(jsonValue) : 0;
    } catch (e) {
        console.error('Error reading streak:', e);
        return 0;
    }
};

export const getDailyStreakTime = async () => {
    try {
        const jsonValue = await localStorage.getItem('FD_DAILY_STREAK_TIME');
        return jsonValue !== null ? jsonValue : '';
    } catch (e) {
        console.error('Error reading streak time:', e);
        return '';
    }
};
