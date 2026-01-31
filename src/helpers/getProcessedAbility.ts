import { abilityIcon } from "@/app/helpers/abilityIcon";
import { initialAbilities } from "@/app/lib/abilities";

const FALLBACK_WARFRAME = "Unknown Warframe";
const FALLBACK_ABILITY = "Unknown Ability";
const FALLBACK_ICON = abilityIcon("default");

export function getProcessedAbility(api: AbilityToday): ProcessedAbility {
    const today = initialAbilities[api.warframe] ?? {
        warframeName: FALLBACK_WARFRAME,
        abilities: [],
    };

    const ability = today.abilities.find((a) => a.shortcut === api.ability) ?? {
        abilityName: FALLBACK_ABILITY,
        icon: "default",
    };

    const idx = Math.max(0, (api.variant || 1) - 1);

    const abilityName = Array.isArray(ability.abilityName)
        ? (ability.abilityName[idx] ??
          ability.abilityName[0] ??
          FALLBACK_ABILITY)
        : (ability.abilityName ?? FALLBACK_ABILITY);

    const iconKey = Array.isArray(ability.icon)
        ? (ability.icon[idx] ?? ability.icon[0] ?? "default")
        : (ability.icon ?? "default");

    return {
        warframeName: today.warframeName ?? FALLBACK_WARFRAME,
        abilityName,
        icon: abilityIcon(iconKey) ?? FALLBACK_ICON,
    };
}
