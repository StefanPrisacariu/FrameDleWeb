"use client";

import { useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import { OrbitProgress } from "react-loading-indicators";

import { AddYourFeedback } from "@/app/components/Feedback/AddYourFeedback";
import { QuestionAnswer } from "@/app/components/Feedback/QuestionAnswer";

import { fetchFeedbackPage } from "@/app/lib/queries/feedbackQueries";

import Button from "@/styles/components/Button.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Loader from "@/styles/components/Loader.module.scss";
import Section from "@/styles/components/Section.module.scss";

function Feedback() {
    const [page, setPage] = useState("q&a");

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["publicFeedback"],
        queryFn: ({ pageParam = 0 }) => fetchFeedbackPage(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        initialPageParam: 0,
        enabled: page === "q&a",
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    return (
        <>
            <NextSeo
                title="FrameDle Feedback"
                description="Read and share feedback about FrameDle."
                canonical="https://framedle.org/feedback"
                openGraph={{
                    url: "https://framedle.org/feedback",

                    title: "FrameDle Feedback",

                    description: "Read and share feedback about FrameDle.",

                    images: [
                        {
                            url: "https://framedle.org/thumbnail.webp",

                            width: 1200,

                            height: 630,

                            alt: "FrameDle Feedback",
                        },
                    ],

                    site_name: "FrameDle",
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
            />

            <h1>Welcome to FrameDle!</h1>

            <h2 className="dont">Feedback</h2>

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

                {isLoading && page === "q&a" && (
                    <div className={Container.fd_container_9}>
                        <div className={Loader.fd_loader_0}>
                            <OrbitProgress size="medium" color={"#f1f1f1"} />
                        </div>
                    </div>
                )}

                {isError && page === "q&a" && (
                    <div className={Loader.fd_loader_0}>
                        <p
                            className="networkError"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            There was a server error
                        </p>

                        <p
                            className="networkError"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Refresh the window or try again later
                        </p>
                    </div>
                )}

                <section className={Section.fd_section_2}>
                    <div
                        style={{
                            display: page === "feedback" ? "block" : "none",
                        }}
                    >
                        <AddYourFeedback />
                    </div>

                    <div
                        style={{
                            display: page === "q&a" ? "block" : "none",
                        }}
                    >
                        <QuestionAnswer
                            data={data}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Feedback;
