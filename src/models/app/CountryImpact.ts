import type { Country } from "./Country";

// assign levels to var
type Level = "low" | "medium" | "high" | "unknown";
type Strength = "strong" | "moderate" | "weak" | "unknown";


export interface CountryImpact {
    country: Country;

    // digital infrastructure
    aiDataCenterPresence: Level;

    // environmental conditions
    waterInsecurity: Level;
    climateRisk: Level;

    // econonic conditions
    nationalDebtRisk: Level;
    povertyRate: Level;

    // governance/ regulation
    techRegulationStrength: Strength;
}
