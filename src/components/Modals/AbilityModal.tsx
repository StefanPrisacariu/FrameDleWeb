import Share from "@/assets/svg/share-solid.svg";
import useClipboard from "react-use-clipboard";
import { useRef } from "react";

import Mod from "@/styles/components/Modal.module.scss";
import Button from "@/styles/components/Button.module.scss";

interface ModalProps {
    guesses: WarframeAbility[];
}

export const AbilityModal = ({ guesses }: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const generateMessage = () => {
        return `I guessed today's Ability #FrameDle in ${guesses.length} ${
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
