declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare namespace NodeJS {
    interface ProcessEnv {
        API: string;
        // ENV_API_SERVER: string;
        // ENV_API_TOKEN: string;
        // NEXT_PUBLIC_API_SERVER: string;
        // NEXT_PUBLIC_BASE_URL: string;
        // NEXT_PUBLIC_ENVIRONMENT: 'production' | 'staging';
        // NEXT_PUBLIC_EXTERNALS_ENABLED: string;
        // NEXT_PUBLIC_FASTLY_REFRESH: string;
    }
}

declare type Polarities =
    | "none"
    | "madurai"
    | "naramon"
    | "vazarin"
    | "zenurik"
    | "unairu"
    | "umbra"
    | "universal";

declare type Elements =
    | "impact"
    | "heat"
    | "cold"
    | "electricity"
    | "toxin"
    | "magnetic"
    | "radiation"
    | "slash";

declare type Playstyle =
    | "damage"
    | "stealth"
    | "crowd-control"
    | "support"
    | "survival";

declare type Ability = {
    shortcut: 1 | 2 | 3 | 4;
    abilityName: string | string[];
    icon: string | string[];
    owners?: string[];
};

declare type Warframe = {
    name: string;
    gender: string;
    primeUmbra: "standard" | "prime" | "umbra";
    auraPolarity: Polarities[];
    progenitorElement: Elements;
    releaseYear: number;
    image: string;
    playstyle: Playstyle[];
};

declare type WarframeWithImage = Warframe & { image: string };

declare type ProcessedAbility = {
    name: string;
    abilityName: string;
    icon: string;
    owners?: string[];
};

declare type AbilityToday = {
    ability: number;
    variant: number;
    warframe: number;
};

declare type AbilityYesterday = {
    warframe: number;
};

declare type WarframeAbility = {
    name: string;
    abilities: Ability[];
    image: string;
};

declare type WarframeOfTheDayResponse = {
    today: number;
    yesterday: number;
    dailyId: string;
    resetAt: string;
};

declare type AbilityOfTheDayResponse = {
    today: {
        warframe: number;
        ability: number;
        variant: number;
    };
    yesterday: number;
    dailyId: string;
    resetAt: string;
};

declare type EmojiOfTheDayResponse = {
    today: number;
    yesterday: number;
    dailyId: string;
    resetAt: string;
};

declare type WarframeEmojis = {
    name: string;
    emojis: string[];
    image: string;
};

declare type WarframeEmojisCorrected = {
    name: string;
    image: string;
};

declare type TagMode = "daily" | "ability" | "emoji";

declare type ColorblindMode =
    | "Disabled"
    | "Protanopia"
    | "Deuteranopia"
    | "Tritanopia"
    | "Achromatopsia";

//FEEDBACK

declare type QuestionCardProps = {
    id: string;

    dateTime: string;

    question: string;

    answer: string | null;

    liked: boolean;
};
