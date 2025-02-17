export type Warframe = {
    name: string;
    gender: string;
    primeUmbra: 'standard' | 'prime' | 'umbra';
    auraPolarity: Polarities[];
    progenitorElement: Elements;
    hasLeverian: boolean;
    releaseYear: number;
    image: string;
};

export type Polarities = 'none' | 'madurai' | 'naramon' | 'vazarin' | 'zenurik' | 'unairu' | 'umbra' | 'universal';

export type Elements = 'impact' | 'heat' | 'cold' | 'electricity' | 'toxin' | 'magnetic' | 'radiation';
