"use client";

import { NextSeo } from "next-seo";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import Loader from "@/styles/components/Loader.module.scss";
import {
    fetchTodaysWarframe,
    fetchYesterdayWarframe,
} from "@/app/lib/queries/warframe";
import { MainGame } from "@/app/components/DailyGames/MainGame";

export default function Home() {
    const {
        data: todaysWf,
        isLoading: todayLoading,
        isError: todayError,
    } = useQuery({
        queryKey: ["today"],
        queryFn: fetchTodaysWarframe,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
    });

    const {
        data: yesterdayWf,
        isLoading: yesterdayLoading,
        isError: yesterdayError,
    } = useQuery({
        queryKey: ["yesterday"],
        queryFn: fetchYesterdayWarframe,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        gcTime: 0,
    });

    const loading = todayLoading || yesterdayLoading;
    const error = todayError || yesterdayError;

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
                            url: "https://framedle.org/thumbnail.png",
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
            <h2 className="dont">Daily Mode</h2>
            {loading && (
                <div className={Loader.fd_loader_0}>
                    <OrbitProgress size="medium" color={"#FFFFFF"} />
                </div>
            )}
            {error && (
                <div className={Loader.fd_loader_0}>
                    <p className="networkError" style={{ textAlign: "center" }}>
                        There was a server error
                    </p>
                    <p className="networkError" style={{ textAlign: "center" }}>
                        Refresh the window or try again later
                    </p>
                </div>
            )}
            {todaysWf && yesterdayWf && (
                <MainGame todaysWf={todaysWf} yesterdayWf={yesterdayWf} />
            )}
        </>
    );
}
