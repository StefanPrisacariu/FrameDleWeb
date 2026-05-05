"use client";

import { useSettings } from "@/app/context/SettingsContext";
import ModalStyle from "@/styles/components/Modal.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Button from "@/styles/components/Button.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Colorblind from "@/assets/png/icons/Ionic_w.webp";
import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";

import Image from "next/image";
import { useState } from "react";
import {
    // getColorblindMode,
    storeColorblindMode,
} from "@/app/helpers/colorblindStore";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
// import { useTheme } from "next-themes";
import { useColorblind } from "@/app/context/ColorblindContext";

export const SettingsModal = () => {
    const { visibleSettings, setVisibleSettings } = useSettings();
    const [colorblindMenu, setColorblindMenu] = useState(false);
    // const [themeMenu, setThemeMenu] = useState(false);
    // const { theme, setTheme } = useTheme();
    const { mode, setMode } = useColorblind();

    const handleColorblind = (cb: ColorblindMode): void => {
        setMode(cb);
        storeColorblindMode(cb);
        setColorblindMenu(false);
    };

    if (!visibleSettings) return null;

    return (
        <div
            onClick={() => setVisibleSettings(false)}
            className={ModalStyle.fd_modal_2}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={ModalStyle.fd_modal_2_card}
            >
                <span className={ModalStyle.fd_modal_2_card_title}>
                    Settings
                </span>

                <div className={Group.fd_group_1_button}>
                    <div className={Group.fd_group_1_button_content}>
                        <Image
                            width={30}
                            height={30}
                            src={Colorblind}
                            alt="Colorblind"
                        />

                        <span className={Button.fd_button_3_text}>
                            Colorblind Mode
                        </span>
                    </div>
                    <div className={Dropdown.fd_dropdown_1}>
                        <div
                            onClick={() => setColorblindMenu(!colorblindMenu)}
                            className={Dropdown.fd_dropdown_1_wrap}
                        >
                            <span className={Button.fd_button_3_text}>
                                {mode}
                            </span>
                        </div>
                        <button
                            className={Dropdown.fd_dropdown_1_button}
                            onClick={() => setColorblindMenu(!colorblindMenu)}
                        >
                            <div
                                className={
                                    Dropdown.fd_dropdown_1_button_content
                                }
                            >
                                <DropdownArrow width={15} height={15} />
                            </div>
                        </button>
                        <AnimatePresence>
                            {colorblindMenu && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                    }}
                                    animate={{
                                        height: 185,
                                    }}
                                    exit={{
                                        height: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className={Dropdown.fd_dropdown_1_menu}
                                >
                                    <span
                                        onClick={() =>
                                            handleColorblind("Disabled")
                                        }
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "Disabled" === mode,
                                            },
                                        )}
                                    >
                                        Disabled
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleColorblind("Protanopia")
                                        }
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "Protanopia" === mode,
                                            },
                                        )}
                                    >
                                        Protanopia
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleColorblind("Deuteranopia")
                                        }
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "Deuteranopia" === mode,
                                            },
                                        )}
                                    >
                                        Deuteranopia
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleColorblind("Tritanopia")
                                        }
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "Tritanopia" === mode,
                                            },
                                        )}
                                    >
                                        Tritanopia
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleColorblind("Achromatopsia")
                                        }
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "Achromatopsia" === mode,
                                            },
                                        )}
                                    >
                                        Achromatopsia
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {/* <div className={Group.fd_group_1_button}>
                    <div className={Group.fd_group_1_button_content}>
                        <Image
                            width={30}
                            height={30}
                            src={Colorblind}
                            alt="Colorblind"
                        />

                        <span className={Button.fd_button_3_text}>Theme</span>
                    </div>
                    <div className={Dropdown.fd_dropdown_1}>
                        <div
                            onClick={() => setThemeMenu(!themeMenu)}
                            className={Dropdown.fd_dropdown_1_wrap}
                        >
                            <span className={Button.fd_button_3_text}>
                                {theme}
                            </span>
                        </div>
                        <button
                            className={Dropdown.fd_dropdown_1_button}
                            onClick={() => setThemeMenu(!themeMenu)}
                        >
                            <div
                                className={
                                    Dropdown.fd_dropdown_1_button_content
                                }
                            >
                                <DropdownArrow width={15} height={15} />
                            </div>
                        </button>
                        <AnimatePresence>
                            {themeMenu && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                    }}
                                    animate={{
                                        height: 185,
                                    }}
                                    exit={{
                                        height: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className={Dropdown.fd_dropdown_1_menu}
                                >
                                    <span
                                        onClick={() => setTheme("default")}
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "default" === theme,
                                            },
                                        )}
                                    >
                                        Default
                                    </span>
                                    <span
                                        onClick={() => setTheme("test")}
                                        className={clsx(
                                            Dropdown.fd_dropdown_1_menu_item,
                                            {
                                                [Dropdown.fd_dropdown_1_menu_selected]:
                                                    "test" === theme,
                                            },
                                        )}
                                    >
                                        Test
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div> */}

                <button
                    className={ModalStyle.fd_modal_2_card_close}
                    onClick={() => setVisibleSettings(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
