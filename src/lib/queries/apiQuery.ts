import axios from "axios";

export const getWarframeOfTheDay =
    async (): Promise<WarframeOfTheDayResponse> => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/warframeOfTheDay`,
        );
        return res.data;
    };

export const getAbilityOfTheDay =
    async (): Promise<AbilityOfTheDayResponse> => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/abilityOfTheDay`,
        );
        return res.data;
    };

export const getEmojiOfTheDay = async (): Promise<EmojiOfTheDayResponse> => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/emojiOfTheDay`,
    );
    return res.data;
};
