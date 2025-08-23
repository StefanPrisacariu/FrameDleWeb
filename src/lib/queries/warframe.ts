import { initialWarframes } from "@/app/lib/warframes";
import axios from "axios";

const REACT_APP_TODAY_ENDPOINT = process.env.REACT_APP_TODAY_ENDPOINT;
const REACT_APP_YESTERDAY_ENDPOINT = process.env.REACT_APP_YESTERDAY_ENDPOINT;

export const fetchTodaysWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_TODAY_ENDPOINT as string);
    return initialWarframes[res.data.number] as Warframe;
};

export const fetchYesterdayWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_YESTERDAY_ENDPOINT as string);
    return initialWarframes[res.data.number] as Warframe;
};
