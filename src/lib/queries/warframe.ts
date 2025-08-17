import { initialWarframes } from '@/app/lib/warframes';
import axios from 'axios';

const REACT_APP_TODAY_ENDPOINT = process.env.REACT_APP_TODAY_ENDPOINT || 'http://localhost:4000';
const REACT_APP_YESTERDAY_ENDPOINT = process.env.REACT_APP_YESTERDAY_ENDPOINT || 'http://localhost:4000';

export const fetchTodaysWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_TODAY_ENDPOINT);
    return initialWarframes[res.data.number] as Warframe;
};

export const fetchYesterdayWarframe = async (): Promise<Warframe> => {
    const res = await axios.get(REACT_APP_YESTERDAY_ENDPOINT);
    return initialWarframes[res.data.number] as Warframe;
};
