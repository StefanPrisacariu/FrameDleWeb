import { ColorIndicators } from "@/app/components/ColorIndicators";
import { storeIndicatorToggle } from "@/app/helpers/indicatorStatus";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Menu from "@/assets/svg/bars-solid-icon.svg";
import Close from "@/assets/svg/close-x.svg";

import { TitleLogo } from "@/app/components/Logos/TitleLogo";
import Feedback from "@/assets/png/icons/Chem_w.webp";
import Utility from "@/assets/png/icons/IconInfinite.webp";
import Home from "@/assets/png/icons/IconMissionMarkerExtraction.webp";
import Quest from "@/assets/png/icons/IconQuest.webp";
import Settings from "@/assets/png/icons/ReputationSmall.webp";
import DropdownArrowWhite from "@/assets/svg/arrow-down-gold.svg";
import Button from "@/styles/components/Button.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Icon from "@/styles/components/Icon.module.scss";
import Logo from "@/styles/components/Logo.module.scss";
import Nav from "@/styles/components/Navigation.module.scss";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Focus from "/public/game_progress/ability.webp";
import Emoji from "/public/game_progress/emoji.webp";
import Mission from "/public/game_progress/warframe.webp";

export const CustomNavigator = () => {
    const descriptor: string = useRouter().pathname;

    const [isMobileNavVisible, setIsMobileNavVisible] =
        useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);
    const mobileRef = useRef<HTMLDivElement | null>(null);

    const [endlessModes, setEndlessModes] = useState(false);

    useEffect(() => {
        if (descriptor) {
            setIsMobileNavVisible(false);
        }
    }, [descriptor]);

    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
        if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            ref2.current &&
            !ref2.current.contains(event.target as Node)
        ) {
            storeIndicatorToggle(false);
        }
    };

    const handleClickOutsideMobile = (event: MouseEvent | TouchEvent): void => {
        if (
            mobileRef.current &&
            !mobileRef.current.contains(event.target as Node)
        ) {
            setIsMobileNavVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        document.addEventListener("touchend", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
            document.removeEventListener("touchend", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideMobile, true);
        document.addEventListener("touchend", handleClickOutsideMobile, true);
        return () => {
            document.removeEventListener(
                "click",
                handleClickOutsideMobile,
                true,
            );
            document.removeEventListener(
                "touchend",
                handleClickOutsideMobile,
                true,
            );
        };
    }, []);

    useEffect(() => {
        if (
            descriptor !== "/endless/warframe" &&
            descriptor !== "/endless/ability"
        ) {
            setEndlessModes(false);
        }
    }, [descriptor]);

    if (descriptor === "/") {
        return null;
    }

    return (
        <>
            <AnimatePresence>
                {isMobileNavVisible && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 200,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: 200,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                        className={Nav.fd_nav_0}
                    >
                        <div className={Nav.fd_nav_0_wrap}>
                            <div ref={mobileRef} className={Nav.fd_nav_content}>
                                <div className={Nav.fd_nav_container}>
                                    <div
                                        className={clsx(
                                            Logo.fd_logo_0,
                                            Nav.fd_nav_container_logo,
                                        )}
                                    >
                                        <TitleLogo />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsMobileNavVisible(false);
                                        }}
                                        className={Nav.fd_nav_button}
                                    >
                                        <Close
                                            width={20}
                                            height={20}
                                            className={Icon.fd_icon_fills_gold}
                                        />
                                    </button>
                                    <div className={Group.fd_group_1}>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="/"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Home}
                                                    alt="Home"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/",
                                                        },
                                                    )}
                                                >
                                                    Home
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="/warframe"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Mission}
                                                    alt="Warframe"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/warframe",
                                                        },
                                                    )}
                                                >
                                                    Warframe
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="/ability"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Focus}
                                                    alt="Ability"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/ability",
                                                        },
                                                    )}
                                                >
                                                    Ability
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="/emoji"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Emoji}
                                                    alt="Emoji"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/emoji",
                                                        },
                                                    )}
                                                >
                                                    Emoji
                                                </span>
                                            </div>
                                        </Link>

                                        <button
                                            className={Group.fd_group_1_button}
                                            onClick={() => {
                                                setEndlessModes(!endlessModes);
                                            }}
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Utility}
                                                    alt="Endless"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                    "/endless/warframe" ||
                                                                descriptor ===
                                                                    "/endless/ability",
                                                        },
                                                    )}
                                                >
                                                    Endless Modes
                                                </span>
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{
                                                            rotateZ: 0,
                                                        }}
                                                        animate={{
                                                            rotateZ:
                                                                endlessModes
                                                                    ? 180
                                                                    : 0,
                                                            transformOrigin:
                                                                "50% 40%",
                                                        }}
                                                        exit={{
                                                            rotateZ: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.4,
                                                            ease: "easeOut",
                                                        }}
                                                    >
                                                        <DropdownArrowWhite
                                                            width={15}
                                                            height={15}
                                                            className={
                                                                Icon.fd_icon_fills_white
                                                            }
                                                        />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {endlessModes && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        ease: "easeOut",
                                                    }}
                                                    className={
                                                        Group.fd_group_1_accordion
                                                    }
                                                >
                                                    <Link
                                                        className={
                                                            Group.fd_group_1_button_2
                                                        }
                                                        href="/endless/warframe"
                                                    >
                                                        <div
                                                            className={
                                                                Group.fd_group_1_button_2_content
                                                            }
                                                        >
                                                            <Image
                                                                width={30}
                                                                height={30}
                                                                src={Mission}
                                                                alt="Endless"
                                                            />
                                                            <span
                                                                className={clsx(
                                                                    Group.fd_group_1_button_2_text,
                                                                    {
                                                                        [Group.fd_group_1_button_2_selected]:
                                                                            descriptor ===
                                                                            "/endless/warframe",
                                                                    },
                                                                )}
                                                            >
                                                                Warframe
                                                            </span>
                                                        </div>
                                                    </Link>
                                                    <Link
                                                        className={
                                                            Group.fd_group_1_button_2
                                                        }
                                                        href="/endless/ability"
                                                    >
                                                        <div
                                                            className={
                                                                Group.fd_group_1_button_2_content
                                                            }
                                                        >
                                                            <Image
                                                                width={30}
                                                                height={30}
                                                                src={Focus}
                                                                alt="Endless"
                                                            />
                                                            <span
                                                                className={clsx(
                                                                    Group.fd_group_1_button_2_text,
                                                                    {
                                                                        [Group.fd_group_1_button_2_selected]:
                                                                            descriptor ===
                                                                            "/endless/ability",
                                                                    },
                                                                )}
                                                            >
                                                                Ability
                                                            </span>
                                                        </div>
                                                    </Link>
                                                    <Link
                                                        className={
                                                            Group.fd_group_1_button_2
                                                        }
                                                        href="/endless/emoji"
                                                    >
                                                        <div
                                                            className={
                                                                Group.fd_group_1_button_2_content
                                                            }
                                                        >
                                                            <Image
                                                                width={30}
                                                                height={30}
                                                                src={Emoji}
                                                                alt="EMoji"
                                                            />
                                                            <span
                                                                className={clsx(
                                                                    Group.fd_group_1_button_2_text,
                                                                    {
                                                                        [Group.fd_group_1_button_2_selected]:
                                                                            descriptor ===
                                                                            "/endless/emoji",
                                                                    },
                                                                )}
                                                            >
                                                                Emoji
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="/info"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Quest}
                                                    alt="Info"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/info",
                                                        },
                                                    )}
                                                >
                                                    Tutorial
                                                </span>
                                            </div>
                                        </Link>

                                        <Link
                                            className={Group.fd_group_1_button}
                                            href="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                                            target="_blank"
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Feedback}
                                                    alt="Feedback"
                                                />
                                                <span
                                                    className={
                                                        Button.fd_button_3_text
                                                    }
                                                >
                                                    Feedback
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={Group.fd_group_1_button}
                                            href={"/settings"}
                                        >
                                            <div
                                                className={
                                                    Group.fd_group_1_button_content
                                                }
                                            >
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src={Settings}
                                                    alt="Settings"
                                                />
                                                <span
                                                    className={clsx(
                                                        Group.fd_group_1_button_text,
                                                        {
                                                            [Group.fd_group_1_button_selected]:
                                                                descriptor ===
                                                                "/settings",
                                                        },
                                                    )}
                                                >
                                                    Settings
                                                </span>
                                            </div>
                                        </Link>
                                        <ColorIndicators />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!isMobileNavVisible && (
                <button
                    onClick={() => setIsMobileNavVisible(true)}
                    className={clsx(Button.fd_button_1, Button.fd_button_2)}
                >
                    <Menu
                        width={20}
                        height={20}
                        className={Button.fd_button_1_image}
                    />
                </button>
            )}
        </>
    );
};
