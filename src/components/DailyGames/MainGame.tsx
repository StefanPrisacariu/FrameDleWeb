"use client";

import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

import Image from "next/image";

import { YesterdayPortrait } from "@/app/components/Elements/YesterdayPortrait";
import { GuessRow } from "@/app/components/GuessContainers/GuessMain";
import { Modal } from "@/app/components/Modals/Modal";
import { StreakProgress } from "@/app/components/StreakProgress";
import { TableHeader } from "@/app/components/TableHeader";
import { TimerComponent } from "@/app/components/TimeComponent";

import { useTags } from "@/app/context/TagsContext";

import { scrollToId } from "@/app/helpers/scrollToId";
import { getGuesses, storeGuesses } from "@/app/helpers/storeReadGuesses";
import {
    completeDaily,
    getPreviousDailyId,
    getProgress,
    saveProgress,
} from "@/app/helpers/streakSystem";

import { initialWarframes } from "@/app/lib/warframes";

import Container from "@/styles/components/Container.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Input from "@/styles/components/Input.module.scss";
import Text from "@/styles/components/Text.module.scss";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import Lock from "@/assets/svg/lock-solid.svg";

interface MainGame {
    todaysWf: Warframe;
    yesterdayWf: Warframe;
    dailyId: string;
    resetAt: string;
}

export const MainGame = ({
    todaysWf,
    yesterdayWf,
    dailyId,
    resetAt,
}: MainGame) => {
    const dayKey = dailyId;
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<Warframe[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialWarframes);
    const [width, setWidth] = useState<number>();

    const { state, updateState } = useTags();

    // Resize listener
    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        function sameDay() {
            setDailyStreak(progress.streak);
            setGuesses(tempGuesses);

            const lastGuess = tempGuesses?.[tempGuesses.length - 1]?.name;

            setIsGuessed(lastGuess === todaysWf.name);
        }

        function lastGuessedYesterday() {
            setDailyStreak(progress.streak);
        }

        function lostStreak() {
            saveProgress("daily", {
                streak: 0,
                lastCompletedDailyId: progress.lastCompletedDailyId,
            });
        }

        const progress = getProgress("daily");
        const prev = getPreviousDailyId(dailyId);
        const tempGuesses = getGuesses(dayKey);

        setIsGuessed(false);
        setSearchText("");
        setVisible(false);
        setFilteredWarframes(initialWarframes);

        if (
            prev !== progress.lastCompletedDailyId &&
            dailyId !== progress.lastCompletedDailyId
        ) {
            lostStreak();
        }

        if (prev === progress.lastCompletedDailyId) {
            lastGuessedYesterday();
        }

        if (dailyId === progress.lastCompletedDailyId) {
            sameDay();
        }
    }, [dailyId, dayKey, todaysWf.name]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const temp = initialWarframes.filter(
                (item) => !guesses.includes(item),
            );
            const value = e.target.value;
            setSearchText(value);
            setVisible(true);
            if (value.length === 0) {
                setFilteredWarframes(temp);
            } else {
                setFilteredWarframes(
                    temp.filter((wf) =>
                        wf.name.toLowerCase().includes(value.toLowerCase()),
                    ),
                );
            }
        },
        [guesses],
    );

    useEffect(() => {
        if (state.daily !== isGuessed) {
            updateState("daily", isGuessed);
        }
    }, [isGuessed, state.daily, updateState]);

    const warframeSelected = useCallback(
        (wf: Warframe) => {
            if (wf.name === todaysWf.name) scrollToId("logo");
            const updated = [...guesses, wf];
            setGuesses(updated);
            setSearchText("");
            setVisible(false);

            storeGuesses(dayKey, updated);

            if (wf.name === todaysWf.name) {
                setIsGuessed(true);
                const updated = completeDaily("daily", dailyId);

                setDailyStreak(updated.streak);
            }
            setFilteredWarframes(
                initialWarframes.filter((item) => !updated.includes(item)),
            );
        },
        [guesses, todaysWf.name, dayKey, dailyId],
    );

    return (
        <>
            {isGuessed && (
                <ConfettiExplosion
                    particleCount={200}
                    duration={3000}
                    zIndex={100}
                    particleSize={10}
                    height={"150vh"}
                />
            )}
            <div className={Container.fd_container_1}>
                <YesterdayPortrait
                    image={yesterdayWf.image}
                    name={yesterdayWf.name}
                />

                <div className={ImgStyle.fd_imgstyle_0}>
                    {isGuessed ? (
                        <Image
                            width={130}
                            height={130}
                            className={ImgStyle.fd_imgstyle_0_guessed}
                            src={todaysWf.image}
                            alt={todaysWf.name}
                        />
                    ) : (
                        <Lock className={ImgStyle.fd_imgstyle_0_hidden} />
                    )}
                </div>

                <StreakProgress streak={dailyStreak} />
            </div>
            <span className={Text.fd_text_0} id="warframe-input">
                <TimerComponent resetAt={resetAt} />
            </span>
            {isGuessed && guesses.length > 0 && (
                <Modal todaysWf={todaysWf} guesses={[...guesses].reverse()} />
            )}
            <div className={Container.fd_container_2}>
                <div className={Input.fd_input_0}>
                    {!isGuessed && (
                        <div className={Input.fd_input_0_wrapper}>
                            <input
                                autoComplete="off"
                                disabled={isGuessed}
                                placeholder="Lotus"
                                value={searchText}
                                onChange={handleChange}
                                onFocus={() => {
                                    setVisible(true);
                                    if (768 >= (width || 0)) {
                                        scrollToId("warframe-input");
                                    }
                                }}
                            />
                            <button
                                disabled={isGuessed}
                                className={Input.fd_input_0_wrapper_button}
                                onClick={() => setVisible(!visible)}
                            >
                                <div
                                    className={
                                        Input.fd_input_0_wrapper_button_content
                                    }
                                >
                                    {visible ? (
                                        <DropdownX
                                            className={
                                                Input.fd_input_0_wrapper_button_symbol
                                            }
                                        />
                                    ) : (
                                        <DropdownArrow
                                            className={
                                                Input.fd_input_0_wrapper_button_symbol
                                            }
                                        />
                                    )}
                                </div>
                            </button>
                        </div>
                    )}
                    <AnimatePresence>
                        {visible && (
                            <motion.div
                                initial={{
                                    height: 0,
                                }}
                                animate={{
                                    height: 201,
                                }}
                                exit={{
                                    height: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                }}
                                className={Dropdown.fd_dropdown_0}
                            >
                                {filteredWarframes.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => warframeSelected(item)}
                                        className={Dropdown.fd_dropdown_0_item}
                                    >
                                        <Image
                                            width={40}
                                            height={40}
                                            src={item.image}
                                            className={
                                                Dropdown.fd_dropdown_0_item_image
                                            }
                                            alt={item.name}
                                        />
                                        <span
                                            className={
                                                Dropdown.fd_dropdown_0_item_text
                                            }
                                        >
                                            {item.name}
                                        </span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <h4 className={Text.fd_text_1}>
                    Attempts
                    {495 >= (width || 0) && (
                        <span
                            className={Text.fd_text_1_info}
                        >{`<- Scroll for more info ->`}</span>
                    )}
                </h4>
                <div className={Container.fd_container_3}>
                    <TableHeader />
                    <AnimatePresence>
                        {guesses !== null &&
                            guesses.length > 0 &&
                            [...guesses]
                                .map((item, index) => (
                                    <motion.div
                                        key={item.name + index}
                                        initial={{
                                            opacity: 0,
                                            x: 100,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -100,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <GuessRow
                                            warframeGuess={item}
                                            todayWarframe={todaysWf}
                                        />
                                    </motion.div>
                                ))
                                .reverse()}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};
