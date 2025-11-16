import { getProcessedAbility } from "@/app/helpers/getProcessedAbility";
import { initialWarframes } from "@/app/lib/warframes";
import axios from "axios";

const endpoint = "https://framedle-default-rtdb.firebaseio.com";

const axiosHeaders = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
};

const noCache = () => `cb=${Math.floor(Date.now() / 60000)}`;

export const fetchTodaysWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(
        `${endpoint}/warframeOfTheDay/today.json?${noCache()}`,
        {
            headers: axiosHeaders,
        }
    );
    return initialWarframes[res.data.number] as Warframe;
};

export const fetchYesterdayWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(
        `${endpoint}/warframeOfTheDay/yesterday.json?${noCache()}`,
        {
            headers: axiosHeaders,
        }
    );
    return initialWarframes[res.data.number] as Warframe;
};

export const fetchTodaysAbility = async (): Promise<ProcessedAbility> => {
    const res = await axios.get(
        `${endpoint}/abilityOfTheDay/today.json?${noCache()}`,
        {
            headers: axiosHeaders,
        }
    );
    return getProcessedAbility(res.data) as ProcessedAbility;
};

export const fetchYesterdayAbility = async (): Promise<AbilityYesterday> => {
    const res = await axios.get(
        `${endpoint}/abilityOfTheDay/yesterday.json?${noCache()}`,
        {
            headers: axiosHeaders,
        }
    );
    return res.data;
};
