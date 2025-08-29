import { abilityIcon } from "@/app/helpers/abilityIcon";
import { initialAbilities } from "@/app/lib/abilities";

export function getProcessedAbility(
    api: AbilityToday
): ProcessedAbility | null {
    const today = initialAbilities[api.warframe];
    if (!today) {
        return null;
    }

    const ability = today.abilities.find(
        (a) => a.shortcut === api.ability
    ) as Ability;
    if (!ability) {
        return null;
    }

    let abilityName: string;
    let icon: string;

    if (Array.isArray(ability.abilityName) && Array.isArray(ability.icon)) {
        const idx = Math.max(0, api.variant - 1);
        abilityName =
            ability.abilityName[idx] ?? (ability.abilityName[0] as string);
        icon = abilityIcon(ability.icon[idx] ?? (ability.icon[0] as string));
    } else if (
        typeof ability.abilityName === "string" &&
        typeof ability.icon === "string"
    ) {
        abilityName = ability.abilityName;
        icon = abilityIcon(ability.icon);
    } else {
        return null;
    }

    return {
        warframeName: today.warframeName,
        abilityName,
        icon,
    };
}
