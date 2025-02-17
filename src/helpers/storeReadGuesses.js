export const storeGuesses = async data => {
    try {
        const jsonValue = JSON.stringify(data);
        await localStorage.setItem('FD_GUESSES', jsonValue);
    } catch (e) {
        console.error('Error storing guess:', e);
    }
};

export const getGuesses = async () => {
    try {
        const jsonValue = await localStorage.getItem('FD_GUESSES');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading guess:', e);
        return [];
    }
};
