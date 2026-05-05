// ColorblindProvider.tsx
import { getColorblindMode } from "@/app/helpers/colorblindStore";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type Ctx = {
    mode: ColorblindMode;
    setMode: (m: ColorblindMode) => void;
};

const ColorblindContext = createContext<Ctx>({
    mode: "Disabled",
    setMode: () => {},
});

const STORAGE_KEY = "colorblind-mode";

export function ColorblindProvider({ children }: { children: ReactNode }) {
    const cb = getColorblindMode();
    const [mode, setMode] = useState<ColorblindMode>(
        (cb as ColorblindMode) || "Disabled",
    );

    // hydrate
    useEffect(() => {
        const saved = localStorage.getItem(
            STORAGE_KEY,
        ) as ColorblindMode | null;
        if (saved) setMode(saved);
    }, []);

    // sync DOM + persist
    useEffect(() => {
        document.documentElement.setAttribute("data-colorblind", mode);
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    return (
        <ColorblindContext.Provider value={{ mode, setMode }}>
            {children}
        </ColorblindContext.Provider>
    );
}

export const useColorblind = () => useContext(ColorblindContext);
