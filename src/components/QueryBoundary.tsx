'use client';

import { type ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export function QueryBoundary({ children }: { children: ReactNode }) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => (
                <div style={{ padding: '1rem', color: 'red' }}>
                    <p>Error: {error.message}</p>
                    <button onClick={() => resetErrorBoundary()}>Retry</button>
                </div>
            )}
        >
            {children}
        </ErrorBoundary>
    );
}
