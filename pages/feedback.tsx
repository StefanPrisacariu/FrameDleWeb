"use client";

import { NextSeo } from "next-seo";

import { AddYourFeedback } from "@/app/components/Feedback/AddYourFeedback";
import { QuestionAnswer } from "@/app/components/Feedback/QuestionAnswer";
import Button from "@/styles/components/Button.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Section from "@/styles/components/Section.module.scss";
import clsx from "clsx";
import { useState } from "react";

function Feedback() {
    const [page, setPage] = useState("q&a");
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
                <div className={Button.fd_button_7}>
                    <button
                        className={clsx(Button.fd_button_7_button, {
                            [Button.fd_button_7_active]: page === "q&a",
                        })}
                        onClick={() => setPage("q&a")}
                    >
                        Public Feedback
                    </button>
                    <button
                        className={clsx(Button.fd_button_7_button, {
                            [Button.fd_button_7_active]: page === "feedback",
                        })}
                        onClick={() => setPage("feedback")}
                    >
                        Add Your Feedback
                    </button>
                </div>

                {/* {isLoading && (
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
            )} */}
                <section className={Section.fd_section_2}>
                    {page === "feedback" ? (
                        <AddYourFeedback />
                    ) : (
                        <QuestionAnswer />
                    )}
                </section>
            </div>
        </>
    );
}

export default Feedback;
