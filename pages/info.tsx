"use client";

import { NextSeo } from "next-seo";

import Image from "next/image";
import Link from "next/link";

import { GuessRow } from "@/app/components/GuessContainers/GuessMain";

import { initialWarframes } from "@/app/lib/warframes";

import Card from "@/styles/components/Card.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Menu from "@/styles/components/Menu.module.scss";
import Text from "@/styles/components/Text.module.scss";

import Kofi from "@/assets/png/ko-fi-icon.webp";

type ModeConfig = {
    id: string;
    label: string;
    description: string;
    rules: string[];
};

const MODES: ModeConfig[] = [
    {
        id: "warframe",
        label: "Warframe",
        description: "Guess the daily warframe using property-based feedback.",
        rules: [
            "Each guess reveals attributes",
            "Compare against: Gender, Variant, Aura Polarity, Playstyle, Progenitor Element, Release Year",
        ],
    },
    {
        id: "ability",
        label: "Ability",
        description: "Guess the warframe that owns the daily ability.",
        rules: [
            "Ability icon split into 4 sections",
            "1 section visible initially",
            "+1 section per wrong guess",
            "Full icon after 3 wrong guesses",
            "Ability name revealed after 4 wrong guesses",
        ],
    },
    {
        id: "emoji",
        label: "Emoji",
        description: "Guess the daily warframe based on emoji clues.",
        rules: [
            "3–5 emojis total",
            "1 emoji visible initially",
            "+1 emoji per wrong guess",
        ],
    },
];

function Info() {
    return (
        <>
            <NextSeo
                title="FrameDle - How to Play | Info & Disclaimers"
                description="Learn how to play FrameDle! Get useful information, tips, and disclaimers to master the Warframe guessing game."
                canonical="https://framedle.org/info"
                openGraph={{
                    url: "https://framedle.org/info",
                    title: "FrameDle - How to Play | Info & Disclaimers",
                    description:
                        "Learn how to play FrameDle! Get useful information, tips, and disclaimers to master the Warframe guessing game.",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Info Page Thumbnail",
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
                            "framedle info, how to play framedle, framedle tutorial, framedle rules, framedle tips, warframe guessing game help, framedle disclaimers, warframe puzzle guide",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">How to Play & Disclaimers</h2>
            <div className={Container.fd_container_5}>
                <h2 className={Text.fd_text_2_title}>How to play?</h2>
                {MODES.map((mode) => (
                    <div key={mode.id}>
                        <p className={Text.fd_text_2_link}>{mode.label}</p>
                        <p className={Text.fd_text_2_def}>{mode.description}</p>
                        {mode.rules.map((rule, i) => (
                            <p key={i} className={Text.fd_text_2_def}>
                                • {rule}
                            </p>
                        ))}
                    </div>
                ))}

                <h2 className={Text.fd_text_2_title}>Game Types</h2>

                <p className={Text.fd_text_2_link}>Daily</p>
                <p className={Text.fd_text_2_def}>
                    One challenge per mode, resets every 24 hours.
                </p>
                <p className={Text.fd_text_2_def}>
                    Progress counts toward streak.
                </p>

                <p className={Text.fd_text_2_link}>Endless</p>
                <p className={Text.fd_text_2_def}>
                    Unlimited play across all modes.
                </p>
                <p className={Text.fd_text_2_def}>
                    Use “New Warframe / Ability / Emoji” to reset the current
                    mode.
                </p>
                <p className={Text.fd_text_2_def}>
                    No streak tracking. No daily progression impact.
                </p>
                <p className={Text.fd_text_2_def}>
                    Can function without internet.
                </p>

                <p className={Text.fd_text_2_title}>Example</p>
                <p className={Text.fd_text_2_def}>
                    Consider the correct answer is{" "}
                    <span className={Text.fd_text_2_link}>Trinity</span>. If you
                    enter{" "}
                    <span className={Text.fd_text_2_link}>Gara Prime</span>{" "}
                    these properties will appear:
                </p>
                <div className={Container.fd_container_6}>
                    <GuessRow
                        warframeGuess={
                            initialWarframes.find(
                                (item) => "Gara Prime" === item.name,
                            ) as Warframe
                        }
                        todayWarframe={
                            initialWarframes.find(
                                (item) => "Trinity" === item.name,
                            ) as Warframe
                        }
                    />
                </div>

                <p className={Text.fd_text_2_link}>
                    Gender:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--green)" }}
                    >
                        Green
                    </span>{" "}
                </p>
                <p className={Text.fd_text_2_def}>
                    It is an exact match, they are both female.
                </p>
                <p className={Text.fd_text_2_link}>
                    Variant:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--red)" }}
                    >
                        Red
                    </span>{" "}
                </p>
                <p className={Text.fd_text_2_def}>
                    It is not a match since Trinity is a Standard variant.
                </p>
                <p className={Text.fd_text_2_link}>
                    Aura Polarity:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--green)" }}
                    >
                        Green
                    </span>{" "}
                </p>
                <p className={Text.fd_text_2_def}>
                    It is a match, they both have Vazarin aura polarity.
                </p>
                <p className={Text.fd_text_2_link}>
                    Playstyle:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--orange)" }}
                    >
                        Orange
                    </span>{" "}
                </p>
                <p className={Text.fd_text_2_def}>
                    It is a partial match, they both have Survival playstyle,
                    but Trinity is also Support, while Gara Prime is Damage and
                    Crowd Control as well
                </p>
                <p className={Text.fd_text_2_link}>
                    Progenitor Element:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--green)" }}
                    >
                        Green
                    </span>{" "}
                </p>
                <p className={Text.fd_text_2_def}>
                    It is a match, they both have Cold progrnitor element
                </p>
                <p className={Text.fd_text_2_link}>
                    Release Year:{" "}
                    <span
                        className={Text.fd_text_2_link}
                        style={{ color: "var(--red)" }}
                    >
                        Red
                    </span>{" "}
                    and down arrow
                </p>
                <p className={Text.fd_text_2_def}>
                    Trinity&apos;s Release year is before 2012, while Gara Prime
                    was released in 2021
                </p>
                <p className={Text.fd_text_2_def}>
                    If you enter Trinity, here is what would come up:
                </p>

                <div className={Container.fd_container_6}>
                    <GuessRow
                        warframeGuess={
                            initialWarframes.find(
                                (item) => "Trinity" === item.name,
                            ) as Warframe
                        }
                        todayWarframe={
                            initialWarframes.find(
                                (item) => "Trinity" === item.name,
                            ) as Warframe
                        }
                    />
                </div>

                <p className={Text.fd_text_2_def}>Good Luck, Tenno!</p>
                <p className={Text.fd_text_2_def}> </p>
                <p className={Text.fd_text_2_def}> </p>
                <p className={Text.fd_text_2_def}> </p>

                <p className={Text.fd_text_2_title}>Disclaimer</p>
                <p className={Text.fd_text_2_def}>
                    FrameDle is a passion project created with the sole purpose
                    of providing entertainment to Warframe enthusiasts.
                    It&apos;s important to note that FrameDle and its developer
                    have no affiliation with{" "}
                    <span
                        className={Text.fd_text_2_link}
                        onClick={() =>
                            window.open("https://www.digitalextremes.com/")
                        }
                    >
                        Digital Extremes
                    </span>
                    , the creators of{" "}
                    <span
                        className={Text.fd_text_2_link}
                        onClick={() => window.open("https://www.warframe.com/")}
                    >
                        Warframe
                    </span>
                    . Rest assured, FrameDle respects your privacy and does not
                    collect any user data.
                </p>
                <p className={Text.fd_text_2_def}>
                    Our commitment to transparency extends to our{" "}
                    <span
                        className={Text.fd_text_2_link}
                        onClick={() =>
                            window.open(
                                "https://sites.google.com/view/framedle/terms-of-service?authuser=0",
                            )
                        }
                    >
                        Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span
                        className={Text.fd_text_2_link}
                        onClick={() =>
                            window.open(
                                "https://sites.google.com/view/framedle/privacy-policy?authuser=0",
                            )
                        }
                    >
                        Privacy Policy
                    </span>
                    , which are readily accessible through attached links. We
                    value your trust and want you to feel comfortable using our
                    app.
                </p>
                <p className={Text.fd_text_2_def}>
                    If you have any questions, feedback, or simply want to reach
                    out, you can contact us at{" "}
                    <span className={Text.fd_text_2_link}>
                        support@framedle.org
                    </span>
                    . Your input helps us improve and enhance the FrameDle
                    experience for everyone.
                </p>
                <p className={Text.fd_text_2_def}>
                    Lastly, if you enjoy using FrameDle and would like to show
                    your support, consider making a donation on Ko-Fi. Your
                    generosity helps us continue developing and maintaining
                    FrameDle for the Warframe community. Thank you for being a
                    part of the FrameDle journey!
                </p>
                <div
                    className={Menu.fd_menu_0_big_grid}
                    style={{ alignSelf: "center", marginTop: 20 }}
                >
                    <div></div>
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
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default Info;
