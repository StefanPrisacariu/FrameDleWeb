"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { decodeStorage, encodeStorage } from "@/app/helpers/encoder";
import { getCurrentDailyId, getProgress } from "@/app/helpers/streakSystem";

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

const getTagsProgress = () => {
    const currentId = getCurrentDailyId();
    const lastPlayed = {
        daily: getProgress("daily").lastCompletedDailyId === currentId,
        ability: getProgress("ability").lastCompletedDailyId === currentId,
        emoji: getProgress("emoji").lastCompletedDailyId === currentId,
    };
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!raw) {
            return { daily: false, ability: false, emoji: false };
        }

        const decoded = decodeStorage(raw);

        const currentState = JSON.parse(decoded as string) as TagsState;

        const temp = {
            daily: lastPlayed.daily ? currentState.daily : false,
            ability: lastPlayed.ability ? currentState.ability : false,
            emoji: lastPlayed.emoji ? currentState.emoji : false,
        };

        return temp;
    } catch {
        return { daily: false, ability: false, emoji: false };
    }
};

export const TagsProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<TagsState>(getTagsProgress());

    useEffect(() => {
        try {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                encodeStorage(JSON.stringify(state)),
            );
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
