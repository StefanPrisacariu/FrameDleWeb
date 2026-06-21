import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useTags } from "@/app/context/TagsContext";

import Prog from "@/styles/components/Progress.module.scss";

import Checkmark from "@/assets/svg/green_checkmark.svg";

const Modes = [
    {
        href: "/warframe",
        imageSrc: "/game_progress/warframe.webp",
        name: "Warframe",
        state: "daily",
    },
    {
        href: "/ability",
        imageSrc: "/game_progress/ability.webp",
        name: "Ability",
        state: "ability",
    },
    {
        href: "/emoji",
        imageSrc: "/game_progress/emoji.webp",
        name: "emoji",
        state: "emoji",
    },
];

export const DailyProgress = () => {
    const { state } = useTags();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={Prog.fd_progress_0}>
            <div className={Prog.fd_progress_0_bar} />
            <div className={Prog.fd_progress_0_wrap}>
                {Modes.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={Prog.fd_progress_image}
                    >
                        <Image
                            width={30}
                            height={30}
                            src={item.imageSrc}
                            alt={`Progress ${item.name}`}
                        />
                        {state[item.state as TagMode] && (
                            <Checkmark
                                className={Prog.fd_progress_image_check}
                                width={20}
                                height={20}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
