import Colorblind from "@/assets/png/icons/Ionic_w.webp";
import DropdownArrow from "@/assets/svg/arrow-down-gold.svg";
import Button from "@/styles/components/Button.module.scss";
import Dropdown from "@/styles/components/Dropdown.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Icon from "@/styles/components/Icon.module.scss";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Item {
    title: string;
    openDropdown: string | null;
    toggleDropdown: () => void;
    setting: string;
    dropdownItems: string[];
    value: string;
    functionToUse: (item: string | ColorblindMode) => void;
}

export const SettingsItemWithDropdown = ({
    openDropdown,
    toggleDropdown,
    setting,
    title,
    dropdownItems,
    value,
    functionToUse,
}: Item) => {
    return (
        <div className={Group.fd_group_5_button}>
            <div className={Group.fd_group_5_button_content}>
                <Image
                    width={30}
                    height={30}
                    src={Colorblind}
                    alt="Colorblind"
                />

                <span className={Button.fd_button_3_text}>{title}</span>
            </div>
            <div className={Dropdown.fd_dropdown_1}>
                <div onClick={() => toggleDropdown()}>
                    <div className={Dropdown.fd_dropdown_1_wrap}>
                        <span className={Button.fd_button_3_text}>{value}</span>
                    </div>
                    <button className={Dropdown.fd_dropdown_1_button}>
                        <div className={Dropdown.fd_dropdown_1_button_content}>
                            <DropdownArrow
                                width={15}
                                height={15}
                                className={Icon.fd_icon_fills_gold}
                            />
                        </div>
                    </button>
                </div>
                <AnimatePresence>
                    {openDropdown === setting && (
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
                            onClick={(e) => e.stopPropagation()}
                            className={Dropdown.fd_dropdown_1_menu}
                        >
                            {dropdownItems.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => functionToUse(item)}
                                    className={clsx(
                                        Dropdown.fd_dropdown_1_menu_item,
                                        {
                                            [Dropdown.fd_dropdown_1_menu_selected]:
                                                item === value,
                                        },
                                    )}
                                >
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
