"use client";

import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";

import Image from "next/image";

import { YesterdayPortrait } from "@/app/components/Elements/YesterdayPortrait";
import { GuessEmoji } from "@/app/components/GuessContainers/GuessEmoji";
import { EmojiModal } from "@/app/components/Modals/EmojiModal";
import { StreakProgress } from "@/app/components/StreakProgress";
import { TimerComponent } from "@/app/components/TimeComponent";

import { useTags } from "@/app/context/TagsContext";

import { scrollToId } from "@/app/helpers/scrollToId";
import {
    getEmojiGuesses,
    storeEmojiGuesses,
} from "@/app/helpers/storeReadGuesses";
import {
    completeDaily,
    getPreviousDailyId,
    getProgress,
    saveProgress,
} from "@/app/helpers/streakSystem";

import { initialEmojis } from "@/app/lib/emojis";

import Container from "@/styles/components/Container.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Input from "@/styles/components/Input.module.scss";
import Prog from "@/styles/components/Progress.module.scss";
import Text from "@/styles/components/Text.module.scss";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";

interface EmojiGame {
    todaysWf: WarframeEmojis;
    yesterdayWf: WarframeEmojis;
    dailyId: string;
    resetAt: string;
}

export const EmojiGame = ({
    todaysWf,
    yesterdayWf,
    dailyId,
    resetAt,
}: EmojiGame) => {
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<WarframeEmojisCorrected[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] = useState(initialEmojis);
    const [width, setWidth] = useState<number>();
    const { state, updateState } = useTags();

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
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
            saveProgress("emoji", {
                streak: 0,
                lastCompletedDailyId: dailyId,
            });
        }

        const progress = getProgress("emoji");
        const prev = getPreviousDailyId(dailyId);
        const tempGuesses = getEmojiGuesses(dailyId);

        setIsGuessed(false);
        setGuesses([]);
        setSearchText("");
        setVisible(false);

        if (tempGuesses.length > 0) {
            sameDay();
        } else if (prev === progress.lastCompletedDailyId) {
            lastGuessedYesterday();
        } else {
            lostStreak();
        }

        const namesToRemove = new Set(tempGuesses.map((item) => item.name));

        setFilteredWarframes(
            initialEmojis.filter((item) => !namesToRemove.has(item.name)),
        );
    }, [dailyId, todaysWf.name]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const temp = initialEmojis.filter(
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
        if (state.emoji !== isGuessed) {
            updateState("emoji", isGuessed);
        }
    }, [isGuessed, state.emoji, updateState]);

    const warframeSelected = useCallback(
        (selectedWf: WarframeEmojisCorrected) => {
            if (selectedWf.name === todaysWf.name) scrollToId("logo");
            const updated = [
                ...guesses,
                { name: selectedWf.name, image: selectedWf.image },
            ];
            setGuesses(updated);
            setSearchText("");
            setVisible(false);

            storeEmojiGuesses(dailyId, updated);

            if (selectedWf.name === todaysWf.name) {
                setIsGuessed(true);
                const updated = completeDaily("emoji", dailyId);

                setDailyStreak(updated.streak);
            }

            const namesToRemove = new Set(updated.map((item) => item.name));

            setFilteredWarframes(
                initialEmojis.filter((item) => !namesToRemove.has(item.name)),
            );
        },
        [todaysWf.name, guesses, dailyId],
    );

    return (
        <>
            {isGuessed && (
                <ConfettiExplosion
                    particleCount={200}
                    duration={3000}
                    zIndex={100}
                    particleSize={10}
                />
            )}
            <div className={Container.fd_container_8}>
                <div className={Prog.fd_progress_1}>
                    <div className={Prog.fd_progress_1_bar} />
                    <div className={Prog.fd_progress_1_wrap}>
                        {todaysWf.emojis.map((emoji, index) => (
                            <span
                                className={Prog.fd_progress_text}
                                key={`emoji-${index}`}
                            >
                                {guesses.length >= index || isGuessed
                                    ? emoji
                                    : "❔"}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={Container.fd_container_8}>
                <YesterdayPortrait
                    image={yesterdayWf.image}
                    name={yesterdayWf.name}
                />
                <span className={Text.fd_text_0} id="warframe-input">
                    <TimerComponent resetAt={resetAt} />
                </span>
                <StreakProgress streak={dailyStreak} />
            </div>

            {isGuessed && guesses.length > 0 && (
                <EmojiModal guesses={[...guesses].reverse()} />
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
                <h4 className={Text.fd_text_1}>Attempts</h4>
                <div className={Container.fd_container_7}>
                    <AnimatePresence>
                        {guesses.length > 0
                            ? [...guesses]
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
                                          <GuessEmoji
                                              warframeGuess={item}
                                              todayWarframe={todaysWf}
                                          />
                                      </motion.div>
                                  ))
                                  .reverse()
                            : guesses.length !== 0 && (
                                  <OrbitProgress
                                      size="medium"
                                      color={"#f1f1f1"}
                                  />
                              )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};
