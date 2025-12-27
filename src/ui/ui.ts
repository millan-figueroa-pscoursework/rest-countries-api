import type { Country } from "../models/app/Country";
import { fetchCodeLookup } from "../api/countries";

// ***UI FUNCTIONS

// *** Render Flags Grid

export function renderGrid(list: Country[], grid: HTMLElement) {
  grid.innerHTML = list
    // loops through each country and returns element for each item
    .map((country) => {
      const flag = country.flagUrl;
      const name = country.displayName;
      const population = country.population.toLocaleString();
      const region = country.region;

      // render country cards and applies global styles
      return `
        <article class="bg-surface dark:bg-dmElement rounded-md shadow-sm hover:shadow-md hover:bg-lmBg  dark:hover:bg-dmBg/60 transition
                    overflow-hidden cursor-pointer"
                    data-name="${name}">
          
          <img src="${flag}" alt="${name} flag" class="w-full h-40 object-cover" />
          
          <div class="px-6 pt-6 pb-8">
            <h2 class="font-bold text-lg mb-4">${name}</h2>

            <p class="text-sm mb-1">
              <span class="font-semibold">Population:</span> ${population}
            </p>
            <p class="text-sm mb-1">
              <span class="font-semibold">Region:</span> ${region}
            </p>
            
          </div>
        </article>
      `;
    })
    .join("");
}



// *** Toggles Dark/Light Mode

export function toggleTheme(themeToggleBtn: HTMLButtonElement) {
  themeToggleBtn.addEventListener("click", () => {
    // toggle dark class on <html>
    document.documentElement.classList.toggle("dark");
    // get icon element
    const icon = document.getElementById("theme-icon") as HTMLElement;
    // if dark mode, show filled moon, else outlined moon
    if (document.documentElement.classList.contains("dark")) {
      icon.setAttribute("name", "moon");
    } else {
      icon.setAttribute("name", "moon-outline");
    }
  });
}


// *** Setup Function to Render Details

// function sets up click behavior thru event delegation so every card doesn't need its own listener
export function handleDetail(
  // pass in params from main.ts
  controls: HTMLElement,
  grid: HTMLElement,
  detailSection: HTMLElement,
  detailCard: HTMLDivElement,
  backBtn: HTMLButtonElement,
  countries: Country[],
  // callback function that shows country deets
  renderDetail: (
    country: Country,
    controls: HTMLElement,
    grid: HTMLElement,
    detailSection: HTMLElement,
    detailCard: HTMLDivElement,
    countries: Country[]
  ) => void) {

  // remember scroll position before we jump into detail view
  let scrollPos = 0;

  // listens for clicks on the grid
  grid.addEventListener("click", (event) => {

    // finds clicked card from article w data-name
    const card = (event.target as HTMLElement).closest<HTMLElement>("article[data-name]");
    if (!card) return; // exit if no data name

    //get country name from dataset
    const countryName = card.dataset.name;
    if (!countryName) return;

    // find matching Country object
    const country = countries.find(
      (c) => c.displayName === countryName
    );
    if (!country) return;

    // save scroll position before switching views
    scrollPos = window.scrollY;

    void renderDetail(country, controls, grid, detailSection, detailCard, countries);
  });

  // back button takes user back to grid
  backBtn.addEventListener("click", () => {
    // show grid + controls again, hide detail
    controls.hidden = false;
    grid.hidden = false;
    detailSection.hidden = true;

    // restore scroll position to where user left off
    window.scrollTo({ top: scrollPos, behavior: "instant" as ScrollBehavior });
  });
}


// *** Displays Country Details

// toggles detail view by hiding main grid and controls and renders the detail contents
export function renderDetail(
  country: Country,
  controls: HTMLElement,
  grid: HTMLElement,
  detailSection: HTMLElement,
  detailCard: HTMLDivElement
) {
  // hide grid and controls
  controls.hidden = true;
  grid.hidden = true;
  detailSection.hidden = false;

  // app-level fields only
  const flag = country.flagUrl;
  const name = country.displayName;
  const population = country.population.toLocaleString();
  const region = country.region;

  detailCard.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <img
          src="${flag}"
          alt=""
          class="h-10 w-16 rounded-sm border"
        />
        <h2 class="text-2xl font-semibold">${name}</h2>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="opacity-70">Population</span>
          <div class="font-medium">${population}</div>
        </div>

        <div>
          <span class="opacity-70">Region</span>
          <div class="font-medium">${region}</div>
        </div>

        <div>
          <span class="opacity-70">Country Code</span>
          <div class="font-medium">${country.code}</div>
        </div>
      </div>
    </div>
  `;
}

