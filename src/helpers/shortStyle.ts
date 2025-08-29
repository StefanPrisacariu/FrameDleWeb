export function getPlaystylesShortLabels(playstyles: Playstyle[]): string {
    const map: Record<Playstyle, string> = {
        damage: "DMG",
        stealth: "STL",
        "crowd-control": "CC",
        support: "SUP",
        survival: "SRV",
    };

    return playstyles.map((playstyle) => map[playstyle]).join(", ");
}
