"use client";

import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { OrbitProgress } from "react-loading-indicators";

import Loader from "@/styles/components/Loader.module.scss";

import { AbilityGame } from "@/app/components/DailyGames/AbilityGame";
import { getProcessedAbility } from "@/app/helpers/getProcessedAbility";
import { getAbilityOfTheDay } from "@/app/lib/queries/apiQuery";

export default function Ability() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["ability"],
        queryFn: getAbilityOfTheDay,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
    });

    return (
        <>
            <NextSeo
                title="FrameDle - Guess the Warframe Ability of the Day"
                description="Test your Warframe knowledge! Can you guess the Warframe ability of the day using only clues? Challenge yourself daily with FrameDle’s ability mode!"
                canonical="https://framedle.org/ability"
                openGraph={{
                    url: "https://framedle.org/ability",
                    title: "FrameDle - Guess the Warframe Ability of the Day",
                    description:
                        "Think you know every Warframe ability? Guess the ability of the day with FrameDle’s new ability mode and prove your Tenno knowledge!",
                    site_name: "FrameDle",
                    type: "website",
                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",
                            width: 1200,
                            height: 630,
                            alt: "FrameDle Emoji Mode - Warframe Emoji Guessing Game",
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
                            "warframe, warframe game, warframe emoji, warframe emoji guessing game, framedle emoji mode, daily warframe emoji puzzle, tenno challenge, warframe wordle emoji, tennodle abilities, guess warframe emoji, warframe daily emoji quiz, frame guessing",
                    },
                ]}
            />

            <h1>Welcome to FrameDle!</h1>
            <h2 className="dont">Emoji Mode</h2>

            {isLoading && (
                <div className={Loader.fd_loader_0}>
                    <OrbitProgress size="medium" color={"#f1f1f1"} />
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
                <AbilityGame
                    todaysWf={getProcessedAbility(data.today)}
                    yesterdayWf={data.yesterday}
                />
            )}
        </>
    );
}
