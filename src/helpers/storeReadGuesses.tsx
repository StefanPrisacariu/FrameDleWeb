export const storeGuesses = async (data: Warframe[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(data);
        localStorage.setItem('FD_GUESSES', jsonValue);
    } catch (e) {
        console.error('Error storing guess:', e);
    }
};

export const getGuesses = async (): Promise<Warframe[]> => {
    try {
        const jsonValue = localStorage.getItem('FD_GUESSES');
        return jsonValue ? (JSON.parse(jsonValue) as Warframe[]) : [];
    } catch (e) {
        console.error('Error reading guess:', e);
        return [];
    }
};
