import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { useLocalFonts } from '@/app/hooks/useLocalFonts';
import clsx from 'clsx';
import QueryClientProviderWrapper from '@/app/lib/queryClient';
import { HydrationBoundary } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
    const { variables } = useLocalFonts();
    return (
        <QueryClientProviderWrapper>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <main className={clsx(variables)}>
                    <Component {...pageProps} />
                </main>
            </HydrationBoundary>
        </QueryClientProviderWrapper>
    );
}
