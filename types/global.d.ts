declare module '*.module.scss' {
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

declare type Polarities = 'none' | 'madurai' | 'naramon' | 'vazarin' | 'zenurik' | 'unairu' | 'umbra' | 'universal';

declare type Elements = 'impact' | 'heat' | 'cold' | 'electricity' | 'toxin' | 'magnetic' | 'radiation';

declare type Playstyle = 'damage' | 'stealth' | 'crowd-control' | 'support' | 'survival';

declare type Ability = {
    shortcut: 1 | 2 | 3 | 4;
    abilityName: string | string[];
    icon: string;
};

declare type Warframe = {
    name: string;
    gender: string;
    primeUmbra: 'standard' | 'prime' | 'umbra';
    auraPolarity: Polarities[];
    progenitorElement: Elements;
    releaseYear: number;
    image: string;
    // playstyle: Playstyle[];
};

declare type WarframeAbility = {
    warframeName: string;
    abilities: Ability[];
};

declare type WarframeWithImage = Warframe & { image: string };
