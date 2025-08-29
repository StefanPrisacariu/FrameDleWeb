/* eslint-disable react-hooks/exhaustive-deps */

import Close from "@/assets/svg/close-x.svg";
import Share from "@/assets/svg/share-solid.svg";
import useClipboard from "react-use-clipboard";
import { useRef, useEffect } from "react";

import Mod from "@/styles/components/Modal.module.scss";
import Button from "@/styles/components/Button.module.scss";

const emojiMapping = {
    different: "🟥",
    alike: "🟩",
    partial: "🟧",
    higher: "⬇️",
    lower: "⬆️",
};

const compareValues = (
    value: string | Polarities[] | Playstyle[],
    reference: string | Polarities[] | Playstyle[]
) => {
    if (Array.isArray(value) && Array.isArray(reference)) {
        const commonElements = value.filter((v) => reference.includes(v));
        if (
            commonElements.length === reference.length &&
            commonElements.length === value.length
        ) {
            return emojiMapping.alike;
        } else if (commonElements.length > 0) {
            return emojiMapping.partial;
        }
        return emojiMapping.different;
    }

    if (value === reference) return emojiMapping.alike;
    if (
        typeof value === "string" &&
        typeof reference === "string" &&
        value[0] === reference[0]
    )
        return emojiMapping.partial;

    return emojiMapping.different;
};

const compareFields = (obj: Warframe, reference: Warframe) => {
    let result = "";

    result += compareValues(obj.gender, reference.gender);
    result += compareValues(obj.primeUmbra, reference.primeUmbra);
    result += compareValues(obj.auraPolarity, reference.auraPolarity);
    result += compareValues(obj.playstyle, reference.playstyle);
    result += compareValues(obj.progenitorElement, reference.progenitorElement);

    if (obj.releaseYear === reference.releaseYear) {
        result += emojiMapping.alike;
    } else if (obj.releaseYear > reference.releaseYear) {
        result += emojiMapping.higher;
    } else {
        result += emojiMapping.lower;
    }

    return result;
};

interface ModalProps {
    todaysWf: Warframe;
    guesses: Warframe[];
    onClick: () => void;
}

export const Modal = ({ todaysWf, guesses, onClick }: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const generateMessage = () => {
        const grid = [...guesses]
            .slice(0, 5)
            .map((guess) => compareFields(guess, todaysWf))
            .join("\n");
        return `I guessed today's Warframe #FrameDle in ${guesses.length} ${
            guesses.length === 1 ? "try" : "tries"
        }\n${grid} \n ${
            guesses.length > 5 ? `+ ${guesses.length - 5} more` : ""
        } \n framedle.org`;
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
                        I guessed today&apos;s Warframe #FrameDle in{" "}
                        {guesses.length}{" "}
                        {guesses.length === 1 ? "try" : "tries"}
                    </p>
                    <div className={Mod.fd_modal_0_mod_content_guesses}>
                        {guesses.length > 0 &&
                            guesses.map((item, index) => {
                                return (
                                    <>
                                        {index < 5 && (
                                            <p
                                                className={
                                                    Mod.fd_modal_0_mod_content_guesses_guess
                                                }
                                            >
                                                {compareFields(item, todaysWf)}
                                            </p>
                                        )}
                                    </>
                                );
                            })}
                    </div>
                    {guesses.length > 5 && (
                        <p>{`+ ${guesses.length - 5} more`}</p>
                    )}

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
