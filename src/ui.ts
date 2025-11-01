import type { Country } from "./models/interfaces";

// ***UI FUNCTIONS

// function sets up click behavior thru event delegation so every card doesn't need its own listener
export function handleDetail(
    // pass in params from main.ts
    controls: HTMLSectionElement,
    grid: HTMLSectionElement,
    detailSection: HTMLSectionElement,
    detailCard: HTMLDivElement,
    backBtn: HTMLButtonElement,
    countries: Country[],
    // callback function that shows country deets
    renderDetail: (
        country: Country,
        controls: HTMLSectionElement,
        grid: HTMLSectionElement,
        detailSection: HTMLSectionElement,
        detailCard: HTMLDivElement,
    ) => void) {
    // listens for clicks on the grid
    grid.addEventListener("click", (event) => {
        // finds clicked card from article w data-name
        const card = (event.target as HTMLElement).closest<HTMLElement>("article[data-name]");
        if (!card) return; // exit if no data name

        //get country name from dataset
        const countryName = card.dataset.name;
        if (!countryName) return

        // find matching Country object
        const country = countries.find(
            (c) => c.name.common === countryName
        );
        if (!country) return;

        // send the Country data to renderDetail
        renderDetail(country, controls, grid, detailSection, detailCard);
    });
    // back button takes u back to grid
    backBtn.addEventListener("click", () => {
        location.reload();
    });
}


// toggles detail view by hiding main grid and controls and renders the detail contents
export function renderDetail(
    country: Country,
    controls: HTMLSectionElement,
    grid: HTMLSectionElement,
    detailSection: HTMLSectionElement,
    detailCard: HTMLDivElement
) { // hide grid and controls
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
    const currencies = country.currencies || "N/A";
    const languages = country.languages || "N/A";

    const borders = country.borders || [];

    detailCard.innerHTML = `
    <div class="detail-container flex flex-col lg:flex-row gap-16 items-start">
      
      <!-- Flag -->
      <img src="${flag}" alt="${name} flag" class="w-full max-w-xl rounded shadow" />

      <!-- Text content -->
      <div class="flex flex-col gap-8">
        <h2 class="text-3xl font-bold">${name}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-6">
          <div class="flex flex-col gap-1">
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
        <div class="flex flex-col md:flex-row md:items-center gap-3">
          <strong>Border Countries:</strong>
          <div class="flex flex-wrap gap-2">
            ${borders.length
            ? borders
                .map(
                    code => `
                <button 
                  class="border border-gray-300 dark:border-gray-700 px-4 py-1 rounded shadow-sm"
                  data-border="${code}">
                  ${code}
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
}