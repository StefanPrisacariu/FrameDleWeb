import { useRef } from "react";

import useClipboard from "react-use-clipboard";

import Button from "@/styles/components/Button.module.scss";
import Icon from "@/styles/components/Icon.module.scss";
import Mod from "@/styles/components/Modal.module.scss";

import Share from "@/assets/svg/share-solid.svg";

interface ModalProps {
    guesses: WarframeEmojisCorrected[];
}

export const EmojiModal = ({ guesses }: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const generateMessage = () => {
        return `I guessed today's Warframe Emojis #FrameDle in ${guesses.length} ${
            guesses.length === 1 ? "try" : "tries"
        }\nframedle.org`;
    };

    const [copied, setCopied] = useClipboard(generateMessage(), {
        successDuration: 3000,
    });

    return (
        <div className={Mod.fd_modal_0}>
            <div className={Mod.fd_modal_0_mod} ref={ref}>
                <div className={Mod.fd_modal_0_mod_content}>
                    <p>
                        I guessed today&apos;s Warframe Emoji #FrameDle in{" "}
                        {guesses.length}{" "}
                        {guesses.length === 1 ? "try" : "tries"}
                    </p>
                    <button
                        onClick={() => {
                            setCopied();
                        }}
                        className={Button.fd_button_0}
                    >
                        <Share
                            width={20}
                            height={20}
                            className={Icon.fd_icon_fills_white}
                        />
                        <span id="share-button-text">
                            {copied ? "Copied" : "Share"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
