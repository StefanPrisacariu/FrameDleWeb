"use client";

import { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";

import Image from "next/image";

import { GuessEmoji } from "@/app/components/GuessContainers/GuessEmoji";

import { initialEmojis } from "@/app/lib/emojis";

import Button from "@/styles/components/Button.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Input from "@/styles/components/Input.module.scss";
import Prog from "@/styles/components/Progress.module.scss";
import Text from "@/styles/components/Text.module.scss";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";

function generateNewEmoji(): WarframeEmojis {
    const asd = initialEmojis[Math.floor(Math.random() * initialEmojis.length)];
    return asd as WarframeEmojis;
}

export default function EmojiEndless() {
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<WarframeEmojis[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] = useState(initialEmojis);
    const [width, setWidth] = useState<number>();
    const [todaysWf, setTodaysWf] =
        useState<WarframeEmojis>(generateNewEmoji());

    // FORCE EMOJI
    // const [todaysWf, setTodaysWf] = useState<ProcessedAbility>(
    //     getProcessedAbility({
    //         ability: 4,
    //         variant: 1,
    //         warframe: initialAbilities.findIndex(
    //             (item) => item.name === "Uriel"
    //         ),
    //     }) as ProcessedAbility
    // );

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if (
            todaysWf &&
            guesses.length > 0 &&
            guesses[guesses.length - 1]?.name === todaysWf.name
        ) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

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

    const warframeSelected = useCallback(
        (selectedWf: WarframeEmojis) => {
            setVisible(false);
            const temp = [...guesses, selectedWf];
            if (todaysWf !== null) {
                setSearchText("");

                setGuesses(temp);
                if (selectedWf.name === todaysWf.name) {
                    setIsGuessed(true);
                }
            }
            setFilteredWarframes(
                initialEmojis.filter((item) => !temp.includes(item)),
            );
        },
        [guesses, todaysWf],
    );

    const newWarframe = useCallback(() => {
        setFilteredWarframes(initialEmojis);
        setIsGuessed(false);
        setGuesses([]);
        setTodaysWf(generateNewEmoji());
    }, []);

    // const allEmojis = () => {
    //     return initialEmojis.map((frame) => (
    //         <div key={frame.name}>
    //             <Image
    //                 width={50}
    //                 height={50}
    //                 src={frame.image}
    //                 alt={"hidden"}
    //                 placeholder="blur"
    //                 blurDataURL="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif"
    //                 loading="eager"
    //             />

    //             {frame.emojis.map((emoji, index) => (
    //                 <span
    //                     key={index}
    //                     style={{ fontSize: 40, fontFamily: "var(--emojis)" }}
    //                 >
    //                     {emoji}
    //                 </span>
    //             ))}
    //         </div>
    //     ));
    // };

    return (
        <>
            <NextSeo
                title="FrameDle - Endless Emoji Mode | Unlimited Warframe Emoji Challenges"
                description="Train endlessly with FrameDle's Endless Emoji Mode! Guess unlimited Warframe using emojis without affecting your daily streak. Perfect for practice and fun!"
                canonical="https://framedle.org/endless/emoji"
                openGraph={{
                    url: "https://framedle.org/endless/emoji",
                    title: "FrameDle - Endless Emoji Mode | Unlimited Warframe Emoji Challenges",
                    description:
                        "Think you know every Warframe? Test yourself in Endless Emoji Mode and guess unlimited Warframe without losing your streak!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Endless Emoji Mode - Unlimited Warframe emoji Guessing",
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
                            "warframe, warframe game, endless emoji mode, warframe emoji guessing, framedle endless mode, practice warframe emoji, warframe quiz, tenno training, endless warframe puzzle, unlimited emoji guessing, practice warframe abilities",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Endless Emoji Mode</h2>

            {todaysWf && (
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

                    <>
                        <h2
                            className={clsx(
                                Group.fd_group_0_label,
                                Group.fd_group_pb_10,
                            )}
                        >
                            <span className={Text.fd_text_0}>Endless</span>
                            <button
                                onClick={() => newWarframe()}
                                className={Button.fd_button_5}
                            >
                                New Emojis
                            </button>
                        </h2>
                    </>
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
                                                        "warframe-input",
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
                        <h4 className={Text.fd_text_1}>Attempts</h4>

                        {/* {allEmojis()} */}

                        <div className={Container.fd_container_7}>
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
            )}
        </>
    );
}
