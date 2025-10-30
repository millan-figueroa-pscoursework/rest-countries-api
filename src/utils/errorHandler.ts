
export class APIError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

}

export class CountryLoadError extends Error {
    constructor(message = "Failed to load countries") {
        super(message);
        this.name = "CountryLoadError";
    }
}

export function handleAPIError(error: APIError) {
    if (error instanceof APIError) {
        console.error('API Error:', error.message, 'Status Code:', error.statusCode);
    } else {
        console.error('An unexpected error occurred:', error);
    }
}
