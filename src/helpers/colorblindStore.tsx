import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

export const getColorblindMode = () => {
    try {
        const jsonValue = safeGetItem("FD_COLORBLIND_MODE");
        return jsonValue ? jsonValue : "Disabled";
    } catch (e) {
        console.error("Error reading streak:", e);
        return "Disabled";
    }
};

export const storeColorblindMode = (cb: string) => {
    try {
        safeSetItem("FD_COLORBLIND_MODE", cb);
    } catch (e) {
        console.error("Error storing colorblind mode:", e);
    }
};
