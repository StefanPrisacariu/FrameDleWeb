import { FeedbackLogo } from "@/app/components/Logos/FeedbackLogo";

import { renderApiText } from "@/app/helpers/regex";

import Card from "@/styles/components/Card.module.scss";

export const QuestionCard = ({
    dateTime,
    question,
    answer,
}: QuestionCardProps) => {
    const formatted = new Date(dateTime)
        .toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(",", " ");

    console.log(answer);
    return (
        <>
            {question && (
                <div className={Card.fd_card_2}>
                    <span>Date posted: {formatted}</span>

                    <p>{renderApiText(question)}</p>
                    {answer && (
                        <div className={Card.fd_card_2_quote}>
                            <div className={Card.fd_card_2_quote_logo}>
                                <FeedbackLogo size={20} />
                                <span>Dev: </span>
                            </div>

                            <blockquote>{renderApiText(answer)}</blockquote>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
