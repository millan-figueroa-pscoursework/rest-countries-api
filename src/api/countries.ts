import { APIError, CountryLoadError } from "../utils/errorHandler";
import type { Country, CountryCodeRow } from "../models/interfaces";

// rest api caps at 10 fields, calling cca3 (country codes) separately
const DISPLAY_FIELDS =
    "name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

// stores country data from ui and a lookup table for border codes
let cacheCountries: Country[] | null = null;

// *** Main Data Fetch ***

export async function fetchCountries(): Promise<Country[]> {
    if (cacheCountries) return cacheCountries;

    // looks for and returns cached version, else calls api for 10 fields 
    const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=${DISPLAY_FIELDS}`
    );
    if (!response.ok) throw new APIError("API request failed", response.status);
    try {
        // save results in variable
        cacheCountries = await response.json();
        return cacheCountries!;
    } catch {
        throw new CountryLoadError();
    }
}


// hold 'lookup' object intial value is null, avoids refetching on every click
let cacheCodeLookup: Record<string, string> | null = null;


// *** Second Data Fetch ***
// makes a small request and code -> name lookup
export async function fetchCodeLookup(): Promise<Record<string, string>> {
    if (cacheCodeLookup) return cacheCodeLookup;
    // second tiny call, only 2 fields
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name"
    );
    if (!response.ok) throw new APIError("API request failed", response.status);

    // annotate rows variable as an array where each item is an object with a cca3 string and a name object 
    const rows: CountryCodeRow[] = await response.json();

    // convert array into 'lookup object' to get country names from values
    const lookup: Record<string, string> = {};
    rows.forEach(r => {
        lookup[r.cca3] = r.name.common;
    });

    cacheCodeLookup = lookup;
    return cacheCodeLookup;
}

