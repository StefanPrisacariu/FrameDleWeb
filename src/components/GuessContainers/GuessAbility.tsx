import React from "react";
import Image from "next/image";
import clsx from "clsx";

import Correct from "@/assets/svg/indicator-correct.svg";
import Incorrect from "@/assets/svg/indicator-incorrect.svg";

import GA from "@/styles/components/GuessAbility.module.scss";
import GR from "@/styles/components/GuessRow.module.scss";
import Icon from "@/styles/components/Icon.module.scss";
import { getColorblindMode } from "@/app/helpers/colorblindStore";

interface GuessAbilityProps {
    warframeGuess: WarframeAbility;
    todayWarframe: ProcessedAbility;
}

export const GuessAbility = ({
    warframeGuess,
    todayWarframe,
}: GuessAbilityProps) => {
    const colorblind = getColorblindMode();

    const handleIcon = (state: string) => {
        if ("Disabled" !== colorblind) {
            switch (state) {
                case "correct":
                    return (
                        <Correct
                            className={clsx(Icon.fd_icon_2, Icon.fd_icon_p_3)}
                            width={30}
                            height={30}
                        />
                    );
                case "incorrect":
                    return (
                        <Incorrect
                            className={clsx(Icon.fd_icon_2, Icon.fd_icon_p_5)}
                            width={25}
                            height={25}
                        />
                    );
                default:
                    return null;
            }
        }
    };

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
            {isCorrect ? handleIcon("correct") : handleIcon("incorrect")}
        </div>
    );
};
