export const compareArrays = (arr1: string[], arr2: string[]) => {
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();

    if (
        sorted1.length === sorted2.length &&
        sorted1.every((val, index) => val === sorted2[index])
    ) {
        return true;
    }

    const commonElements = sorted1.some((element) => sorted2.includes(element));

    if (commonElements) {
        return "partial";
    }

    return false;
};
