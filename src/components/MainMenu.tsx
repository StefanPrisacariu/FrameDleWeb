import { MenuCard, MenuSmallCard } from "@/app/components/MenuCard";

import Menu from "@/styles/components/Menu.module.scss";
import Text from "@/styles/components/Text.module.scss";

import Discord from "@/assets/png/discord-icon.webp";
import Google from "@/assets/png/google-play-icon.webp";
import Feedback from "@/assets/png/icons/Chem_w.webp";
import Infinite from "@/assets/png/icons/IconInfinite.webp";
import HowToPlay from "@/assets/png/icons/IconQuest.webp";
import Settings from "@/assets/png/icons/ReputationSmall.webp";
import Kofi from "@/assets/png/ko-fi-icon.webp";

const DailyModes = [
    {
        href: "/warframe",
        wallpaperSrc: "/wallpapers/wallpaper-warframe.webp",
        iconSrc: "/game_progress/warframe.webp",
        name: "Warframe",
    },
    {
        href: "/ability",
        wallpaperSrc: "/wallpapers/ability-icons.webp",
        iconSrc: "/game_progress/ability.webp",
        name: "Ability",
    },
    {
        href: "/emoji",
        wallpaperSrc: "/wallpapers/emojis.webp",
        iconSrc: "/game_progress/emoji.webp",
        name: "Emoji",
    },
];
const EndlessModes = [
    {
        href: "/endless/warframe",
        wallpaperSrc: "/wallpapers/wallpaper-warframe.webp",
        iconSrc: Infinite.src,
        name: "Warframe",
    },
    {
        href: "/endless/ability",
        wallpaperSrc: "/wallpapers/ability-icons.webp",
        iconSrc: Infinite.src,
        name: "Ability",
    },
    {
        href: "/endless/emoji",
        wallpaperSrc: "/wallpapers/emojis.webp",
        iconSrc: Infinite.src,
        name: "Emoji",
    },
];

const UtilityItems = [
    {
        href: "/info",
        iconSrc: HowToPlay.src,
        name: "How to Play",
    },
    {
        href: "/feedback",
        iconSrc: Feedback.src,
        name: "Feedback",
        cta: "New Feedback",
    },
    {
        href: "/settings",
        iconSrc: Settings.src,
        name: "Settings",
        cta: "Try New Themes!",
    },
    {
        href: "https://discord.gg/qqmr3Uz32f",
        iconSrc: Discord.src,
        name: "Discord",
        targetBlank: true,
    },
    {
        href: "https://play.google.com/store/apps/details?id=com.framedle",
        iconSrc: Google.src,
        name: "Google Play",
        targetBlank: true,
    },
    {
        href: "https://ko-fi.com/leokaiskarri",
        iconSrc: Kofi.src,
        name: "Ko-Fi",
        targetBlank: true,
    },
];

export const MainMenu = () => {
    return (
        <>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Daily Modes</h2>
                <div className={Menu.fd_menu_0_big_container}>
                    {DailyModes.map((item) => (
                        <MenuCard
                            key={item.name}
                            href={item.href}
                            wallpaperSrc={item.wallpaperSrc}
                            iconSrc={item.iconSrc}
                            name={item.name}
                        />
                    ))}
                </div>
            </div>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Endless Modes</h2>
                <div className={Menu.fd_menu_0_big_container}>
                    {EndlessModes.map((item) => (
                        <MenuCard
                            key={item.name}
                            href={item.href}
                            wallpaperSrc={item.wallpaperSrc}
                            iconSrc={item.iconSrc}
                            name={item.name}
                        />
                    ))}
                </div>
            </div>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Utility</h2>
                <div className={Menu.fd_menu_0_big_grid}>
                    {UtilityItems.map((item) => (
                        <MenuSmallCard
                            key={item.name}
                            href={item.href}
                            iconSrc={item.iconSrc}
                            name={item.name}
                            cta={item.cta}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
