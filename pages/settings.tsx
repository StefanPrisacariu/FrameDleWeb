import { useEffect, useRef, useState } from "react";

import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";

import Image from "next/image";

import { ColorIndicators } from "@/app/components/ColorIndicators";
import { SettingsItemWithDropdown } from "@/app/components/SettingsItemWithDropdown";

import { useColorblind } from "@/app/context/ColorblindContext";

import Button from "@/styles/components/Button.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Group from "@/styles/components/Group.module.scss";
import Prog from "@/styles/components/Progress.module.scss";
import Section from "@/styles/components/Section.module.scss";
import Text from "@/styles/components/Text.module.scss";

import Colorblind from "@/assets/png/icons/Ionic_w.webp";
import Checkmark from "@/assets/svg/green_checkmark.svg";

type DropdownId = "theme" | "colorblind" | "language";

const ColorblindModes: ColorblindMode[] = [
    "Disabled",
    "Protanopia",
    "Deuteranopia",
    "Tritanopia",
    "Achromatopsia",
];

const Themes = [
    {
        name: "FrameDle",
        icon: "wallpapers/default-theme.webp",
    },
    {
        name: "Vitruvian",
        icon: "https://wiki.warframe.com/images/VitruvianTheme.png",
    },
    {
        name: "Legacy",
        icon: "https://wiki.warframe.com/images/LegacyTheme.png",
    },
    {
        name: "Equinox",
        icon: "https://wiki.warframe.com/images/EquinoxTheme.png",
    },
    {
        name: "Stalker",
        icon: "https://wiki.warframe.com/images/StalkerTheme.png",
    },
    {
        name: "POM2",
        icon: "https://wiki.warframe.com/images/POM-2Theme.png",
    },
];

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (id: DropdownId) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { mode, setMode } = useColorblind();

    const handleColorblind = (cb: ColorblindMode): void => {
        setMode(cb);
    };

    return (
        <>
            <NextSeo
                title="FrameDle - Settings | Customize Your Experience"
                description="Adjust your FrameDle experience. Manage themes, accessibility options, and gameplay preferences for the Warframe guessing game."
                canonical="https://framedle.org/settings"
                openGraph={{
                    url: "https://framedle.org/settings",
                    title: "FrameDle - Settings | Customize Your Experience",
                    description:
                        "Adjust your FrameDle experience. Manage themes, accessibility options, and gameplay preferences for the Warframe guessing game.",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Page Thumbnail",
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
                            "framedle settings, framedle customization, framedle theme settings, framedle accessibility, framedle preferences, warframe guessing game settings, framedle options",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <div className={Container.fd_container_5}>
                <h2
                    className={Text.fd_text_2_title}
                    style={{ textAlign: "center" }}
                >
                    Settings
                </h2>
                <section className={Section.fd_section_1} ref={wrapperRef}>
                    <SettingsItemWithDropdown
                        openDropdown={openDropdown}
                        toggleDropdown={() => toggleDropdown("colorblind")}
                        setting={"colorblind"}
                        title={"Colorblind Mode"}
                        dropdownItems={ColorblindModes}
                        value={mode}
                        functionToUse={(item: string) =>
                            handleColorblind(item as ColorblindMode)
                        }
                    />

                    <div style={{ alignSelf: "center", width: 300 }}>
                        <ColorIndicators />
                    </div>

                    <div className={Group.fd_group_5_button}>
                        <div className={Group.fd_group_5_button_content}>
                            <Image
                                width={30}
                                height={30}
                                src={Colorblind}
                                alt="Colorblind"
                            />

                            <span className={Button.fd_button_3_text}>
                                Theme
                            </span>
                        </div>
                    </div>
                    <div className={Group.fd_group_6}>
                        {Themes.map((item) => (
                            <div
                                key={item.name}
                                className={Group.fd_group_6_item}
                                onClick={() => setTheme(item.name)}
                            >
                                <Image
                                    width={110}
                                    height={110}
                                    src={item.icon}
                                    alt="Colorblind"
                                />
                                <span>{item.name}</span>
                                {item.name === theme && (
                                    <Checkmark
                                        className={Prog.fd_progress_2}
                                        width={20}
                                        height={20}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
