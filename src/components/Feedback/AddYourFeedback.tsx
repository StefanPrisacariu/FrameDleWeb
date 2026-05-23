"use client";
import "react-simple-toasts/dist/style.css";
import "react-simple-toasts/dist/theme/dark.css";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";

import FeedbackStyle from "@/styles/components/Feedback.module.scss";

toastConfig({
    theme: "dark",
    className: FeedbackStyle.fd_qa_toast,
    duration: 3000,
    clickClosable: true,
    maxVisibleToasts: 3,
});

const PLATFORM_OPTIONS = [
    {
        id: "android_app",
        label: "Android (App)",
    },

    {
        id: "android_web",
        label: "Android (Web)",
    },

    {
        id: "ios_web",
        label: "iOS (Web)",
    },

    {
        id: "desktop_web",
        label: "Desktop (Web)",
    },

    {
        id: "other",
        label: "Other",
    },
] as const;

const RATING_OPTIONS = [1, 2, 3, 4, 5] as const;

type FormData = {
    discoverSource: string;
    platforms: string[];
    rating: number;
    message: string;
};

type ApiResponse = {
    success: boolean;
    message: string;
};

const INITIAL_FORM: FormData = {
    discoverSource: "",
    platforms: [],
    rating: 0,
    message: "",
};

const submitFeedback = async (data: FormData): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/add-feedback`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    return response.data;
};

export const AddYourFeedback = () => {
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [someTimer, setSomeTimer] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: submitFeedback,

        onSuccess: () => {
            toast("Thank you for your feedback, Tenno!");

            setForm(INITIAL_FORM);
            setSomeTimer(true);
        },

        onError: () => {
            toast(
                axios.isAxiosError(mutation.error)
                    ? mutation.error.response?.data?.message ||
                          mutation.error.message
                    : "Unknown error",
            );
        },
    });

    const isFormValid = useMemo(() => {
        return (
            form.discoverSource.trim().length > 0 &&
            form.platforms.length > 0 &&
            form.rating > 0 &&
            form.message.trim().length > 0
        );
    }, [form]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    };

    const handlePlatformToggle = (platformId: string) => {
        setForm((prev) => {
            const exists = prev.platforms.includes(platformId);

            return {
                ...prev,
                platforms: exists
                    ? prev.platforms.filter((item) => item !== platformId)
                    : [...prev.platforms, platformId],
            };
        });
    };
    const handleRatingToggle = (ratingId: number) => {
        setForm((prev) => {
            return {
                ...prev,
                rating: ratingId,
            };
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        mutation.mutate(form);
    };

    useEffect(() => {
        if (!someTimer) {
            return;
        }

        const timeout = setTimeout(() => {
            setSomeTimer(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [someTimer]);

    return (
        <form className={FeedbackStyle.fd_qa_form} onSubmit={handleSubmit}>
            <p>
                If you want to report a but, or have any suggestions for further
                improvement of the game with fresh ideas and possibilities of
                content, you can use this form to send us your messages.
                <br /> We will only collect the answers sent this form, personal
                information such as email, name, device etc. will NOT be
                collected.
            </p>
            <div className={FeedbackStyle.fd_qa_group}>
                <label htmlFor="discoverSource">
                    How did you discover FrameDle.org?
                </label>

                <input
                    autoComplete="off"
                    id="discoverSource"
                    name="discoverSource"
                    type="text"
                    value={form.discoverSource}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={FeedbackStyle.fd_qa_group}>
                <label htmlFor="platforms">
                    On which platforms do you usually play?
                </label>
                <div className={FeedbackStyle.fd_qa_maps}>
                    {PLATFORM_OPTIONS.map((platform) => (
                        <label key={platform.id}>
                            <input
                                autoComplete="off"
                                type="checkbox"
                                checked={form.platforms.includes(platform.id)}
                                onChange={() =>
                                    handlePlatformToggle(platform.id)
                                }
                            />

                            {platform.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className={FeedbackStyle.fd_qa_group}>
                <label htmlFor="rating">
                    Did you enjoy FrameDle.org? Rate you experience from 1 to 5
                </label>

                <span className={FeedbackStyle.fd_qa_inline}>
                    (1 - not enjoyable, 5 - super enjoyable)
                </span>

                <div className={FeedbackStyle.fd_qa_maps}>
                    {RATING_OPTIONS.map((platform) => (
                        <label key={platform}>
                            <input
                                autoComplete="off"
                                type="radio"
                                checked={form.rating === platform}
                                onChange={() => handleRatingToggle(platform)}
                            />

                            {platform}
                        </label>
                    ))}
                </div>
            </div>

            <div className={FeedbackStyle.fd_qa_group}>
                <label htmlFor="message">
                    What is your message for us? Bug fixes, ideas, anything!
                </label>
                <span className={FeedbackStyle.fd_qa_inline}>
                    (This message will be visible for everyone on &quot;Public
                    Feedback&quot;)
                </span>

                <textarea
                    autoComplete="off"
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending || !isFormValid || someTimer}
            >
                {mutation.isPending ? "Submitting..." : "Submit Feedback"}
            </button>
        </form>
    );
};
