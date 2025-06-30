import axios from 'axios';
import { initialWarframes } from '../resources/warframes';

export const fetchTodaysWarframe = async () => {
    const res = await axios.get(process.env.REACT_APP_TODAY_ENDPOINT);
    return initialWarframes[res.data.number];
};

export const fetchYesterdayWarframe = async () => {
    const res = await axios.get(process.env.REACT_APP_YESTERDAY_ENDPOINT);
    return initialWarframes[res.data.number];
};
