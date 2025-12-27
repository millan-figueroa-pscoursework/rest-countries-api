export interface Flags {
    png: string;
    svg?: string;
    alt?: string;
}

export interface NativeNameEntry {
    official: string;
    common: string;
}

export interface Name {
    common: string;
    official: string;
    nativeName?: Record<string, NativeNameEntry>;
}

export interface ApiCountry {
    flags: Flags;
    name: Name;
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string }>;
    languages?: Record<string, string>;
    borders?: string[];
    cca3: string;
}

export interface CountryCodeRow {
    cca3: string;
    name: {
        common: string;
    };
}
