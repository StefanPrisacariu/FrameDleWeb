"use client";

import { MainMenu } from "@/app/components/MainMenu";
import { NextSeo } from "next-seo";

export default function Menu() {
    return (
        <>
            <NextSeo
                title="FrameDle – Daily Warframe Guessing Game for Tenno"
                description="Think you know Warframe? Guess the Warframe of the day using clues like abilities, gender, aura polarity, and unique traits. Test your Tenno knowledge daily!"
                canonical="https://framedle.org/"
                openGraph={{
                    url: "https://framedle.org/",
                    title: "FrameDle – Daily Warframe Guessing Game for Tenno",
                    description:
                        "Guess the Warframe of the day using in-game clues. A daily challenge for true Tenno.",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle – Daily Warframe Guessing Game",
                        },
                    ],
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
                additionalMetaTags={[
                    {
                        name: "robots",
                        content: "index, follow",
                    },
                    {
                        name: "keywords",
                        content:
                            "warframe, warframe game, warframe guessing game, framedle, tenno, warframe challenge, daily warframe puzzle, warframedle, warframe wordle, tenno warframe wordle, tennodle, warframe quiz, guess the warframe, daily warframe challenge",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Menu</h2>
            <MainMenu />
        </>
    );
}
