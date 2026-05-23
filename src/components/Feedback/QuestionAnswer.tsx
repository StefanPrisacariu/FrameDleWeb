import { useEffect } from "react";

import { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { OrbitProgress } from "react-loading-indicators";

import { QuestionCard } from "@/app/components/Feedback/QuestionCard";

import Container from "@/styles/components/Container.module.scss";
import Loader from "@/styles/components/Loader.module.scss";

type PublicFeedbackProps = {
    data:
        | InfiniteData<
              {
                  items: QuestionCardProps[];
                  nextOffset: number | null;
              },
              unknown
          >
        | undefined;

    fetchNextPage: () => void;

    hasNextPage: boolean;

    isFetchingNextPage: boolean;
};

export const QuestionAnswer = ({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: PublicFeedbackProps) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (!data) {
        return null;
    }

    return (
        <div>
            {data.pages.flatMap((page) =>
                page.items.map((item) => (
                    <QuestionCard key={item.id} {...item} />
                )),
            )}

            <div ref={ref} />

            {isFetchingNextPage && (
                <div className={Container.fd_container_9}>
                    <div className={Loader.fd_loader_0}>
                        <OrbitProgress size="medium" color={"#f1f1f1"} />
                    </div>
                </div>
            )}
        </div>
    );
};
