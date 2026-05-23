import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/router";

import { ColorIndicators } from "@/app/components/ColorIndicators";
import {
    CustomNavigatorDropdown,
    CustomNavigatorLink,
} from "@/app/components/CustomNavigatorLink";
import { TitleLogo } from "@/app/components/Logos/TitleLogo";

import { storeIndicatorToggle } from "@/app/helpers/indicatorStatus";

import Button from "@/styles/components/Button.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Icon from "@/styles/components/Icon.module.scss";
import Logo from "@/styles/components/Logo.module.scss";
import Nav from "@/styles/components/Navigation.module.scss";

import Feedback from "@/assets/png/icons/Chem_w.webp";
import Home from "@/assets/png/icons/IconMissionMarkerExtraction.webp";
import Quest from "@/assets/png/icons/IconQuest.webp";
import Settings from "@/assets/png/icons/ReputationSmall.webp";
import Menu from "@/assets/svg/bars-solid-icon.svg";
import Close from "@/assets/svg/close-x.svg";

import Focus from "/public/game_progress/ability.webp";
import Emoji from "/public/game_progress/emoji.webp";
import Mission from "/public/game_progress/warframe.webp";

const links = [
    {
        href: "/",
        name: "Home",
        iconSrc: Home.src,
    },
    {
        href: "/warframe",
        name: "Warframe",
        iconSrc: Mission.src,
    },
    {
        href: "/ability",
        name: "Ability",
        iconSrc: Focus.src,
    },
    {
        href: "/emoji",
        name: "Emoji",
        iconSrc: Emoji.src,
    },
    {
        links: [
            {
                href: "/endless/warframe",
                name: "Warframe",
                iconSrc: Mission.src,
            },
            {
                href: "/endless/ability",
                name: "Ability",
                iconSrc: Focus.src,
            },
            {
                href: "/endless/emoji",
                name: "Emoji",
                iconSrc: Emoji.src,
            },
        ],
    },
    {
        href: "/info",
        name: "Tutorial",
        iconSrc: Quest.src,
    },
    {
        href: "/feedback",
        name: "Feedback",
        iconSrc: Feedback.src,
    },
    {
        href: "/settings",
        name: "Settings",
        iconSrc: Settings.src,
    },
];

export const CustomNavigator = () => {
    const descriptor: string = useRouter().pathname;

    const [isMobileNavVisible, setIsMobileNavVisible] =
        useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);
    const mobileRef = useRef<HTMLDivElement | null>(null);

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
                                        {links.map((item) => {
                                            return (
                                                <>
                                                    {!item.links ? (
                                                        <CustomNavigatorLink
                                                            href={item.href}
                                                            iconSrc={
                                                                item.iconSrc
                                                            }
                                                            name={item.name}
                                                        />
                                                    ) : (
                                                        <CustomNavigatorDropdown
                                                            links={item.links}
                                                        />
                                                    )}
                                                </>
                                            );
                                        })}

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
