import { polarity, elements, PlaystyleIcon } from "@/app/helpers/imageExports";
import { compareArrays } from "@/app/helpers/compareArrays";
import { getColorblindMode } from "@/app/helpers/colorblindStore";

import Arrow from "@/assets/svg/indicator-arrow.svg";
import Correct from "@/assets/svg/indicator-correct.svg";
import Incorrect from "@/assets/svg/indicator-incorrect.svg";
import Partial from "@/assets/svg/indicator-partial.svg";
import Image from "next/image";

import Icon from "@/styles/components/Icon.module.scss";
import GR from "@/styles/components/GuessRow.module.scss";
import clsx from "clsx";
import { getPlaystylesShortLabels } from "@/app/helpers/shortStyle";

interface Guess {
    warframeGuess: Warframe;
    todayWarframe: Warframe;
}

const removeDash = (str: string) => {
    const result = str.replace(/-/g, " ");
    return result;
};

export const GuessRow = ({ warframeGuess, todayWarframe }: Guess) => {
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
                            className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_3)}
                            width={55}
                            height={55}
                        />
                    );
                case "incorrect":
                    return (
                        <Incorrect
                            className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_5)}
                            width={50}
                            height={50}
                        />
                    );
                case "partial":
                    return (
                        <Partial
                            className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_3)}
                            width={60}
                            height={60}
                        />
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <>
            <div className={GR.fd_gr_0}>
                <Image
                    width={70}
                    height={70}
                    className={GR.fd_gr_0_box}
                    src={warframeGuess.image}
                    alt={warframeGuess.name}
                />
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            warframeGuess.gender === todayWarframe.gender,
                        [`${handleColorblind("incorrect")}`]:
                            warframeGuess.gender !== todayWarframe.gender,
                    })}
                >
                    {warframeGuess.gender === todayWarframe.gender
                        ? handleIcon("correct")
                        : handleIcon("incorrect")}
                    <p className={GR.fd_gr_0_text}>{warframeGuess.gender}</p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            warframeGuess.primeUmbra ===
                            todayWarframe.primeUmbra,
                        [`${handleColorblind("incorrect")}`]:
                            warframeGuess.primeUmbra !==
                            todayWarframe.primeUmbra,
                    })}
                >
                    {warframeGuess.primeUmbra === todayWarframe.primeUmbra
                        ? handleIcon("correct")
                        : handleIcon("incorrect")}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.primeUmbra}
                    </p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            true ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity
                            ),
                        [`${handleColorblind("incorrect")}`]:
                            false ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity
                            ),
                        [`${handleColorblind("partial")}`]:
                            "partial" ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity
                            ),
                    })}
                >
                    {false ===
                    compareArrays(
                        warframeGuess.auraPolarity,
                        todayWarframe.auraPolarity
                    )
                        ? handleIcon("incorrect")
                        : true ===
                          compareArrays(
                              warframeGuess.auraPolarity,
                              todayWarframe.auraPolarity
                          )
                        ? handleIcon("correct")
                        : handleIcon("partial")}
                    {warframeGuess.auraPolarity && (
                        <>
                            {warframeGuess.auraPolarity[0] !== "none" && (
                                <div className={GR.fd_gr_0_multiple}>
                                    {warframeGuess.auraPolarity.map(
                                        (item, index) => polarity(item, index)
                                    )}
                                </div>
                            )}
                            {warframeGuess.auraPolarity.map((item, index) => (
                                <p key={index} className={GR.fd_gr_0_text}>
                                    {item}
                                </p>
                            ))}
                        </>
                    )}
                </div>

                {/* BLYAAAAAAAAA */}
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            true ===
                            compareArrays(
                                warframeGuess.playstyle,
                                todayWarframe.playstyle
                            ),
                        [`${handleColorblind("incorrect")}`]:
                            false ===
                            compareArrays(
                                warframeGuess.playstyle,
                                todayWarframe.playstyle
                            ),
                        [`${handleColorblind("partial")}`]:
                            "partial" ===
                            compareArrays(
                                warframeGuess.playstyle,
                                todayWarframe.playstyle
                            ),
                    })}
                >
                    {false ===
                    compareArrays(
                        warframeGuess.playstyle,
                        todayWarframe.playstyle
                    )
                        ? handleIcon("incorrect")
                        : true ===
                          compareArrays(
                              warframeGuess.playstyle,
                              todayWarframe.playstyle
                          )
                        ? handleIcon("correct")
                        : handleIcon("partial")}
                    {warframeGuess.playstyle && (
                        <>
                            <div className={GR.fd_gr_0_multiple}>
                                {warframeGuess.playstyle.map((item, index) =>
                                    PlaystyleIcon(
                                        item,
                                        warframeGuess.playstyle.length,
                                        index
                                    )
                                )}
                            </div>
                            {warframeGuess.playstyle.length < 3 &&
                                warframeGuess.playstyle.map((item, index) => (
                                    <div
                                        key={index}
                                        className={GR.fd_gr_0_text}
                                    >
                                        {removeDash(item)}
                                    </div>
                                ))}
                            {warframeGuess.playstyle.length >= 3 && (
                                <p className={GR.fd_gr_0_text}>
                                    {getPlaystylesShortLabels(
                                        warframeGuess.playstyle
                                    )}
                                </p>
                            )}
                        </>
                    )}
                </div>
                {/* BLYAAAAAAAAA */}

                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            warframeGuess.progenitorElement ===
                            todayWarframe.progenitorElement,
                        [`${handleColorblind("incorrect")}`]:
                            warframeGuess.progenitorElement !==
                            todayWarframe.progenitorElement,
                    })}
                >
                    {warframeGuess.progenitorElement ===
                    todayWarframe.progenitorElement
                        ? handleIcon("correct")
                        : handleIcon("incorrect")}
                    {elements(warframeGuess.progenitorElement)}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.progenitorElement}
                    </p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [`${handleColorblind("correct")}`]:
                            warframeGuess.releaseYear ===
                            todayWarframe.releaseYear,
                        [`${handleColorblind("incorrect")}`]:
                            warframeGuess.releaseYear !==
                            todayWarframe.releaseYear,
                    })}
                >
                    {warframeGuess.releaseYear !== todayWarframe.releaseYear &&
                    warframeGuess.releaseYear < todayWarframe.releaseYear ? (
                        <Arrow
                            className={clsx(Icon.fd_icon_0, Icon.fd_icon_p_3)}
                            width={50}
                            height={50}
                        />
                    ) : (
                        warframeGuess.releaseYear !==
                            todayWarframe.releaseYear && (
                            <Arrow
                                className={clsx(
                                    Icon.fd_icon_0,
                                    Icon.fd_icon_p_3,
                                    Icon.fd_icon_reverse
                                )}
                                width={50}
                                height={50}
                            />
                        )
                    )}
                    {warframeGuess.releaseYear === todayWarframe.releaseYear &&
                        handleIcon("correct")}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.releaseYear}
                    </p>
                </div>
            </div>
        </>
    );
};
