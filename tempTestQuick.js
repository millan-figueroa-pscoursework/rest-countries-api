import fetch from "node-fetch";

// Minimal app-level transformer for testing
const toCountry = (api) => ({
  name: api.name.common,
  flags: api.flags,
  population: api.population,
  region: api.region,
  subregion: api.subregion || "",
  capital: api.capital || [],
  tld: api.tld || [],
  currencies: api.currencies || {},
  languages: api.languages || {},
  borders: api.borders || [],
  cca3: api.cca3,
});

const DISPLAY_FIELDS =
  "name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

(async () => {
  try {
    // fetch raw API countries
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=${DISPLAY_FIELDS}`
    );
    if (!response.ok) throw new Error("API request failed");
    const apiCountries = await response.json();

    // map to app-level Country
    const countries = apiCountries.map(toCountry);

    console.log(countries.slice(0, 5)); // first 5 countries
  } catch (err) {
    console.error(err);
  }
})();
