"use client";

import { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import ConfettiExplosion from "react-confetti-explosion";
import { OrbitProgress } from "react-loading-indicators";

import Image from "next/image";

import { GuessAbility } from "@/app/components/GuessContainers/GuessAbility";

import { getProcessedAbility } from "@/app/helpers/getProcessedAbility";

import { initialAbilities } from "@/app/lib/abilities";

import Button from "@/styles/components/Button.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Group from "@/styles/components/Group.module.scss";
import ImgStyle from "@/styles/components/ImgStyle.module.scss";
import Input from "@/styles/components/Input.module.scss";
import Text from "@/styles/components/Text.module.scss";

import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import DropdownX from "@/assets/svg/close-x.svg";

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
        generateNewAbility() as ProcessedAbility,
    );

    // FORCE ABILITY
    // const [todaysWf, setTodaysWf] = useState<ProcessedAbility>(
    //     getProcessedAbility({
    //         ability: 2,
    //         variant: 1,
    //         warframe: initialAbilities.findIndex(
    //             (item) => item.name === "Sevagoth's Shadow",
    //         ),
    //     }) as ProcessedAbility,
    // );

    useEffect(() => {
        const updateDimensions = () => setWidth(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const lastGuess = guesses[guesses.length - 1]?.name;

        if (
            todaysWf &&
            lastGuess &&
            todaysWf.owners &&
            todaysWf.owners.includes(lastGuess)
        ) {
            setIsGuessed(true);
        }
    }, [todaysWf, guesses]);

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

    const warframeSelected = useCallback(
        (selectedWf: WarframeAbility) => {
            setVisible(false);
            const temp = [...guesses, selectedWf];
            if (todaysWf !== null) {
                setSearchText("");

                setGuesses(temp);
                if (
                    todaysWf.owners &&
                    todaysWf.owners.includes(selectedWf.name)
                ) {
                    setIsGuessed(true);
                }
            }
            setFilteredWarframes(
                initialAbilities.filter((item) => !temp.includes(item)),
            );
        },
        [guesses, todaysWf],
    );

    const newWarframe = useCallback(() => {
        setIsGuessed(false);
        setGuesses([]);
        setTodaysWf(generateNewAbility() as ProcessedAbility);
    }, []);

    // const fullList = initialAbilities.map((item) => (
    //     <div
    //         key={item.name}
    //         style={{
    //             display: "flex",
    //             flexDirection: "row",
    //         }}
    //     >
    //         <Image
    //             width={50}
    //             height={50}
    //             src={item.image}
    //             alt={"hidden"}
    //             placeholder="blur"
    //             blurDataURL="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif"
    //             loading="eager"
    //         />
    //         {item.abilities.map((ability, index) => {
    //             const abilityName =
    //                 typeof ability.abilityName === "string"
    //                     ? ability.abilityName
    //                     : ability.abilityName[1];
    //             return (
    //                 <Image
    //                     key={ability.shortcut}
    //                     width={50}
    //                     height={50}
    //                     src={abilityIconNew(
    //                         item.name,
    //                         ability.shortcut,
    //                         abilityName,
    //                     )}
    //                     alt={"hidden"}
    //                     placeholder="blur"
    //                     blurDataURL="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif"
    //                     loading="eager"
    //                 />
    //             );
    //         })}
    //     </div>
    // ));

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
                            url: "https://framedle.org/ability-thumbnail.webp",
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
                                Group.fd_group_pb_10,
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
                        {/* {fullList} */}

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
            )}
        </>
    );
}
