"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";

type TagMode = "daily" | "ability";

type TagsState = {
    daily: boolean;
    ability: boolean;
};

type TagsContextType = {
    state: TagsState;
    updateState: (mode: TagMode, value: boolean) => void;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "tagsState";

export const TagsProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<TagsState>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
                return saved
                    ? (JSON.parse(saved) as TagsState)
                    : { daily: false, ability: false };
            } catch {
                return { daily: false, ability: false };
            }
        }
        return { daily: false, ability: false };
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
