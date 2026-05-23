import clsx from "clsx";

import Image from "next/image";

import { useColorblind } from "@/app/context/ColorblindContext";

import { compareArrays } from "@/app/helpers/compareArrays";
import { handleIcon } from "@/app/helpers/handleIcon";
import { elements, PlaystyleIcon, polarity } from "@/app/helpers/imageExports";
import { getPlaystylesShortLabels } from "@/app/helpers/shortStyle";

import GR from "@/styles/components/GuessRow.module.scss";
import Icon from "@/styles/components/Icon.module.scss";

import Arrow from "@/assets/svg/indicator-arrow.svg";

interface Guess {
    warframeGuess: Warframe;
    todayWarframe: Warframe;
}

const removeDash = (str: string) => {
    const result = str.replace(/-/g, " ");
    return result;
};

export const GuessRow = ({ warframeGuess, todayWarframe }: Guess) => {
    const { mode } = useColorblind();
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
                        [GR.fd_gr_colors_correct]:
                            warframeGuess.gender === todayWarframe.gender,
                        [GR.fd_gr_colors_incorrect]:
                            warframeGuess.gender !== todayWarframe.gender,
                    })}
                >
                    {warframeGuess.gender === todayWarframe.gender
                        ? handleIcon("correct", mode)
                        : handleIcon("incorrect", mode)}
                    <p className={GR.fd_gr_0_text}>{warframeGuess.gender}</p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [GR.fd_gr_colors_correct]:
                            warframeGuess.primeUmbra ===
                            todayWarframe.primeUmbra,
                        [GR.fd_gr_colors_incorrect]:
                            warframeGuess.primeUmbra !==
                            todayWarframe.primeUmbra,
                    })}
                >
                    {warframeGuess.primeUmbra === todayWarframe.primeUmbra
                        ? handleIcon("correct", mode)
                        : handleIcon("incorrect", mode)}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.primeUmbra}
                    </p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [GR.fd_gr_colors_correct]:
                            true ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity,
                            ),
                        [GR.fd_gr_colors_incorrect]:
                            false ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity,
                            ),
                        [GR.fd_gr_colors_partial]:
                            "partial" ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity,
                            ),
                    })}
                >
                    {false ===
                    compareArrays(
                        warframeGuess.auraPolarity,
                        todayWarframe.auraPolarity,
                    )
                        ? handleIcon("incorrect", mode)
                        : true ===
                            compareArrays(
                                warframeGuess.auraPolarity,
                                todayWarframe.auraPolarity,
                            )
                          ? handleIcon("correct", mode)
                          : handleIcon("partial", mode)}
                    {warframeGuess.auraPolarity && (
                        <>
                            {warframeGuess.auraPolarity[0] !== "none" && (
                                <div className={GR.fd_gr_0_multiple}>
                                    {warframeGuess.auraPolarity.map(
                                        (item, index) => polarity(item, index),
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

                {warframeGuess.playstyle !== undefined &&
                    todayWarframe.playstyle !== undefined && (
                        <div
                            className={clsx(GR.fd_gr_0_box, {
                                [GR.fd_gr_colors_correct]:
                                    true ===
                                    compareArrays(
                                        warframeGuess.playstyle,
                                        todayWarframe.playstyle,
                                    ),
                                [GR.fd_gr_colors_incorrect]:
                                    false ===
                                    compareArrays(
                                        warframeGuess.playstyle,
                                        todayWarframe.playstyle,
                                    ),
                                [GR.fd_gr_colors_partial]:
                                    "partial" ===
                                    compareArrays(
                                        warframeGuess.playstyle,
                                        todayWarframe.playstyle,
                                    ),
                            })}
                        >
                            {false ===
                            compareArrays(
                                warframeGuess.playstyle,
                                todayWarframe.playstyle,
                            )
                                ? handleIcon("incorrect", mode)
                                : true ===
                                    compareArrays(
                                        warframeGuess.playstyle,
                                        todayWarframe.playstyle,
                                    )
                                  ? handleIcon("correct", mode)
                                  : handleIcon("partial", mode)}
                            {warframeGuess.playstyle && (
                                <>
                                    <div className={GR.fd_gr_0_multiple}>
                                        {warframeGuess.playstyle.map(
                                            (item, index) =>
                                                PlaystyleIcon(
                                                    item,
                                                    warframeGuess.playstyle
                                                        .length,
                                                    index,
                                                ),
                                        )}
                                    </div>
                                    {warframeGuess.playstyle.length < 3 &&
                                        warframeGuess.playstyle.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className={GR.fd_gr_0_text}
                                                >
                                                    {removeDash(item)}
                                                </div>
                                            ),
                                        )}
                                    {warframeGuess.playstyle.length >= 3 && (
                                        <p className={GR.fd_gr_0_text}>
                                            {getPlaystylesShortLabels(
                                                warframeGuess.playstyle,
                                            )}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [GR.fd_gr_colors_correct]:
                            warframeGuess.progenitorElement ===
                            todayWarframe.progenitorElement,
                        [GR.fd_gr_colors_incorrect]:
                            warframeGuess.progenitorElement !==
                            todayWarframe.progenitorElement,
                    })}
                >
                    {warframeGuess.progenitorElement ===
                    todayWarframe.progenitorElement
                        ? handleIcon("correct", mode)
                        : handleIcon("incorrect", mode)}
                    {elements(warframeGuess.progenitorElement)}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.progenitorElement}
                    </p>
                </div>
                <div
                    className={clsx(GR.fd_gr_0_box, {
                        [GR.fd_gr_colors_correct]:
                            warframeGuess.releaseYear ===
                            todayWarframe.releaseYear,
                        [GR.fd_gr_colors_incorrect]:
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
                                    Icon.fd_icon_reverse,
                                )}
                                width={50}
                                height={50}
                            />
                        )
                    )}
                    {warframeGuess.releaseYear === todayWarframe.releaseYear &&
                        handleIcon("correct", mode)}
                    <p className={GR.fd_gr_0_text}>
                        {warframeGuess.releaseYear}
                    </p>
                </div>
            </div>
        </>
    );
};
