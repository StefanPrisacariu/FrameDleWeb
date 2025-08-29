export const getColorblindMode = () => {
    try {
        const jsonValue = localStorage.getItem("FD_COLORBLIND_MODE");
        return jsonValue ? jsonValue : "Disabled";
    } catch (e) {
        console.error("Error reading streak:", e);
        return "Disabled";
    }
};

export const storeColorblindMode = (cb: string) => {
    try {
        localStorage.setItem("FD_COLORBLIND_MODE", cb);
    } catch (e) {
        console.error("Error storing colorblind mode:", e);
    }
};
