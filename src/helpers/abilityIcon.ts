export const abilityIcon = (e: string) => {
    return `https://wiki.warframe.com/images/thumb/${e}/256px-${e}`;
};
export const abilityIconNew = (wf: string, ability: number, name: string) => {
    const nam = name.replace(/\s+/g, "_").replace(/[<>:"/\\|?*]/g, "");

    return `/warframe_abilities/${toTitleCase(wf)}/${ability}/${nam}.webp`;
};

const toTitleCase = (phrase: string) => {
    return phrase
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
