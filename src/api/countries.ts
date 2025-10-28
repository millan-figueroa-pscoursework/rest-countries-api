import { APIError, handleAPIError } from "../utils/errorHandler";

const BASE_URL = "https://restcountries.com/v3.1/all";

export async function fetchProducts(limit: number = 10) {
    try {

        const response = await fetch(`${BASE_URL}?limit=${limit}`);
        if (!response.ok) {
            throw new APIError(`Error fetching products.`, response.status);
        }

        const data = await response.json();
        console.log('DATA: ', data);
        return data.products;
    } catch (error: APIError | any) {
        handleAPIError(error);
    }
}