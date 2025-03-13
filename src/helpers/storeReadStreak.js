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

export const storeDailyStreak = async data => {
    try {
        await localStorage.setItem('FD_DAILY_STREAK', data);
    } catch (e) {
        console.error('Error storing streak:', e);
    }
};

export const storeDailyStreakTime = async () => {
    try {
        await localStorage.setItem('FD_DAILY_STREAK_TIME', new Date().toISOString());
    } catch (e) {
        console.error('Error storing guess time:', e);
    }
};
