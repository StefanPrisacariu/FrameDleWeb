"use client";

import { useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";

import Lock from "@/assets/svg/lock-solid.svg";
import Share from "@/assets/svg/share-solid.svg";
import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import { TableHeader } from "@/app/components/TableHeader";
import { GuessRow } from "@/app/components/GuessRow";
import { initialWarframes } from "@/app/lib/warframes";
import { TimerComponent } from "@/app/components/TimeComponent";
import { Modal } from "@/app/components/Modal";
import Container from "@/styles/components/Container.module.scss";
import Group from "@/styles/components/Group.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Button from "@/styles/components/Button.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Input from "@/styles/components/Input.module.scss";
import {
    getDailyStreak,
    storeDailyStreak,
    storeDailyStreakTime,
} from "@/app/helpers/storeReadStreak";
import { storeGuesses, getGuesses } from "@/app/helpers/storeReadGuesses";
import { checkResetNeeded } from "@/app/helpers/resetCheck";
import {
    fetchTodaysWarframe,
    fetchYesterdayWarframe,
} from "@/app/lib/queries/warframe";

export default function Home() {
    const [dailyStreak, setDailyStreak] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<Warframe[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialWarframes);
    const [width, setWidth] = useState<number>();
    const [modalToggle, setModalToggle] = useState(false);
    const [netError, setNetError] = useState(false);

    // Fetch Warframe data using TanStack Query
    const {
        data: todaysWf,
        isLoading: todayLoading,
        isError: todayError,
    } = useQuery({
        queryKey: ["today"],
        queryFn: fetchTodaysWarframe,
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
        queryFn: fetchYesterdayWarframe,
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
            guesses[guesses.length - 1]?.name === todaysWf.name
        ) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

    const initializeGame = async () => {
        try {
            const resetTime = await checkResetNeeded("FD_DAILY_STREAK_TIME");

            if (resetTime >= 48) {
                setDailyStreak(0);
                await storeDailyStreak(String(0));
                setGuesses([]);
                await storeGuesses([]);
            } else if (resetTime >= 24) {
                setGuesses([]);
                await storeGuesses([]);
                setDailyStreak(await getDailyStreak());
            } else {
                setGuesses(await getGuesses());
                setDailyStreak(await getDailyStreak());
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
                initialWarframes.filter((wf) =>
                    wf.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        },
        []
    );

    const warframeSelected = useCallback(
        async (selectedWf: Warframe) => {
            setSearchText("");
            setFilteredWarframes(initialWarframes);
            setVisible(false);
            const newGuesses = [...guesses, selectedWf];
            setGuesses(newGuesses);
            await storeGuesses(newGuesses);
            await storeDailyStreakTime();

            if (todaysWf && selectedWf.name === todaysWf.name) {
                setIsGuessed(true);
                const newStreak = dailyStreak + 1;
                setDailyStreak(newStreak);
                await storeDailyStreak(String(newStreak));
                setTimeout(() => setModalToggle(true), 3000);
            }
        },
        [guesses, todaysWf, dailyStreak]
    );

    const loading = todayLoading || yesterdayLoading;
    const error = todayError || yesterdayError || netError;

    return (
        <>
            <NextSeo
                title="FrameDle - The Ultimate Warframe Guessing Game for True Tenno"
                description="Think you know Warframe? Guess the Warframe of the day using clues like gender, aura polarity, and unique traits. Challenge your Tenno knowledge daily!"
                canonical="https://framedle.org/"
                openGraph={{
                    url: "https://framedle.org/",
                    title: "FrameDle - The Ultimate Warframe Guessing Game for True Tenno",
                    description:
                        "Think you know Warframe? Guess the Warframe of the day using clues like gender, aura polarity, and unique traits. Challenge your Tenno knowledge daily!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.png",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle - Warframe Guessing Game",
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
                            "warframe, warframe game, warframe guessing game, framedle, tenno, warframe challenge, daily warframe puzzle, warframedle, warframe wordle, tenno warframe wordle, tennodle, warframe quiz, guess the warframe, daily warframe challenge",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Daily Mode</h2>

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
                                        src={yesterdayWf.image as string}
                                        alt={yesterdayWf.name}
                                    />
                                )}
                            </div>
                        </div>

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
                                <Lock
                                    className={ImgStyle.fd_imgstyle_0_hidden}
                                />
                            )}
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
                    {isGuessed && (
                        <button
                            onClick={() => setModalToggle(!modalToggle)}
                            className={Button.fd_button_0}
                        >
                            <Share width={20} height={20} />
                            <span>Share</span>
                        </button>
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
                                                key={item.name}
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
                            {445 >= (width || 0) && (
                                <span
                                    className={Text.fd_text_1_info}
                                >{`<- Scroll for more info ->`}</span>
                            )}
                        </h4>
                        <div className={Container.fd_container_3}>
                            <TableHeader />
                            <AnimatePresence>
                                {todaysWf && guesses.length > 0
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
                                                  <GuessRow
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
            {guesses.length > 0 && todaysWf && modalToggle && (
                <Modal
                    todaysWf={todaysWf}
                    guesses={[...guesses].reverse()}
                    onClick={() => setModalToggle(false)}
                />
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
