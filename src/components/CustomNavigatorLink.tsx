import Group from "@/styles/components/Group.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Utility from "@/assets/png/icons/IconInfinite.webp";
import DropdownArrowWhite from "@/assets/svg/arrow-down-gold.svg";
import Icon from "@/styles/components/Icon.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface CustomNavLink {
    href: string;
    iconSrc: string;
    name: string;
    target?: string;
}

export const CustomNavigatorLink = ({
    href,
    iconSrc,
    name,
    target = "_self",
}: CustomNavLink) => {
    const descriptor: string = useRouter().pathname;
    return (
        <Link className={Group.fd_group_1_button} href={href} target={target}>
            <div className={Group.fd_group_1_button_content}>
                <Image width={30} height={30} src={iconSrc} alt={name} />
                <span
                    className={clsx(Group.fd_group_1_button_text, {
                        [Group.fd_group_1_button_selected]: descriptor === href,
                    })}
                >
                    {name}
                </span>
            </div>
        </Link>
    );
};

interface CustomNavDropdown {
    links: CustomNavLink[];
}

export const CustomNavigatorDropdown = ({ links }: CustomNavDropdown) => {
    const descriptor: string = useRouter().pathname;

    const [endlessModes, setEndlessModes] = useState(false);

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
            <button
                className={Group.fd_group_1_button}
                onClick={() => {
                    setEndlessModes(!endlessModes);
                }}
            >
                <div className={Group.fd_group_1_button_content}>
                    <Image width={30} height={30} src={Utility} alt="Endless" />
                    <span
                        className={clsx(Group.fd_group_1_button_text, {
                            [Group.fd_group_1_button_selected]:
                                descriptor === "/endless/warframe" ||
                                descriptor === "/endless/ability",
                        })}
                    >
                        Endless Modes
                    </span>
                    <AnimatePresence>
                        <motion.div
                            initial={{
                                rotateZ: 0,
                            }}
                            animate={{
                                rotateZ: endlessModes ? 180 : 0,
                                transformOrigin: "50% 40%",
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
                                className={Icon.fd_icon_fills_white}
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
                        className={Group.fd_group_1_accordion}
                    >
                        {links.map((item) => (
                            <CustomNavigatorLink
                                key={item.name}
                                href={item.href}
                                iconSrc={item.iconSrc}
                                name={item.name}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
