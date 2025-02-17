export const isLowerThanToday320AM = timeString => {
    let time = new Date(timeString);

    time = new Date(time.getTime() + 24 * 60 * 60 * 1000);

    const today = new Date();

    const next320AM = new Date(today);
    next320AM.setHours(3, 20, 0, 0);
    if (time > next320AM) {
        next320AM.setDate(next320AM.getDate() + 1);
    }

    if (today.getTime() < next320AM.getTime()) {
        return false;
    }

    const differenceMs = next320AM.getTime() - time.getTime();

    time = new Date(time.getTime() + differenceMs);

    time.setHours(3, 20, 0, 0);

    const isLower = time < today;

    return isLower;
};

export const isLowerThanToday320AMForGuesses = timeString => {
    const time = new Date(timeString);

    const today = new Date();

    const today320AM = new Date(today);
    today320AM.setHours(3, 20, 0, 0);

    if (today < today320AM) {
        return false;
    }

    const isLower = time < today320AM;

    return isLower;
};
