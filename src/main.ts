import "./style.css";
import { fetchCountries } from "./api/countries";
import { APIError, CountryLoadError } from "./utils/errorHandler";
import type { Country } from "./models/interfaces";

// Select DOM elements and add generic for type annotation
const grid = document.querySelector<HTMLDivElement>("#countries-grid")!;
const regionFilter = document.querySelector<HTMLSelectElement>("#region-filter")!;
const detailSection = document.querySelector<HTMLElement>("#detail")!;
const backBtn = document.querySelector<HTMLButtonElement>("#back-btn")!;
const detailCard = document.querySelector<HTMLDivElement>("#detail-card")!;
const controls = document.querySelector<HTMLElement>("#controls")!;


let countries: Country[] = [];

// get country data from API
fetchCountries()
  .then(data => {
    // when data arrives, save fetched countries to countries variable
    countries = data;

    // display countries
    renderGrid(data)
    // activate region filter event listener AFTER data is fetched
    countriesFilter()
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
    // loops through each country  and returns elemenent for each item
    .map((country) => {
      // use png if available, or svg, or empty string so img tag dont break (? = optional chaining)
      const flag = country.flags?.png || country.flags?.svg || "";
      const name = country.name.common; // gets official name
      const population = country.population.toLocaleString(); // formats raw number so it looks nice
      const region = country.region;
      const capital = country.capital?.[0] ?? "N/A"; // get first capital if it exists (? avoids crash) or show n/a

      // render country cards and applies global styles
      return `
        <div class="bg-surface dark:bg-dmElement rounded-md shadow-sm hover:shadow-md transition
                    overflow-hidden cursor-pointer">
          
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
        </div>
      `;
    })
    .join("");
}

// ***FUNCTIONS TO RENDER DETAILED VIEW

// function sets up country clicking through event delegation
function handleDetails() {
  // put listener on parent instead of adding to every card (bc cards are dynamically rendered)
  grid.addEventListener("click", (element) => {
    // find nearest element w data-name attribute
    const card = (element.target as HTMLElement).closest<HTMLElement>("article[data-name]");

    if (!card) return; // exit if no data

    // get country name from the cards h2
    const name = card.querySelector("h2")?.textContent?.trim();
    if (!name) return;

    const country = countries.find(c => c.name.common === name);
    if (country) renderDetail(country);
  });

  // back button to exit detail view
  backBtn.addEventListener("click", () => {
    location.reload();
  });
}

// Render detail placeholder func
function renderDetail(country: Country) {
  console.log("Render details!!")
}