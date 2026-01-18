"use client";

import { useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import Container from "@/styles/components/Container.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Button from "@/styles/components/Button.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Input from "@/styles/components/Input.module.scss";

import { initialAbilities } from "@/app/lib/abilities";
import { GuessAbility } from "@/app/components/GuessAbility";
import { getProcessedAbility } from "@/app/helpers/getProcessedAbility";
import clsx from "clsx";

function generateNewAbility(): ProcessedAbility | null {
    const asd = {
        ability: Math.floor(Math.random() * 4) + 1,
        variant: Math.floor(Math.random() * 2) + 1,
        warframe: Math.floor(Math.random() * initialAbilities.length),
    };
    return getProcessedAbility(asd);
}

export default function AbilityEndless() {
    const [searchText, setSearchText] = useState("");
    const [visible, setVisible] = useState(false);
    const [guesses, setGuesses] = useState<WarframeAbility[]>([]);
    const [isGuessed, setIsGuessed] = useState(false);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialAbilities);
    const [width, setWidth] = useState<number>();
    const [todaysWf, setTodaysWf] = useState<ProcessedAbility>(
        generateNewAbility() as ProcessedAbility
    );

    // FORCE ABILITY
    // const [todaysWf, setTodaysWf] = useState<ProcessedAbility>(
    //     getProcessedAbility({
    //         ability: 4,
    //         variant: 1,
    //         warframe: initialAbilities.findIndex(
    //             (item) => item.warframeName === "Uriel"
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
            guesses[guesses.length - 1]?.warframeName === todaysWf.warframeName
        ) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

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
            setFilteredWarframes(initialAbilities);
            setVisible(false);
            if (todaysWf !== null) {
                setSearchText("");

                setFilteredWarframes(initialAbilities);
                setGuesses([...guesses, selectedWf]);
                if (selectedWf.warframeName === todaysWf.warframeName) {
                    setIsGuessed(true);
                }
            }
        },
        [guesses, todaysWf]
    );

    const newWarframe = useCallback(() => {
        setIsGuessed(false);
        setGuesses([]);
        setTodaysWf(generateNewAbility() as ProcessedAbility);
    }, []);

    return (
        <>
            <NextSeo
                title="FrameDle - Endless Ability Mode | Unlimited Warframe Ability Challenges"
                description="Train endlessly with FrameDle's Endless Ability Mode! Guess unlimited Warframe abilities without affecting your daily streak. Perfect for practice and fun!"
                canonical="https://framedle.org/endless/ability"
                openGraph={{
                    url: "https://framedle.org/endless/ability",
                    title: "FrameDle - Endless Ability Mode | Unlimited Warframe Ability Challenges",
                    description:
                        "Think you know every Warframe ability? Test yourself in Endless Ability Mode and guess unlimited Warframe abilities without losing your streak!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/ability-thumbnail.png",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Endless Ability Mode - Unlimited Warframe Ability Guessing",
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
                            "warframe, warframe game, endless ability mode, warframe ability guessing, framedle endless mode, practice warframe ability, warframe quiz, tenno training, endless warframe puzzle, unlimited ability guessing, practice warframe abilities",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Endless Ability Mode</h2>

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
                    <div className={Container.fd_container_1}>
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
                    </div>

                    <>
                        <h2
                            className={clsx(
                                Group.fd_group_0_label,
                                Group.fd_group_pb_10
                            )}
                        >
                            <span className={Text.fd_text_0}>Endless</span>
                            <button
                                onClick={() => newWarframe()}
                                className={Button.fd_button_5}
                            >
                                New Ability
                            </button>
                        </h2>
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
            )}
        </>
    );
}
