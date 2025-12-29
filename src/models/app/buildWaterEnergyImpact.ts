import type { Country } from "./Country";
import type { WaterEnergyImpact } from "./WaterEnergyImpact";
import seed from "../../data/waterEnergyImpactSeed.json";

type SeedRow = {
    countryCode: string;
    baselineWaterStress: WaterEnergyImpact["baselineWaterStress"];
    energyGridStrain: WaterEnergyImpact["energyGridStrain"];
    dataCenterWaterConflictRisk: WaterEnergyImpact["dataCenterWaterConflictRisk"];
};


const seedRows = seed as unknown as SeedRow[];

function buildSeedLookup(rows: SeedRow[]): Record<string, SeedRow> {
    const lookup: Record<string, SeedRow> = {};

    for (const row of rows) {
        if (lookup[row.countryCode]) {
            console.warn(`Duplicate seed row for countryCode: ${row.countryCode}`);
        }
        lookup[row.countryCode] = row;
    }

    return lookup;
}

const seedLookup = buildSeedLookup(seedRows);

export function buildWaterEnergyImpacts(countries: Country[]): WaterEnergyImpact[] {
    return countries.map((country) => {
        const row = seedLookup[country.code];

        return {
            country,
            baselineWaterStress: row?.baselineWaterStress ?? "unknown",
            energyGridStrain: row?.energyGridStrain ?? "unknown",
            dataCenterWaterConflictRisk: row?.dataCenterWaterConflictRisk ?? "unknown",
        };

    });
}
