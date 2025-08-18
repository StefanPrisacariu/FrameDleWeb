import { NextSeo } from "next-seo";

import { GuessRow } from "@/app/components/GuessRow";
import { initialWarframes } from "@/app/lib/warframes";
import Container from "@/styles/components/Container.module.scss";
import Text from "@/styles/components/Text.module.scss";
import Button from "@/styles/components/Button.module.scss";
import { TimerComponent } from "@/app/components/TimeComponent";

import KoFi from "@/assets/png/logo_white_stroke_small.webp";
import Image from "next/image";

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
                            url: "https://framedle.org/thumbnail.png",
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
            />
            <h1>How to Play</h1>
            <div className={Container.fd_container_5}>
                <h2 className={Text.fd_text_2_title}>How to play?</h2>
                <p className={Text.fd_text_2_def}>
                    In <span className={Text.fd_text_2_link}>Daily</span> mode
                    you have to guess today&apos;s warframe from Digital
                    Extreme&apos;s game &quot;Warframe&quot;. It changes every
                    24h. For Daily mode you also need an internet connection.
                </p>
                <p className={Text.fd_text_2_def}>
                    Next warframe in: <TimerComponent />
                </p>
                <p className={Text.fd_text_2_def}>
                    While in{" "}
                    <span className={Text.fd_text_2_link}>Endless</span> mode,
                    you can play as much as you want just by pressing the{" "}
                    <span className={Text.fd_text_2_link}>New Warframe</span>{" "}
                    button to reset the game, please note that the Endless mode
                    doesn&apos;t add to the Daily mode&apos;s Streak. Also, the
                    Endless mode doesn&apos;t require an internet connection, it
                    can be enjoyed whenever you want.
                </p>
                <p className={Text.fd_text_2_def}>
                    Simply type in the name of a warframe and it will reveal its
                    properties. The color of the tiles will change to show how
                    close your guess was to the warframe to find.
                </p>
                <p className={Text.fd_text_2_def}>
                    <span className="info-text blue-text">Green</span> indicates
                    the property is an exact match.
                </p>
                <p className={Text.fd_text_2_def}>
                    <span className="info-text red-text">Red</span> indicates
                    there is no overlap between your guess and the property.
                </p>
                <p className={Text.fd_text_2_def}>
                    <span className="info-text orange-text">Orange</span>{" "}
                    indicates there is a partial match between your guess and
                    the property.
                </p>
                <p className={Text.fd_text_2_def}>
                    ⬇️ ⬆️ With arrows, it also indicates if the answer property
                    is above or below your guess.
                </p>

                <p className={Text.fd_text_2_title}>Properties</p>
                <p className={Text.fd_text_2_def}>
                    Here is the details of each of the properties columns:
                </p>

                <p className="info-textLabel">Gender</p>
                <p className={Text.fd_text_2_def}>
                    Possible Values: Male, Female, Non Binary
                </p>
                <p className="info-textLabel">Variant</p>
                <p className={Text.fd_text_2_def}>
                    Possible Values: Standard, Prime, Umbra
                </p>
                <p className="info-textLabel">Aura Polarity</p>
                <p className={Text.fd_text_2_def}>
                    Possible Values: Madurai, Vazarin, Naramon, etc...
                </p>
                <p className="info-textLabel">Progenitor Element</p>
                <p className={Text.fd_text_2_def}>
                    Possible Values: Impact, Radiation, Cold, etc...
                </p>
                <p className="info-textLabel">Release Year</p>
                <p className={Text.fd_text_2_def}>
                    When the champion was released to be played.
                </p>

                <p className={Text.fd_text_2_title}>Example</p>
                <p className={Text.fd_text_2_def}>
                    Consider the correct answer is{" "}
                    <span className={Text.fd_text_2_link}>Excalibur Prime</span>
                    . If you enter{" "}
                    <span className={Text.fd_text_2_link}>Qorvex</span> these
                    properties will appear:
                </p>
                <div className="info-scroller">
                    <GuessRow
                        warframeGuess={
                            initialWarframes.find(
                                (item) => "Qorvex" === item.name
                            ) as Warframe
                        }
                        todayWarframe={
                            initialWarframes.find(
                                (item) => "Excalibur Prime" === item.name
                            ) as Warframe
                        }
                    />
                </div>

                <p className="info-textLabel">
                    Gender: <span className="info-text blue-text">Green</span>
                </p>
                <p className={Text.fd_text_2_def}>
                    It is an exact match, they are both male.
                </p>
                <p className="info-textLabel">
                    Prime / Umbra:{" "}
                    <span className="info-text red-text">Red</span>
                </p>
                <p className={Text.fd_text_2_def}>
                    It is not a match since Excalibur Prime is a Prime variant.
                </p>
                <p className="info-textLabel">
                    Aura Polarity:{" "}
                    <span className="info-text red-text">Red</span>
                </p>
                <p className={Text.fd_text_2_def}>
                    It is not a match since Excalibur Prime&apos;s aura polarity
                    is Madurai.
                </p>
                <p className="info-textLabel">
                    Progenitor Element:{" "}
                    <span className="info-text red-text">Red</span>
                </p>
                <p className={Text.fd_text_2_def}>
                    It is not a match since Excalibur Prime&apos;s progenitor
                    element is Electricity.
                </p>
                <p className="info-textLabel">
                    Release Year:{" "}
                    <span className="info-text red-text">Red</span> and down
                    arrow
                </p>
                <p className={Text.fd_text_2_def}>
                    Excalibur Prime&apos;s Release year is before 2023
                </p>
                <p className={Text.fd_text_2_def}>
                    If you enter Excalibur Prime, here is what would come up:
                </p>

                <div className="info-scroller">
                    <GuessRow
                        warframeGuess={
                            initialWarframes.find(
                                (item) => "Excalibur Prime" === item.name
                            ) as Warframe
                        }
                        todayWarframe={
                            initialWarframes.find(
                                (item) => "Excalibur Prime" === item.name
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
                                "https://sites.google.com/view/framedle/terms-of-service?authuser=0"
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
                                "https://sites.google.com/view/framedle/privacy-policy?authuser=0"
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
                    The icons and fonts used in FrameDle are sourced from
                    Warframe, and the captivating background image is courtesy
                    of a talented creator on{" "}
                    <span
                        className={Text.fd_text_2_link}
                        onClick={() =>
                            window.open(
                                "https://www.reddit.com/r/Warframe/comments/8xsta2/warframe_fortuna_mobile_wallpaper_i_made_thought/"
                            )
                        }
                    >
                        Reddit
                    </span>
                    , . We appreciate their contributions to making FrameDle
                    visually appealing.
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
                <button
                    className={Button.fd_button_6}
                    onClick={() =>
                        window.open("https://ko-fi.com/leokaiskarri")
                    }
                >
                    <Image width={200} src={KoFi} alt="kofi_logo" />
                </button>
            </div>
        </>
    );
}

export default Info;
