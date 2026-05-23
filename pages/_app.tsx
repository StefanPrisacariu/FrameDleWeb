"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import clsx from "clsx";
import { ThemeProvider } from "next-themes";

import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

import { CustomNavigator } from "@/app/components/CustomNavigator";
import { DailyProgress } from "@/app/components/DailyProgress";
import { TitleLogo } from "@/app/components/Logos/TitleLogo";

import { ColorblindProvider } from "@/app/context/ColorblindContext";
import { TagsProvider } from "@/app/context/TagsContext";

import { emojis } from "@/app/hooks/useLocalFonts";

import QueryClientProviderWrapper from "@/app/lib/queryClient";

import "@/styles/main.scss";

import Container from "@/styles/components/Container.module.scss";
import Header from "@/styles/components/Header.module.scss";
import Logo from "@/styles/components/Logo.module.scss";
import Section from "@/styles/components/Section.module.scss";

export default function App({ Component, pageProps }: AppProps) {
    const descriptor: string = useRouter().pathname;

    const allowed =
        descriptor === "/warframe" ||
        descriptor === "/ability" ||
        descriptor === "/emoji";
    return (
        <TagsProvider>
            <ThemeProvider defaultTheme="FrameDle">
                <ColorblindProvider>
                    <QueryClientProviderWrapper>
                        <HydrationBoundary state={pageProps.dehydratedState}>
                            <main
                                className={clsx(emojis.variable)}
                                style={{
                                    scrollBehavior: "smooth",
                                }}
                            >
                                <div className={Section.fd_section_0}>
                                    <div className={Container.fd_container_0}>
                                        <div
                                            id="logo"
                                            className={Header.fd_header_0}
                                        >
                                            <Link href={"/"}>
                                                <div className={Logo.fd_logo_0}>
                                                    <TitleLogo />
                                                </div>
                                            </Link>
                                            {allowed && <DailyProgress />}
                                        </div>
                                        <Component {...pageProps} />
                                        <CustomNavigator />
                                    </div>
                                </div>
                            </main>
                        </HydrationBoundary>
                    </QueryClientProviderWrapper>
                </ColorblindProvider>
            </ThemeProvider>
        </TagsProvider>
    );
}
