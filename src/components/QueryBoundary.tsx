import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type ComponentType, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import Error from "@/styles/components/Error.module.scss";

interface QueryBoundaryProps {
    children: React.ReactNode;
    loadingFallback?: false | React.ReactNode;
    errorFallback?: false | ComponentType<FallbackProps>;
    errorFallbackParent?: ({
        children,
    }: {
        children: React.ReactNode;
    }) => React.ReactNode;
}

export const QueryBoundary = ({
    children,
    loadingFallback,
    errorFallback,
    errorFallbackParent,
}: QueryBoundaryProps) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={() => {
                        reset();
                    }}
                    FallbackComponent={
                        false === errorFallback
                            ? () => null
                            : errorFallback ??
                              (({ resetErrorBoundary }) => {
                                  const renderedChildren = (
                                      <div className={Error.error_0}>
                                          <div className={Error.error_0_title}>
                                              Something went wrong
                                          </div>

                                          <div
                                              className={Error.error_0_btn_wrap}
                                          >
                                              <button
                                                  type="button"
                                                  onClick={() => {
                                                      resetErrorBoundary();
                                                  }}
                                                  className={Error.error_0_btn}
                                              >
                                                  Try again
                                              </button>
                                          </div>
                                      </div>
                                  );

                                  if ("function" === typeof errorFallbackParent)
                                      return errorFallbackParent({
                                          children: renderedChildren,
                                      });

                                  return renderedChildren;
                              })
                    }
                >
                    <Suspense
                        fallback={
                            false === loadingFallback
                                ? null
                                : loadingFallback ?? <p>Loading...</p>
                        }
                    >
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};
