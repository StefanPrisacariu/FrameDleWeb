import localFont from "next/font/local";

export const emojis = localFont({
    preload: true,
    weight: "400",
    style: "normal",
    display: "swap",
    variable: "--emojis",
    src: "../../assets/fonts/Noto_Color_Emoji/NotoColorEmoji-Regular.woff2",
});
