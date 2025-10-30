import { fetchCountries } from "./api/countries";
import { APIError, CountryLoadError } from "./utils/errorHandler";

const grid = document.querySelector<HTMLDivElement>("#countries-grid")!;

fetchCountries()
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        if (err instanceof APIError) {
            grid.innerHTML = `<p class="text-red-600">Server error (${err.statusCode})</p>`;
        }
        else if (err instanceof CountryLoadError) {
            grid.innerHTML = `<p class="text-red-600">Failed to load countries.</p>`;
        }
        else {
            grid.innerHTML = `<p class="text-red-600">Something went wrong.</p>`;
        }

        console.error(err);
    });