"use client";

import { NextSeo } from "next-seo";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";

import Loader from "@/styles/components/Loader.module.scss";

import { AbilityGame } from "@/app/components/DailyGames/AbilityGame";
import { getAbilityOfTheDay } from "@/app/lib/queries/apiQuery";
import { getProcessedAbility } from "@/app/helpers/getProcessedAbility";

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
                            url: "https://framedle.org/ability-thumbnail.png",
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
                <AbilityGame
                    todaysWf={getProcessedAbility(data.today)}
                    yesterdayWf={data.yesterday}
                />
            )}
        </>
    );
}
