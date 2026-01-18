"use client";

import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { useLocalFonts } from "@/app/hooks/useLocalFonts";
import clsx from "clsx";
import QueryClientProviderWrapper from "@/app/lib/queryClient";
import { HydrationBoundary } from "@tanstack/react-query";

import Section from "@/styles/components/Section.module.scss";
import Container from "@/styles/components/Container.module.scss";
import Header from "@/styles/components/Header.module.scss";
import Logo from "@/styles/components/Logo.module.scss";
import LogoBaban from "@/assets/svg/title-logo.svg";
import { CustomNavigator } from "@/app/components/CustomNavigator";

export default function App({ Component, pageProps }: AppProps) {
    const { variables } = useLocalFonts();
    return (
        <QueryClientProviderWrapper>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <main
                    className={clsx(variables)}
                    style={{ scrollBehavior: "smooth" }}
                >
                    <div className={Section.fd_section_0}>
                        <div className={Container.fd_container_0}>
                            <div id="logo" className={Header.fd_header_0}>
                                <LogoBaban className={Logo.fd_logo_0} />
                            </div>
                            <Component {...pageProps} />
                            <CustomNavigator />
                        </div>
                    </div>
                </main>
            </HydrationBoundary>
        </QueryClientProviderWrapper>
    );
}
