"use client";

import { useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import { TimerComponent } from "@/app/components/TimeComponent";
import Container from "@/styles/components/Container.module.scss";
import Group from "@/styles/components/Group.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Input from "@/styles/components/Input.module.scss";
import {
    getAbilityStreak,
    storeAbilityStreak,
    storeAbilityStreakTime,
    storeDailyStreak,
} from "@/app/helpers/storeReadStreak";
import {
    storeAbilityGuesses,
    getAbilityGuesses,
} from "@/app/helpers/storeReadGuesses";
import { checkResetNeeded } from "@/app/helpers/resetCheck";
import {
    fetchTodaysAbility,
    fetchTodaysWarframe,
    fetchYesterdayAbility,
    fetchYesterdayWarframe,
} from "@/app/lib/queries/warframe";
import { initialAbilities } from "@/app/lib/abilities";
import { GuessAbility } from "@/app/components/GuessAbiity";
import { AbilityModal } from "@/app/components/AbilityModal";

export default function Ability() {
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<WarframeAbility[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialAbilities);
    const [width, setWidth] = useState<number>();
    const [netError, setNetError] = useState(false);

    // Fetch Warframe data using TanStack Query
    const {
        data: todaysWf,
        isLoading: todayLoading,
        isError: todayError,
    } = useQuery({
        queryKey: ["today"],
        queryFn: fetchTodaysAbility,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
    });

    const {
        data: yesterdayWf,
        isLoading: yesterdayLoading,
        isError: yesterdayError,
    } = useQuery({
        queryKey: ["yesterday"],
        queryFn: fetchYesterdayAbility,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
    });

    // Resize listener
    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Initialize game state after data is loaded
    useEffect(() => {
        if (!todayLoading && !yesterdayLoading && todaysWf && yesterdayWf) {
            initializeGame();
        }
    }, [todayLoading, yesterdayLoading, todaysWf, yesterdayWf]);

    // Mark guessed if last guess matches today's WF
    useEffect(() => {
        if (
            todaysWf &&
            guesses.length > 0 &&
            guesses[guesses.length - 1]?.warframeName === todaysWf.warframeName
        ) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

    const initializeGame = async () => {
        try {
            const resetTime = await checkResetNeeded("FD_ABILITY_STREAK_TIME");

            if (resetTime >= 48) {
                setDailyStreak(0);
                await storeAbilityStreak(0);
                setGuesses([]);
                await storeAbilityGuesses([]);
            } else if (resetTime >= 24) {
                setGuesses([]);
                await storeAbilityGuesses([]);
                setDailyStreak(await getAbilityStreak());
            } else {
                setGuesses(await getAbilityGuesses());
                setDailyStreak(await getAbilityStreak());
            }
        } catch (error) {
            console.error("Initialization error:", error);
            setNetError(true);
        }
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchText(value);
            setVisible(true);
            setFilteredWarframes(
                initialAbilities.filter((wf) =>
                    wf.warframeName.toLowerCase().includes(value.toLowerCase())
                )
            );
        },
        []
    );

    const warframeSelected = useCallback(
        async (selectedWf: WarframeAbility) => {
            setSearchText("");
            setFilteredWarframes(initialAbilities);
            setVisible(false);
            const newGuesses = [...guesses, selectedWf];
            setGuesses(newGuesses);
            await storeAbilityGuesses(newGuesses);
            await storeAbilityStreakTime();
            if (todaysWf && selectedWf.warframeName === todaysWf.warframeName) {
                setIsGuessed(true);
                const newStreak = dailyStreak + 1;
                setDailyStreak(newStreak);
                await storeDailyStreak(String(newStreak));
            }
        },
        [guesses, todaysWf, dailyStreak]
    );

    // const reset = () => {
    //     setGuesses([]);
    //     storeAbilityGuesses([]);
    //     setIsGuessed(false);
    // };

    const loading = todayLoading || yesterdayLoading;
    const error = todayError || yesterdayError || netError;

    return (
        <>
            <NextSeo
                title="FrameDle - Guess the Warframe Ability of the Day"
                description="Test your Warframe knowledge! Can you guess the Warframe ability of the day using only clues? Challenge yourself daily with FrameDle’s ability mode!"
                canonical="https://framedle.org/ability"
                openGraph={{
                    url: "https://framedle.org/ability",
                    title: "FrameDle - Guess the Warframe Ability of the Day",
                    description:
                        "Think you know every Warframe ability? Guess the ability of the day with FrameDle’s new ability mode and prove your Tenno knowledge!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/ability-thumbnail.png",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Ability Mode - Warframe Ability Guessing Game",
                        },
                    ],
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "warframe, warframe game, warframe ability, warframe ability guessing game, framedle ability mode, daily warframe ability puzzle, tenno challenge, warframe wordle ability, tennodle abilities, guess warframe ability, warframe daily ability quiz, frame guessing",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Ability Mode</h2>

            {!loading && todaysWf ? (
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
                            <h3 className={Group.fd_group_0_label}>
                                Yesterday
                            </h3>
                            <div className={Group.fd_group_0_wrap}>
                                {yesterdayWf && (
                                    <Image
                                        width={50}
                                        height={50}
                                        className={Group.fd_group_0_wrap_image}
                                        src={
                                            initialAbilities[
                                                yesterdayWf.warframe
                                            ]?.image as string
                                        }
                                        alt={
                                            initialAbilities[
                                                yesterdayWf.warframe
                                            ]?.warframeName as string
                                        }
                                    />
                                )}
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

                        <div className={Group.fd_group_0}>
                            <h3 className={Group.fd_group_0_label}>Daily</h3>
                            <div className={Group.fd_group_0_wrap_2}>
                                <span
                                    className={Group.fd_group_0_wrap_2_streak}
                                >
                                    {dailyStreak || "0"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className={Text.fd_text_0}>
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
                    {isGuessed && guesses.length > 0 && todaysWf && (
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
                                                document
                                                    .getElementById(
                                                        "warframe-input"
                                                    )
                                                    ?.scrollIntoView();
                                            }
                                        }}
                                        id="warframe-input"
                                    />
                                    <button
                                        disabled={isGuessed}
                                        className={
                                            Input.fd_input_0_wrapper_button
                                        }
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
                                                key={item.warframeName}
                                                onClick={() =>
                                                    warframeSelected(item)
                                                }
                                                className={
                                                    Dropdown.fd_dropdown_0_item
                                                }
                                            >
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={item.image}
                                                    className={
                                                        Dropdown.fd_dropdown_0_item_image
                                                    }
                                                    alt={item.warframeName}
                                                />
                                                <span
                                                    className={
                                                        Dropdown.fd_dropdown_0_item_text
                                                    }
                                                >
                                                    {item.warframeName}
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
                                {todaysWf && guesses.length > 0
                                    ? [...guesses]
                                          .map((item, index) => (
                                              <motion.div
                                                  key={
                                                      item.warframeName + index
                                                  }
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
                                              color={"#FFFFFF"}
                                          />
                                      )}
                            </AnimatePresence>
                        </div>
                    </div>
                </>
            ) : !error ? (
                <OrbitProgress size="medium" color={"#FFFFFF"} />
            ) : (
                <div>
                    <Image
                        fill
                        className="netErrorImage"
                        src={"/netError.png"}
                        alt="internet-error"
                    />
                    <p className="networkError">There was a server error</p>
                    <p className="networkError">Try again later</p>
                </div>
            )}
        </>
    );
}

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["today"],
        queryFn: fetchTodaysWarframe,
    });

    await queryClient.prefetchQuery({
        queryKey: ["yesterday"],
        queryFn: fetchYesterdayWarframe,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
