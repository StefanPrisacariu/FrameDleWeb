export const compareArrays = (arr1: string[], arr2: string[]) => {
    if (arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index])) {
        return true;
    }

    const commonElements = arr1.some(element => arr2.includes(element));
    if (commonElements) {
        return 'partial';
    }

    return false;
};
