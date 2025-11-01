export interface Flags {
    png: string;
    alt?: string;
    svg?: string;
}

export interface Name {
    common: string;
    official: string;
}

export interface Country {
    flags: Flags;
    name: Name;
    capital?: string[];
    population: number;
    region: string;
    subregion?: string;
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string }>;
    languages?: Record<string, string>;
    borders?: string[];
    cca3: string;
}
