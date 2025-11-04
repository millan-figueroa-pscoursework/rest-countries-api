import type { Country } from "./models/interfaces";
import { fetchCodeLookup } from "./api/countries";

// ***UI FUNCTIONS

// *** Render Flags Grid

export function renderGrid(list: Country[], grid: HTMLElement) {
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
            <p class="text-sm">
              <span class="font-semibold">Capital:</span> ${capital}
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
            (c) => c.name.common === countryName
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
export async function renderDetail(
    country: Country,
    controls: HTMLElement,
    grid: HTMLElement,
    detailSection: HTMLElement,
    detailCard: HTMLDivElement,
    countries: Country[]
) {
    // hide grid and controls
    controls.hidden = true;
    grid.hidden = true;
    detailSection.hidden = false;

    // assigns available detail view fields to variables
    const flag = country.flags?.svg || country.flags?.png || "";
    const name = country.name.common;
    const nativeName =
        country.name.nativeName
            ? Object.values(country.name.nativeName)[0]?.common
            : name;
    const population = country.population.toLocaleString();
    const region = country.region || "N/A";
    const subRegion = country.subregion || "N/A";
    const capital = country.capital?.[0] ?? "N/A";
    const tld = country.tld?.[0] ?? "N/A";
    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map(c => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
            .join(", ")
        : "N/A";
    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

    // looks up border codes returned by api
    const codeLookup = await fetchCodeLookup(); // call once; later calls use cache

    const borders = country.borders ?? [];
    const borderItems = borders.map(code => ({
        code,
        name: codeLookup[code] ?? code// fallback to code if not found
    }));

    detailCard.innerHTML = `
    <div class="detail-container flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
      
      <!-- Flag -->
      <img src="${flag}" alt="${name} flag" class="w-full max-w-xl rounded shadow" />

      <!-- Text content -->
      <div class="flex flex-col gap-8 px-2 md:px-8 py-4 md:py-8">
        <h2 class="text-2xl md:text-3xl font-bold">${name}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-md leading-6">
          <div class="flex flex-col gap-2">
            <p><strong>Native Name:</strong> ${nativeName}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Sub Region:</strong> ${subRegion}</p>
            <p><strong>Capital:</strong> ${capital}</p>
          </div>

          <div class="flex flex-col gap-1">
            <p><strong>Top Level Domain:</strong> ${tld}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Languages:</strong> ${languages}</p>
          </div>
        </div>

        <!-- Border Countries -->
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <strong>Border Countries:</strong>
          <div class="flex flex-wrap gap-2 py-4">
            ${borderItems.length
            ? borderItems
                .map(
                    b => `
                        <button 
                          class="inline-flex items-center gap-2 rounded-md shadow-md ring-1 ring-black/5
          bg-surface dark:bg-dmElement
          text-lmText dark:text-surface
          hover:bg-lmBg dark:hover:bg-dmBg/60
          px-6 py-1 text-sm transition"
                          data-border="${b.code}">
                          ${b.name}
                        </button>`
                )
                .join("")
            : `<span class="opacity-70">None</span>`
        }
          </div>
        </div>
      </div>
    </div>
  `;

    // click to show that country's detail card
    detailCard
        .querySelectorAll<HTMLButtonElement>('button[data-border]')
        .forEach(btn => {
            btn.addEventListener("click", () => {
                const code = btn.getAttribute("data-border");
                if (!code) return;

                // find the matching country by name 
                const neighborName = codeLookup[code];
                if (!neighborName) return;

                const neighbor = countries.find(
                    c => c.name.common === neighborName
                );
                if (!neighbor) return;

                // show clicked border country's details
                void renderDetail(neighbor, controls, grid, detailSection, detailCard, countries);
            });
        });
}
