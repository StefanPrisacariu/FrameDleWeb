"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";
import { checkResetNeeded } from "@/app/helpers/resetCheck";

type TagMode = "daily" | "ability" | "emoji";

type TagsState = {
    daily: boolean;
    ability: boolean;
    emoji: boolean;
};

type TagsContextType = {
    state: TagsState;
    updateState: (mode: TagMode, value: boolean) => void;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "FD_TAGS_STATE";

export const TagsProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<TagsState>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

                let parsed: TagsState = {
                    daily: false,
                    ability: false,
                    emoji: false,
                };

                if (saved) {
                    try {
                        const temp = JSON.parse(saved);

                        if (
                            typeof temp === "object" &&
                            temp !== null &&
                            "daily" in temp &&
                            "ability" in temp &&
                            "emoji" in temp &&
                            typeof temp.daily === "boolean" &&
                            typeof temp.ability === "boolean" &&
                            typeof temp.emoji === "boolean"
                        ) {
                            parsed = temp as TagsState;
                        }
                    } catch {
                        // ignore bad JSON
                    }
                }

                const resetTimeDaily = checkResetNeeded("FD_DAILY_STREAK_TIME");
                const resetTimeAbility = checkResetNeeded(
                    "FD_ABILITY_STREAK_TIME",
                );
                const resetTimeEmoji = checkResetNeeded("FD_EMOJI_STREAK_TIME");

                return {
                    daily: resetTimeDaily >= 24 ? false : parsed.daily,
                    ability: resetTimeAbility >= 24 ? false : parsed.ability,
                    emoji: resetTimeEmoji >= 24 ? false : parsed.emoji,
                };
            } catch {
                return { daily: false, ability: false, emoji: false };
            }
        }

        return { daily: false, ability: false, emoji: false };
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        } catch {
            // fail silently
        }
    }, [state]);

    const updateState = (mode: TagMode, value: boolean) => {
        setState((prev) => ({
            ...prev,
            [mode]: value,
        }));
    };

    const contextValue = useMemo(() => ({ state, updateState }), [state]);

    return (
        <TagsContext.Provider value={contextValue}>
            {children}
        </TagsContext.Provider>
    );
};

export const useTags = (): TagsContextType => {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error("useTags must be used within a TagsProvider");
    }
    return context;
};
