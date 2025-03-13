import { initialWarframes } from '../resources/warframes';

export const fetchTodaysWarframe = async () => {
    const res = await fetch(process.env.REACT_APP_TODAY_ENDPOINT);
    const data = await res.json();
    return initialWarframes[data.number];
};

export const fetchYesterdayWarframe = async () => {
    const res = await fetch(process.env.REACT_APP_YESTERDAY_ENDPOINT);
    const data = await res.json();
    return initialWarframes[data.number];
};
