import type { Country } from "./Country";

export interface WaterEnergyImpact {
    country: Country;

    baselineWaterStress: "low" | "medium" | "high" | "unknown";
    energyGridStrain: "low" | "medium" | "high" | "unknown";
    dataCenterWaterConflictRisk: "low" | "medium" | "high" | "unknown";
}
