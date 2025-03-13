export const startCountdown = setCountdown => {
    const updateCountdown = () => {
        const now = new Date();
        const nextReset = new Date(now);
        nextReset.setUTCHours(24, 0, 0, 0); // Reset at 00:00 UTC

        const timeLeft = nextReset - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ hours, minutes, seconds });
    };

    updateCountdown(); // Run immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
};
