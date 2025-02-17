export const storeIndicatorToggle = async data => {
    try {
        const jsonValue = JSON.stringify(data);
        await localStorage.setItem('FD_INDICATOR', jsonValue);
    } catch (e) {
        console.error('Error storing indicator:', e);
    }
};

export const getIndicatorToggle = async () => {
    try {
        const jsonValue = await localStorage.getItem('FD_INDICATOR');
        return jsonValue != null ? JSON.parse(jsonValue) : true;
    } catch (e) {
        console.error('Error reading indicator:', e);
        return true;
    }
};
