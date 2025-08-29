import { useState, useEffect } from 'react';

type Countdown = {
    hours: number;
    minutes: number;
    seconds: number;
};

export const startCountdown = (setCountdown: React.Dispatch<React.SetStateAction<Countdown>>): (() => void) => {
    const updateCountdown = () => {
        const now = new Date();
        const nextReset = new Date(now);
        nextReset.setUTCHours(24, 0, 0, 0);

        const timeLeft = nextReset.getTime() - now.getTime();
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
};

export const TimerComponent = (): string => {
    const [countdown, setCountdown] = useState<Countdown>({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const cleanup = startCountdown(setCountdown);
        return cleanup;
    }, []);

    const formatTime = (num: number): string => String(num).padStart(2, '0');

    return `${formatTime(countdown.hours)}:${formatTime(countdown.minutes)}:${formatTime(countdown.seconds)}`;
};
