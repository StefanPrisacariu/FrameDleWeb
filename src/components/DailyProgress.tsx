import { useEffect, useState } from "react";
import { useTags } from "@/app/context/TagsContext";
import Prog from "@/styles/components/Progress.module.scss";
import Image from "next/image";
import Link from "next/link";
import Checkmark from "@/assets/svg/green_checkmark.svg";

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
                <Link href="/warframe" className={Prog.fd_progress_image}>
                    <Image
                        width={30}
                        height={30}
                        src="/game_progress/warframe.webp"
                        alt="Progress Warframe"
                    />
                    {state.daily && (
                        <Checkmark
                            className={Prog.fd_progress_image_check}
                            width={20}
                            height={20}
                        />
                    )}
                </Link>

                <Link href="/ability" className={Prog.fd_progress_image}>
                    <Image
                        width={30}
                        height={30}
                        src="/game_progress/ability.webp"
                        alt="Progress Ability"
                    />
                    {state.ability && (
                        <Checkmark
                            className={Prog.fd_progress_image_check}
                            width={20}
                            height={20}
                        />
                    )}
                </Link>
                <Link href="/emoji" className={Prog.fd_progress_image}>
                    <Image
                        width={30}
                        height={30}
                        src="/game_progress/emoji.webp"
                        alt="Progress Emoji"
                    />
                    {state.emoji && (
                        <Checkmark
                            className={Prog.fd_progress_image_check}
                            width={20}
                            height={20}
                        />
                    )}
                </Link>
            </div>
        </div>
    );
};
