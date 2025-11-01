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

        // read country name from the cards h2
        // const name = card.querySelector("h2")?.textContent?.trim();
        // if (!name) return; // exit if no name

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
) {
    controls.hidden = true;
    grid.hidden = true;
    detailSection.hidden = false;

    const flag = country.flags?.svg || country.flags?.png || "";
    const name = country.name.common;
    const population = country.population.toLocaleString();
    const region = country.region || "N/A";
    const capital = country.capital?.[0] ?? "N/A";

    detailCard.innerHTML = `
    <h2 class="text-amber-300">${flag}, ${name}, ${population}, ${region}, ${capital}</h2>`;
}