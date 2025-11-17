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

    const handleColorblind = (state: "correct" | "incorrect" | "partial") => {
        switch (colorblind) {
            case "Protanopia":
                return GR[`fd_gr_colors_pro_${state}`];
            case "Deuteranopia":
                return GR[`fd_gr_colors_deu_${state}`];
            case "Tritanopia":
                return GR[`fd_gr_colors_tri_${state}`];
            case "Achromatopsia":
                return GR[`fd_gr_colors_acro_${state}`];
            default:
                return GR[`fd_gr_colors_std_${state}`];
        }
    };

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

    const isCorrect = warframeGuess.warframeName === todayWarframe.warframeName;

    return (
        <div
            className={clsx(GA.fd_ga_0, {
                [`${handleColorblind("correct")}`]: isCorrect,
                [`${handleColorblind("incorrect")}`]: !isCorrect,
            })}
        >
            <Image
                src={warframeGuess.image}
                alt={warframeGuess.warframeName}
                width={70}
                height={70}
            />
            <p className={GA.fd_ga_text}>{warframeGuess.warframeName}</p>
            {isCorrect ? handleIcon("correct") : handleIcon("incorrect")}
        </div>
    );
};
