import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const getWarframeOfTheDay =
    async (): Promise<WarframeOfTheDayResponse> => {
        const res = await axios.get(`${API_BASE}/api/warframeOfTheDay`);
        return res.data;
    };

export const getAbilityOfTheDay =
    async (): Promise<AbilityOfTheDayResponse> => {
        const res = await axios.get(`${API_BASE}/api/abilityOfTheDay`);
        return res.data;
    };
