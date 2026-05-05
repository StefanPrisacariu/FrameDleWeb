"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SettingsContextType = {
    visibleSettings: boolean;
    setVisibleSettings: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
    undefined,
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [visibleSettings, setVisibleSettings] = useState(false);

    return (
        <SettingsContext.Provider
            value={{ visibleSettings, setVisibleSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }
    return context;
};
