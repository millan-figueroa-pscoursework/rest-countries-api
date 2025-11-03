import { APIError, CountryLoadError } from "../utils/errorHandler";
import type { Country } from "../models/interfaces";


// ***FUNCTION TO FETCH DATA FROM API
export async function fetchCountries(): Promise<Country[]> {
    const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,bordercountries"
    );

    if (!response.ok) {
        throw new APIError(`API request failed`, response.status);
    }

    try {
        return await response.json();
    } catch {
        throw new CountryLoadError();
    }
}