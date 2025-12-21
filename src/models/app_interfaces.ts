import type { Country } from "./api_interfaces";

interface CountryImpact {
    country: Country;

    dataCenterPresence: 'none' | 'low' | 'high';
    waterInsecurity: 'low' | 'medium' | 'high';
    climateRisk: 'low' | 'medium' | 'high';

    nationalDebtRisk: 'low' | 'medium' | 'high';
    povertyRate: 'low' | 'medium' | 'high';
    techRegulationStrength: 'weak' | 'moderate' | 'strong';
}
