export const getColorblindMode = () => {
    try {
        const jsonValue = localStorage.getItem('FD_COLORBLIND_MODE');
        return jsonValue != null ? jsonValue : 'Disabled';
    } catch (e) {
        console.error('Error reading streak:', e);
        return 'Disabled';
    }
};

export const storeColorblindMode = cb => {
    try {
        localStorage.setItem('FD_COLORBLIND_MODE', cb);
    } catch (e) {
        console.error('Error storing colorblind mode:', e);
    }
};
