"use client";

import { useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";

import Lock from "@/assets/svg/lock-solid.svg";
import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";
import { TableHeader } from "@/app/components/TableHeader";
import { GuessRow } from "@/app/components/GuessRow";
import { initialWarframes } from "@/app/lib/warframes";
import Container from "@/styles/components/Container.module.scss";
import Group from "@/styles/components/Group.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Button from "@/styles/components/Button.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Input from "@/styles/components/Input.module.scss";
import clsx from "clsx";

function Endless() {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [guesses, setGuesses] = useState<Warframe[]>([]);
    const [filteredWarframes, setFilteredWarframes] =
        useState(initialWarframes);
    const [todaysWf, setTodaysWf] = useState<Warframe>(
        initialWarframes[
            Math.floor(Math.random() * (initialWarframes.length + 1))
        ] as Warframe
    );
    const [isGuessed, setIsGuessed] = useState(false);
    const [width, setWidth] = useState<number>();

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
            setFilteredWarframes(initialWarframes);
            setVisible(false);
            if (todaysWf !== null) {
                setSearchText("");

                setFilteredWarframes(initialWarframes);
                setGuesses([...guesses, selectedWf]);
                if (selectedWf.name === todaysWf.name) {
                    setIsGuessed(true);
                }
            }
        },
        [guesses, todaysWf]
    );

    const newWarframe = useCallback(() => {
        setIsGuessed(false);
        setGuesses([]);
        setTodaysWf(
            initialWarframes[
                Math.floor(Math.random() * (initialWarframes.length + 1))
            ] as Warframe
        );
    }, []);

    return (
        <>
            <NextSeo
                title="FrameDle - Endless Warframe | Practice & Train Anytime"
                description="Play FrameDle's Endless Warframe Mode! Guess as many Warframes as you like without affecting your daily streak. Perfect for training and passing time."
                canonical="https://framedle.org/endless/warframe"
                openGraph={{
                    url: "https://framedle.org/endless/warframe",
                    title: "FrameDle - Endless Warframe | Practice & Train Anytime",
                    description:
                        "Play FrameDle's Endless Warframe Mode! Guess as many Warframes as you like without affecting your daily streak.",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.png",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Endless Warframe Mode Thumbnail",
                        },
                    ],
                    site_name: "FrameDle",
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "warframe, warframe game, endless warframe, framedle endless warframe, practice warframe guessing, unlimited warframe quiz, framedle endless mode, warframe training, endless warframe challenge, guess unlimited warframes",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Endless Warframe Mode</h2>
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
                    </div>
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
                            New Warframe
                        </button>
                    </h2>
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
                            {495 >= (width || 0) && (
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
                                                  animate={{ opacity: 1, x: 0 }}
                                                  exit={{ opacity: 0, x: -100 }}
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
            )}
        </>
    );
}

export default Endless;
