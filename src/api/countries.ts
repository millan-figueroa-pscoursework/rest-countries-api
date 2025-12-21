import { APIError, CountryLoadError } from "../utils/errorHandler";
import type { ApiCountry, CountryCodeRow } from "../models/api/api_interfaces";
import type { Country } from "../models/app/Country";

// REST API caps at 10 fields
const DISPLAY_FIELDS =
    "name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

// Stores transformed countries for UI
let cacheCountries: Country[] | null = null;

// Stores code -> name lookup to avoid refetching
let cacheCodeLookup: Record<string, string> | null = null;

// *** Transform API country → app country ***
function toCountry(apiCountry: ApiCountry): Country {
    return {
        code: apiCountry.cca3,
        displayName: apiCountry.name.common,
        region: apiCountry.region,
        population: apiCountry.population,
        flagUrl: apiCountry.flags.svg ?? apiCountry.flags.png
    };
}

// *** Main Data Fetch ***
export async function fetchCountries(): Promise<Country[]> {
    if (cacheCountries) return cacheCountries;

    const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=${DISPLAY_FIELDS}`
    );
    if (!response.ok) throw new APIError("API request failed", response.status);

    try {
        const apiCountries: ApiCountry[] = await response.json();
        cacheCountries = apiCountries.map(toCountry); // transform API → app
        return cacheCountries;
    } catch {
        throw new CountryLoadError();
    }
}

// *** Second Data Fetch ***
// Makes a small request and builds code -> name lookup
export async function fetchCodeLookup(): Promise<Record<string, string>> {
    if (cacheCodeLookup) return cacheCodeLookup;

    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name"
    );
    if (!response.ok) throw new APIError("API request failed", response.status);

    const rows: CountryCodeRow[] = await response.json();

    const lookup: Record<string, string> = {};
    rows.forEach(r => {
        lookup[r.cca3] = r.name.common;
    });

    cacheCodeLookup = lookup;
    return cacheCodeLookup;
}

// test
(async () => {
    const countries = await fetchCountries();
    console.log(countries.slice(0, 5)); // first 5 countries
})();
