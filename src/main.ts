import "./style.css";
import { fetchCountries } from "./api/countries";
import { APIError, CountryLoadError } from "./utils/errorHandler";
import type { Country } from "./models/api/api_interfaces";
import { handleDetail, renderDetail, toggleTheme, renderGrid } from "./ui";

// Select DOM elements and type annotate
const themeToggleBtn = document.querySelector("#theme-toggle-btn") as HTMLButtonElement;
const controls = document.querySelector("#controls") as HTMLElement;
const searchInput = document.querySelector("#search-input") as HTMLInputElement;
const regionFilter = document.querySelector("#region-filter") as HTMLSelectElement;
const grid = document.querySelector("#countries-grid") as HTMLElement;
const detailSection = document.querySelector("#detail") as HTMLElement;
const detailCard = document.querySelector("#detail-card") as HTMLDivElement;
const backBtn = document.querySelector("#back-btn") as HTMLButtonElement;


let countries: Country[] = [];


// *** Fetch Country Data from API

fetchCountries()
  .then(data => {
    // when data arrives, save fetched countries to countries variable
    countries = data;

    // display countries
    renderGrid(data, grid);

    // call functions after data is fetched
    countriesSearch();
    countriesFilter();
    toggleTheme(themeToggleBtn);
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


// *** Setup Search Function

function countriesSearch() {
  // sets up event listener to listen for selected region
  searchInput.addEventListener("change", applySearch);
}

// *** Setup Search Function

function applySearch() {
  // reads input value, removes spaces 
  const input = searchInput.value.trim().toLowerCase();

  // use filter to loop thru countries array and compare input to country name 
  const result = countries.filter(country =>
    country.name.common.toLowerCase().includes(input)
  );
  // console.log(result);
  renderGrid(result, grid)
}


// *** Setup Filter Function

function countriesFilter() {
  // sets up event listener to listen for selected region
  regionFilter.addEventListener("change", applyFilters);
}

// *** Filters Based on Region

function applyFilters() {
  // reads selected value
  const region = regionFilter.value;
  let filtered = countries; // starts with ALL the countries

  // keep only countries that match the region
  if (region) {
    filtered = countries.filter(c => c.region === region);
  }

  // re-render grid with filter results
  renderGrid(filtered, grid);
}




