import "./style.css";
import { fetchCountries } from "./api/countries";
import { APIError, CountryLoadError } from "./utils/errorHandler";
import type { Country } from "./models/interfaces";

const grid = document.querySelector<HTMLDivElement>("#countries-grid")!;

fetchCountries()
  .then(data => {
    renderGrid(data)
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


// ***FUNCTION TO RENDER FLAGS FETCHED FROM API

function renderGrid(list: Country[]) {
  grid.innerHTML = list
    .map((country) => {
      const flag = country.flags?.png || country.flags?.svg || "";
      const name = country.name.common;
      const population = country.population.toLocaleString();
      const region = country.region;
      const capital = country.capital?.[0] ?? "N/A";

      return `
      <div class="bg-surface dark:bg-dmElement rounded-md shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">

        <img src="${flag}"
             alt="${name} flag"
             class="w-full h-40 object-cover" />

        <div class="px-6 py-6">
          <h2 class="font-bold text-lg mb-4">${name}</h2>

          <p class="text-sm mb-1">
            <span class="font-semibold">Population: </span>${population}
          </p>
          <p class="text-sm mb-1">
            <span class="font-semibold">Region: </span>${region}
          </p>
          <p class="text-sm">
            <span class="font-semibold">Capital: </span>${capital}
          </p>
        </div>
      </div>
    `;
    })
    .join("");
}