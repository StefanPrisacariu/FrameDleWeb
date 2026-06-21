import { abilityIconNew } from "@/app/helpers/abilityIcon";

import { initialAbilities } from "@/app/lib/abilities";

const FALLBACK_WARFRAME = "Unknown Warframe";
const FALLBACK_ABILITY = "Unknown Ability";

export function getProcessedAbility(api: AbilityToday): ProcessedAbility {
    const today = initialAbilities[api.warframe] ?? {
        name: FALLBACK_WARFRAME,
        abilities: [],
    };

    const ability = today.abilities.find((a) => a.shortcut === api.ability) ?? {
        shortcut: 1,
        abilityName: FALLBACK_ABILITY,
        icon: "default",
    };

    const idx = Math.max(0, (api.variant || 1) - 1);

    const abilityName = Array.isArray(ability.abilityName)
        ? (ability.abilityName[idx] ??
          ability.abilityName[0] ??
          FALLBACK_ABILITY)
        : (ability.abilityName ?? FALLBACK_ABILITY);

    const owners = ability.owners ?? [today.name];

    return {
        name: today.name,
        abilityName,
        owners,
        icon: abilityIconNew(today.name, ability.shortcut, abilityName),
    };
}
