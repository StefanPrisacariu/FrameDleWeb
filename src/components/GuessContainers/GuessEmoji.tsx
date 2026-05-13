import clsx from "clsx";
import Image from "next/image";

import { useColorblind } from "@/app/context/ColorblindContext";
import { handleIcon } from "@/app/helpers/handleIcon";
import GA from "@/styles/components/GuessAbility.module.scss";
import GR from "@/styles/components/GuessRow.module.scss";

interface GuessEmojiProps {
    warframeGuess: WarframeEmojis;
    todayWarframe: WarframeEmojis;
}

export const GuessEmoji = ({
    warframeGuess,
    todayWarframe,
}: GuessEmojiProps) => {
    const { mode } = useColorblind();
    const isCorrect = warframeGuess.name === todayWarframe.name;

    return (
        <div
            className={clsx(GA.fd_ga_0, {
                [GR.fd_gr_colors_correct]: isCorrect,
                [GR.fd_gr_colors_incorrect]: !isCorrect,
            })}
        >
            <Image
                src={warframeGuess.image}
                alt={warframeGuess.name}
                width={70}
                height={70}
            />
            <p className={GA.fd_ga_text}>{warframeGuess.name}</p>
            {isCorrect
                ? handleIcon("correct", mode)
                : handleIcon("incorrect", mode)}
        </div>
    );
};
