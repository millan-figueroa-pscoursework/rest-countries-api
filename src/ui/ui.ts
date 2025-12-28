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

  // click to show border country info
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>("[data-border-code]");
    if (!btn) return;

    console.log("Border button clicked");

    const code = btn.getAttribute("data-border-code");
    console.log("Border code:", code);

    if (!code) return;

    const nextCountry = countries.find(c => c.code === code);
    console.log("Found country:", nextCountry);

    if (!nextCountry) return;

    await renderDetail(nextCountry, controls, grid, detailSection, detailCard, countries);
  });

}


// *** Displays Country Details

// toggles detail view by hiding main grid and controls and renders the detail contents
export async function renderDetail(
  country: Country,
  controls: HTMLElement,
  grid: HTMLElement,
  detailSection: HTMLElement,
  detailCard: HTMLDivElement,
  countries: Country[]
) {
  // hide grid and controls, show details
  controls.hidden = true;
  grid.hidden = true;
  detailSection.hidden = false;

  // also hide impact table while in detail view
  const impactSection = document.getElementById("impact-table");
  if (impactSection) impactSection.hidden = true;

  // app-level fields only
  const flag = country.flagUrl;
  const name = country.displayName;

  const population = country.population.toLocaleString();
  const region = country.region || "N/A";
  const subRegion = country.subregion || "N/A";
  const capital = country.capital?.[0] ?? "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
      .map(c => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
      .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // borders
  const borders = country.borders ?? [];
  const codeLookup = await fetchCodeLookup();
  const borderItems = borders.map(code => ({
    code,
    name: codeLookup[code] ?? code
  }));

  detailCard.innerHTML = `
    <div class="grid gap-10 lg:grid-cols-[minmax(320px,520px)_1fr] items-start text-lmText dark:text-dmText">
      <div class="p-6">
        <img
          src="${flag}"
          alt=""
          class="w-full h-[260px] lg:h-80 object-cover rounded-xl
                 border border-lmInput/30 dark:border-dmText/10 shadow-sm"
        />
      </div>

      <div class="px-6">
        <h2 class="text-3xl font-extrabold mb-6">${name}</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <div class="text-sm text-lmInput dark:text-dmText/70">Population</div>
            <div class="font-semibold">${population}</div>
          </div>

          <div>
            <div class="text-sm text-lmInput dark:text-dmText/70">Region</div>
            <div class="font-semibold">${region}</div>
          </div>

          <div>
            <div class="text-sm text-lmInput dark:text-dmText/70">Sub Region</div>
            <div class="font-semibold">${subRegion}</div>
          </div>

          <div>
            <div class="text-sm text-lmInput dark:text-dmText/70">Capital</div>
            <div class="font-semibold">${capital}</div>
          </div>

          <div class="sm:col-span-2">
            <div class="text-sm text-lmInput dark:text-dmText/70">Currencies</div>
            <div class="font-semibold">${currencies}</div>
          </div>

          <div class="sm:col-span-2">
            <div class="text-sm text-lmInput dark:text-dmText/70">Languages</div>
            <div class="font-semibold">${languages}</div>
          </div>
        </div>

        ${borderItems.length
      ? `
          <div class="mt-8">
            <div class="text-sm font-semibold mb-3">Border Countries:</div>
            <div class="flex flex-wrap gap-2">
              ${borderItems
        .map(
          b => `
                <button
                  class="px-4 py-2 rounded-md border text-sm
                         bg-surface dark:bg-dmElement
                         border-lmInput/30 dark:border-dmText/10
                         hover:bg-lmBg/60 dark:hover:bg-dmBg/40 transition-colors"
                  data-border-code="${b.code}"
                  type="button"
                >
                  ${b.name}
                </button>
              `
        )
        .join("")}
            </div>
          </div>
        `
      : ""
    }
      </div>
    </div>
  `;
}

