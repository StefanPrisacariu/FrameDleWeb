import { useState, useEffect } from 'react';
import { startCountdown } from '../helpers/getCountdownToNextUpdate';

export const TimerComponent = () => {
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const cleanup = startCountdown(setCountdown);
        return cleanup;
    }, []);

    const formatTime = num => String(num).padStart(2, '0');

    return `${formatTime(countdown.hours)}:${formatTime(countdown.minutes)}:${formatTime(countdown.seconds)}`;
};
