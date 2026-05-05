import Menu from "@/styles/components/Menu.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Card from "@/styles/components/Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import Infinite from "@/assets/png/icons/IconInfinite.webp";
import Feedback from "@/assets/png/icons/Chem_w.webp";
import Google from "@/assets/png/google-play-icon.webp";
import Discord from "@/assets/png/discord-icon.webp";
import Kofi from "@/assets/png/ko-fi-icon.webp";
import HowToPlay from "@/assets/png/icons/IconQuest.webp";
import Settings from "@/assets/png/icons/ReputationSmall.webp";
import { useSettings } from "@/app/context/SettingsContext";

export const MainMenu = () => {
    const { visibleSettings, setVisibleSettings } = useSettings();

    return (
        <>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Daily Modes</h2>
                <div className={Menu.fd_menu_0_big_container}>
                    <div className={Card.fd_card_0}>
                        <Link
                            href={"/warframe"}
                            className={Card.fd_card_0_wrap}
                        >
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/wallpaper-warframe.webp"
                                    alt="Artwork Warframe"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src="/game_progress/warframe.webp"
                                            alt="Icon Warframe"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Warframe
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={Card.fd_card_0}>
                        <Link href={"/ability"} className={Card.fd_card_0_wrap}>
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/ability-icons.webp"
                                    alt="Artwork Warframe Abilities"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src="/game_progress/ability.webp"
                                            alt="Icon Warframe Abilities"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Ability
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={Card.fd_card_0}>
                        <Link href={"/emoji"} className={Card.fd_card_0_wrap}>
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/emojis.webp"
                                    alt="Emoji Wallpaper"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src="/game_progress/emoji.webp"
                                            alt="Feedback"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Emoji
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Endless Modes</h2>
                <div className={Menu.fd_menu_0_big_container}>
                    <div className={Card.fd_card_0}>
                        <Link
                            href={"/endless/warframe"}
                            className={Card.fd_card_0_wrap}
                        >
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/wallpaper-warframe.webp"
                                    alt="Artwork Warframe"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={Infinite}
                                            alt="Icon Infinite"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Warframe
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={Card.fd_card_0}>
                        <Link
                            href={"/endless/ability"}
                            className={Card.fd_card_0_wrap}
                        >
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/ability-icons.webp"
                                    alt="Artwork Warframe Ability"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={Infinite}
                                            alt="Icon Infinite"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Ability
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={Card.fd_card_0}>
                        <Link
                            href={"/endless/emoji"}
                            className={Card.fd_card_0_wrap}
                        >
                            <div className={Card.fd_card_0_wrap_container}>
                                <Image
                                    width={700}
                                    height={394}
                                    src="/wallpapers/emojis.webp"
                                    alt="Emoji Wallpaper"
                                    className={
                                        Card.fd_card_0_wrap_container_img
                                    }
                                />
                                <div
                                    className={
                                        Card.fd_card_0_wrap_container_overlay
                                    }
                                >
                                    <span>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={Infinite}
                                            alt="Icon Infinite"
                                            className={
                                                Card.fd_card_0_wrap_container_overlay_infinite
                                            }
                                        />
                                        Emoji
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={Menu.fd_menu_0_section}>
                <h2 className={Text.fd_text_4}>Utility</h2>
                <div className={Menu.fd_menu_0_big_grid}>
                    <div className={Card.fd_card_1}>
                        <Link href={"/info"} className={Card.fd_card_1_card}>
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={500}
                                    height={500}
                                    src={HowToPlay}
                                    alt="Informations Icon"
                                    className={Card.fd_card_1_card_wrap_icon}
                                />
                            </div>
                            <span>How to Play</span>
                        </Link>
                    </div>
                    <div className={Card.fd_card_1}>
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdymNhRnpB4KHeGbSipdaSVTKss9KzrZHtxRope7uekQV8PMQ/viewform?usp=preview"
                            target="_blank"
                            className={Card.fd_card_1_card}
                        >
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={500}
                                    height={500}
                                    src={Feedback}
                                    alt="Feedback Icon"
                                    className={Card.fd_card_1_card_wrap_icon}
                                />
                            </div>
                            <span>Feedback</span>
                        </Link>
                    </div>
                    <div
                        onClick={() => {
                            setVisibleSettings(!visibleSettings);
                        }}
                        className={Card.fd_card_1}
                    >
                        <div className={Card.fd_card_1_card}>
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={500}
                                    height={500}
                                    src={Settings}
                                    alt="Settings Icon"
                                    className={Card.fd_card_1_card_wrap_icon}
                                />
                            </div>
                            <span>Settings</span>
                        </div>
                    </div>
                    <div className={Card.fd_card_1}>
                        <Link
                            href="https://discord.gg/qqmr3Uz32f"
                            target="_blank"
                            className={Card.fd_card_1_card}
                        >
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={719}
                                    height={512}
                                    src={Discord}
                                    alt="Discord Icon"
                                    className={
                                        Card.fd_card_1_card_wrap_icon_discord
                                    }
                                />
                            </div>
                            <span>Discord</span>
                        </Link>
                    </div>
                    <div className={Card.fd_card_1}>
                        <Link
                            href="https://play.google.com/store/apps/details?id=com.framedle"
                            target="_blank"
                            className={Card.fd_card_1_card}
                        >
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={500}
                                    height={500}
                                    src={Google}
                                    alt="Google Play Icon"
                                    className={Card.fd_card_1_card_wrap_icon}
                                />
                            </div>
                            <span>Google Play</span>
                        </Link>
                    </div>
                    <div className={Card.fd_card_1}>
                        <Link
                            href="https://ko-fi.com/leokaiskarri"
                            target="_blank"
                            className={Card.fd_card_1_card}
                        >
                            <div className={Card.fd_card_1_card_wrap}>
                                <Image
                                    width={1024}
                                    height={822}
                                    src={Kofi}
                                    alt="Ko-Fi Icon"
                                    className={
                                        Card.fd_card_1_card_wrap_icon_kofi
                                    }
                                />
                            </div>
                            <span>Ko-Fi</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
