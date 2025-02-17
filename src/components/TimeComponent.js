import { storeGuesses } from '../helpers/storeReadGuesses';
import { useState, useEffect } from 'react';

export const TimerComponent = () => {
    const [remainingSeconds, setRemainingSeconds] = useState(getInitialRemainingSeconds());

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (remainingSeconds > 0) {
                setRemainingSeconds(prevSeconds => prevSeconds - 1);
            } else {
                setRemainingSeconds(getInitialRemainingSeconds());
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [remainingSeconds]);

    function getInitialRemainingSeconds() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSecondsUntil320AM = 3 * 3600 + 20 * 60 - (hours * 3600 + minutes * 60 + seconds);

        return totalSecondsUntil320AM >= 0 ? totalSecondsUntil320AM : totalSecondsUntil320AM + 24 * 3600;
    }
    const formatTime = seconds => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours === 0 && minutes === 0 && remainingSeconds === 0) {
            storeGuesses([]);
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return formatTime(remainingSeconds);
};
