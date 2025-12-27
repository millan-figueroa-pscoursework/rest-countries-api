import type { Country } from "./Country";
import type { CountryImpact } from "./CountryImpact";
import seed from "../../data/countryImpactSeed.json";

type SeedRow = {
    countryCode: string;
    aiDataCenterPresence: CountryImpact["aiDataCenterPresence"];
    waterInsecurity: CountryImpact["waterInsecurity"];
    climateRisk: CountryImpact["climateRisk"];
    nationalDebtRisk: CountryImpact["nationalDebtRisk"];
    povertyRate: CountryImpact["povertyRate"];
    techRegulationStrength: CountryImpact["techRegulationStrength"];
};

// if ts complains here, change to: `seed as unknown as SeedRow[]`
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

export function buildCountryImpacts(countries: Country[]): CountryImpact[] {
    return countries.map((country) => {
        const row = seedLookup[country.code];

        return {
            country,
            aiDataCenterPresence: row?.aiDataCenterPresence ?? "unknown",
            waterInsecurity: row?.waterInsecurity ?? "unknown",
            climateRisk: row?.climateRisk ?? "unknown",
            nationalDebtRisk: row?.nationalDebtRisk ?? "unknown",
            povertyRate: row?.povertyRate ?? "unknown",
            techRegulationStrength: row?.techRegulationStrength ?? "unknown",
        };
    });
}
