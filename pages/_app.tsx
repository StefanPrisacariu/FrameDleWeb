"use client";

import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { emojis } from "@/app/hooks/useLocalFonts";
import clsx from "clsx";
import QueryClientProviderWrapper from "@/app/lib/queryClient";
import { HydrationBoundary } from "@tanstack/react-query";

import Section from "@/styles/components/Section.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Header from "@/styles/components/Header.module.scss";
import Logo from "@/styles/components/Logo.module.scss";

import { CustomNavigator } from "@/app/components/CustomNavigator";
import { TagsProvider } from "@/app/context/TagsContext";
import { DailyProgress } from "@/app/components/DailyProgress";
import { useRouter } from "next/router";

import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { ColorblindProvider } from "@/app/context/ColorblindContext";
import { TitleLogo } from "@/app/components/Logos/TitleLogo";

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
