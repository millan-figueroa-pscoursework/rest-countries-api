import "./style.css";
import { fetchCountries } from "./api/countries";
import { APIError, CountryLoadError } from "./utils/errorHandler";
import type { Country } from "./models/interfaces";
import { handleDetail, renderDetail } from "./ui";

// Select DOM elements and add generic for type annotation
const controls = document.querySelector<HTMLSectionElement>("#controls")!;
const regionFilter = document.querySelector<HTMLSelectElement>("#region-filter")!;
const grid = document.querySelector<HTMLSectionElement>("#countries-grid")!;
const detailSection = document.querySelector<HTMLSectionElement>("#detail")!;
const detailCard = document.querySelector<HTMLDivElement>("#detail-card")!;
const backBtn = document.querySelector<HTMLButtonElement>("#back-btn")!;

let countries: Country[] = [];

// get country data from API
fetchCountries()
  .then(data => {
    // when data arrives, save fetched countries to countries variable
    countries = data;

    // display countries
    renderGrid(data);
    // activate region filter event listener AFTER data is fetched
    countriesFilter();
    handleDetail(
      controls,
      grid,
      detailSection,
      detailCard,
      backBtn,
      countries,
      renderDetail);
  })
  .catch(err => { // runs if fetching fails, shows custom messages depending on error type
    if (err instanceof APIError) {
      grid.innerHTML = `<p class="text-red-600">Server error (${err.statusCode})</p>`;
    }
    else if (err instanceof CountryLoadError) {
      grid.innerHTML = `<p class="text-red-600">Failed to load countries.</p>`;
    }
    else {
      grid.innerHTML = `<p class="text-red-600">Something went wrong.</p>`;
    }
    // prints error to console for debugging
    console.error(err);
  });



// ***FUNCTIONS TO FILTER COUTRIES

function countriesFilter() {
  // sets up event listener to listen for selected region
  regionFilter.addEventListener("change", applyFilters);
}

function applyFilters() {
  // reads selected value
  const region = regionFilter.value;
  let filtered = countries; // starts with ALL the countries

  // keep only countries that match the region
  if (region) {
    filtered = countries.filter(c => c.region === region);
  }

  // re-render grid with filter results
  renderGrid(filtered);
}


// ***FUNCTION TO RENDER FLAGS FETCHED FROM API

function renderGrid(list: Country[]) {
  grid.innerHTML = list
    // loops through each country and returns element for each item
    .map((country) => {
      // use png if available, or svg, or empty string so img tag dont break (? = optional chaining avoid crash)
      const flag = country.flags?.png || country.flags?.svg || "";
      const name = country.name.common; // gets official name
      const population = country.population.toLocaleString(); // formats raw number so it looks nice
      const region = country.region;
      const capital = country.capital?.[0] ?? "N/A"; // get first capital if it exists

      // render country cards and applies global styles
      return `
        <article class="bg-surface dark:bg-dmElement rounded-md shadow-sm hover:shadow-md transition
                    overflow-hidden cursor-pointer"
                    data-name="${name}">
          
          <img src="${flag}" alt="${name} flag" class="w-full h-40 object-cover" />
          
          <div class="px-6 py-6">
            <h2 class="font-bold text-lg mb-4">${name}</h2>

            <p class="text-sm mb-1">
              <span class="font-semibold">Population:</span> ${population}
            </p>
            <p class="text-sm mb-1">
              <span class="font-semibold">Region:</span> ${region}
            </p>
            <p class="text-sm">
              <span class="font-semibold">Capital:</span> ${capital}
            </p>
          </div>
        </article>
      `;
    })
    .join("");
}

