"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";

import { TimerComponent } from "@/app/components/TimeComponent";
import {
    getAbilityStreak,
    storeAbilityStreak,
    storeAbilityStreakTime,
} from "@/app/helpers/storeReadStreak";
import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import Container from "@/styles/components/Container.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Group from "@/styles/components/Group.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Input from "@/styles/components/Input.module.scss";
import Text from "@/styles/components/Text.module.scss";

import { checkResetNeeded } from "@/app/helpers/resetCheck";
import {
    getAbilityGuesses,
    storeAbilityGuesses,
} from "@/app/helpers/storeReadGuesses";

import { GuessAbility } from "@/app/components/GuessContainers/GuessAbility";
import { AbilityModal } from "@/app/components/Modals/AbilityModal";
import { StreakProgress } from "@/app/components/StreakProgress";
import { useTags } from "@/app/context/TagsContext";
import { scrollToId } from "@/app/helpers/scrollToId";
import { initialAbilities } from "@/app/lib/abilities";

interface AbilityGame {
    todaysWf: ProcessedAbility;
    yesterdayWf: number;
}

export const AbilityGame = ({ todaysWf, yesterdayWf }: AbilityGame) => {
    const dayKey = todaysWf.name;
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<WarframeAbility[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialAbilities);
    const [width, setWidth] = useState<number>();
    const { state, updateState } = useTags();

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        setIsGuessed(false);
        setGuesses([]);
        setSearchText("");
        setVisible(false);
        setFilteredWarframes(initialAbilities);

        const resetTime = checkResetNeeded("FD_ABILITY_STREAK_TIME");
        const streak = getAbilityStreak();
        const tempGuesses = getAbilityGuesses(dayKey);

        switch (true) {
            case resetTime >= 48: {
                setDailyStreak(0);
                storeAbilityStreak(0);

                setGuesses([]);
                storeAbilityGuesses(dayKey, []);

                setIsGuessed(false);
                break;
            }

            case resetTime >= 24 && resetTime < 48: {
                setGuesses([]);
                storeAbilityGuesses(dayKey, []);

                setDailyStreak(streak);
                setIsGuessed(false);
                break;
            }

            case resetTime < 24: {
                setGuesses(tempGuesses);
                setDailyStreak(streak);

                const lastGuess = tempGuesses?.[tempGuesses.length - 1]?.name;

                setIsGuessed(lastGuess === todaysWf.name);

                break;
            }
        }
    }, [dayKey, todaysWf.name]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const temp = initialAbilities.filter(
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
        if (state.ability !== isGuessed) {
            updateState("ability", isGuessed);
        }
    }, [isGuessed, state.ability, updateState]);

    const warframeSelected = useCallback(
        (selectedWf: WarframeAbility) => {
            if (selectedWf.name === todaysWf.name) scrollToId("logo");
            const updated = [...guesses, selectedWf];
            setGuesses(updated);
            setSearchText("");
            setVisible(false);

            storeAbilityGuesses(dayKey, updated);

            if (selectedWf.name === todaysWf.name) {
                setIsGuessed(true);
                const newStreak = dailyStreak + 1;
                setDailyStreak(newStreak);
                storeAbilityStreak(newStreak);
                storeAbilityStreakTime();
            }
            setFilteredWarframes(
                initialAbilities.filter((item) => !updated.includes(item)),
            );
            if (guesses.length === 0) {
                storeAbilityStreakTime();
            }
        },
        [guesses, dayKey, todaysWf.name, dailyStreak],
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
            <div className={Container.fd_container_1}>
                <div className={Group.fd_group_0}>
                    <h3 className={Group.fd_group_0_label}>Yesterday</h3>
                    <div className={Group.fd_group_0_wrap}>
                        <Image
                            width={50}
                            height={50}
                            className={Group.fd_group_0_wrap_image}
                            src={initialAbilities[yesterdayWf]?.image as string}
                            alt={initialAbilities[yesterdayWf]?.name as string}
                        />
                    </div>
                </div>
                <div className={ImgStyle.fd_imgstyle_1}>
                    <Image
                        width={130}
                        height={130}
                        className={ImgStyle.fd_imgstyle_1_guessed}
                        src={todaysWf.icon}
                        alt={"hidden"}
                        placeholder="blur"
                        blurDataURL="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif"
                        loading="eager"
                    />

                    <div className={ImgStyle.fd_imgstyle_1_hidden_wrap}>
                        <div
                            className={
                                ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                            }
                        />
                        <div
                            className={
                                isGuessed
                                    ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                    : guesses.length >= 1
                                      ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                      : ImgStyle.fd_imgstyle_1_hidden_wrap_hidden
                            }
                        />
                        <div
                            className={
                                isGuessed
                                    ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                    : guesses.length >= 2
                                      ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                      : ImgStyle.fd_imgstyle_1_hidden_wrap_hidden
                            }
                        />
                        <div
                            className={
                                isGuessed
                                    ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                    : guesses.length >= 3
                                      ? ImgStyle.fd_imgstyle_1_hidden_wrap_visible
                                      : ImgStyle.fd_imgstyle_1_hidden_wrap_hidden
                            }
                        />
                    </div>
                </div>

                <StreakProgress streak={dailyStreak} />
            </div>
            <span className={Text.fd_text_0} id="warframe-input">
                <TimerComponent />
            </span>
            <>
                {4 - guesses.length > 0 && !isGuessed && (
                    <span className={Text.fd_text_3}>
                        Hint available in {4 - guesses.length}{" "}
                        {4 - guesses.length > 1 ? "guesses" : "guess"}
                    </span>
                )}
                {(4 - guesses.length <= 0 || isGuessed) && (
                    <span className={Text.fd_text_3}>
                        Ability Name: {todaysWf.abilityName}
                    </span>
                )}
            </>
            {isGuessed && guesses.length > 0 && (
                <AbilityModal guesses={[...guesses].reverse()} />
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
                                          <GuessAbility
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
