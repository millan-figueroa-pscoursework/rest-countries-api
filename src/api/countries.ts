import { APIError, handleAPIError } from "../utils/errorHandler";

const BASE_URL = "https://dummyjson.com/countries";

export async function fetchAllCountries() {
    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new APIError(`Error fetching countries.`, response.status);
        }

        const data = await response.json();
        console.log('DATA:', data);

        return data.countries;
    } catch (error: APIError | any) {
        handleAPIError(error);
    }
}