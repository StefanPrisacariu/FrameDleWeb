import { useEffect, useState } from "react";

type Countdown = {
    hours: number;
    minutes: number;
    seconds: number;
};

interface TimerComponentProps {
    resetAt: string;
}

export const TimerComponent = ({ resetAt }: TimerComponentProps): string => {
    const [countdown, setCountdown] = useState<Countdown>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = Date.now();
            const reset = new Date(resetAt).getTime();

            const timeLeft = reset - now;

            if (timeLeft <= 0) {
                window.location.reload();
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));

            const minutes = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60),
            );

            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setCountdown({
                hours,
                minutes,
                seconds,
            });
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [resetAt]);

    const format = (num: number) => String(num).padStart(2, "0");

    return `${format(countdown.hours)}:${format(countdown.minutes)}:${format(countdown.seconds)}`;
};
