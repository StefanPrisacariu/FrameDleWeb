import { initialWarframes } from "@/app/lib/warframes";
import axios from "axios";

const REACT_APP_TODAY_ENDPOINT =
    "https://framedle-default-rtdb.firebaseio.com/warframeOfTheDay/today.json";
const REACT_APP_YESTERDAY_ENDPOINT =
    "https://framedle-default-rtdb.firebaseio.com/warframeOfTheDay/yesterday.json";

export const fetchTodaysWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_TODAY_ENDPOINT as string);
    return initialWarframes[res.data.number] as Warframe;
};

export const fetchYesterdayWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_YESTERDAY_ENDPOINT as string);
    return initialWarframes[res.data.number] as Warframe;
};
