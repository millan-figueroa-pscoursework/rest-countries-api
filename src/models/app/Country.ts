export interface Country {
    code: string;          // cca3
    displayName: string;   // name.common
    region: string;
    population: number;
    flagUrl: string;

    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string }>;
    languages?: Record<string, string>;

    borders?: string[];
}

