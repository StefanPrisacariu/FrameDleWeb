"use client";

import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { OrbitProgress } from "react-loading-indicators";

import { EmojiGame } from "@/app/components/DailyGames/EmojiGame";

import { initialEmojis } from "@/app/lib/emojis";
import { getEmojiOfTheDay } from "@/app/lib/queries/apiQuery";

import Loader from "@/styles/components/Loader.module.scss";

export default function Emojis() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["emoji"],
        queryFn: getEmojiOfTheDay,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
        refetchInterval: 1000 * 60,
    });

    return (
        <>
            <NextSeo
                title="FrameDle - Guess the Warframe of the Day using Emojis"
                description="Test your Warframe knowledge! Can you guess the Warframe of the day using only emojis? Challenge yourself daily with FrameDle’s emoji mode!"
                canonical="https://framedle.org/emoji"
                openGraph={{
                    url: "https://framedle.org/emoji",
                    title: "FrameDle - Guess the Warframe Emoji of the Day",
                    description:
                        "Think you know every Warframe? Guess the warframe of the day with FrameDle’s new emoji mode and prove your Tenno knowledge!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Ability Mode - Warframe Ability Guessing Game",
                        },
                    ],
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "warframe, warframe game, warframe ability, warframe ability guessing game, framedle ability mode, daily warframe ability puzzle, tenno challenge, warframe wordle ability, tennodle abilities, guess warframe ability, warframe daily ability quiz, frame guessing",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Ability Mode</h2>

            {isLoading && (
                <div className={Loader.fd_loader_0}>
                    <OrbitProgress size="medium" color={"#FFFFFF"} />
                </div>
            )}
            {isError && (
                <div className={Loader.fd_loader_0}>
                    <p className="networkError" style={{ textAlign: "center" }}>
                        There was a server error
                    </p>
                    <p className="networkError" style={{ textAlign: "center" }}>
                        Refresh the window or try again later
                    </p>
                </div>
            )}
            {data && (
                <EmojiGame
                    todaysWf={initialEmojis[data.today] as WarframeEmojis}
                    yesterdayWf={
                        initialEmojis[data.yesterday] as WarframeEmojis
                    }
                    dailyId={data.dailyId}
                    resetAt={data.resetAt}
                />
            )}
        </>
    );
}
