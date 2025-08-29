/* eslint-disable react-hooks/exhaustive-deps */

import Close from "@/assets/svg/close-x.svg";
import Share from "@/assets/svg/share-solid.svg";
import useClipboard from "react-use-clipboard";
import { useRef, useEffect } from "react";

import Mod from "@/styles/components/Modal.module.scss";
import Button from "@/styles/components/Button.module.scss";

interface ModalProps {
    guesses: WarframeAbility[];
    onClick: () => void;
}

export const AbilityModal = ({ guesses, onClick }: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const generateMessage = () => {
        return `I guessed today's Ability #FrameDle in ${guesses.length} ${
            guesses.length === 1 ? "try" : "tries"
        }\nframedle.org`;
    };

    const [copied, setCopied] = useClipboard(generateMessage(), {
        successDuration: 3000,
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div className={Mod.fd_modal_0}>
            <div className={Mod.fd_modal_0_mod} ref={ref}>
                <div className={Mod.fd_modal_0_mod_content}>
                    <button onClick={onClick} className={Button.fd_button_4}>
                        <Close width={20} height={20} />
                    </button>
                    <p>
                        I guessed today&apos;s Ability #FrameDle in{" "}
                        {guesses.length}{" "}
                        {guesses.length === 1 ? "try" : "tries"}
                    </p>
                    <button
                        onClick={() => {
                            setCopied();
                        }}
                        className={Button.fd_button_0}
                    >
                        <Share width={20} height={20} />
                        <span id="share-button-text">
                            {copied ? "Copied" : "Share"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
