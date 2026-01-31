export const storeIndicatorToggle = (data: boolean) => {
    try {
        const jsonValue = JSON.stringify(data);
        localStorage.setItem("FD_INDICATOR", jsonValue);
    } catch (e) {
        console.error("Error storing indicator:", e);
    }
};

export const getIndicatorToggle = () => {
    try {
        const jsonValue = localStorage.getItem("FD_INDICATOR");
        return jsonValue != null ? (JSON.parse(jsonValue) as boolean) : true;
    } catch (e) {
        console.error("Error reading indicator:", e);
        return true;
    }
};
