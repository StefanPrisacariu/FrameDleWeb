import { safeGetItem, safeSetItem } from "@/app/helpers/safeStorage";

export const storeIndicatorToggle = (data: boolean) => {
    try {
        const jsonValue = JSON.stringify(data);
        safeSetItem("FD_INDICATOR", jsonValue);
    } catch (e) {
        console.error("Error storing indicator:", e);
    }
};

export const getIndicatorToggle = () => {
    try {
        const jsonValue = safeGetItem("FD_INDICATOR");
        return jsonValue != null ? (JSON.parse(jsonValue) as boolean) : true;
    } catch (e) {
        console.error("Error reading indicator:", e);
        return true;
    }
};
