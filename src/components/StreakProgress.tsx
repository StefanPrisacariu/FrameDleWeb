import Group from "@/styles/components/Group.module.scss";
import clsx from "clsx";

interface Streak {
    streak: number;
}

export type StreakRank = "normal" | "bronze" | "silver" | "gold" | "orokin";

export const getStreakRank = (streak: number): StreakRank => {
    if (streak >= 30) return "orokin";
    if (streak >= 14) return "gold";
    if (streak >= 7) return "silver";
    if (streak >= 4) return "bronze";
    return "normal";
};

export const StreakProgress = ({ streak }: Streak) => {
    const rank = getStreakRank(streak);
    return (
        <div className={Group.fd_group_3}>
            <h3 className={Group.fd_group_3_label}>Daily</h3>
            <div
                className={clsx(
                    Group.fd_group_3_wrap,
                    rank !== "normal" &&
                        Group[`fd_group_3_wrap__streak_${rank}`],
                )}
            >
                <span className={Group.fd_group_3_wrap_streak}>
                    {streak || "0"}
                </span>
            </div>
        </div>
    );
};
