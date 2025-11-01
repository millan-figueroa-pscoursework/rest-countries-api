import type { Country } from "./models/interfaces";

// ***UI FUNCTIONS

// function sets up country clicking through event delegation
export function handleDetail(
    grid: HTMLElement,
    controls: HTMLElement,
    backBtn: HTMLButtonElement,
    detailSection: HTMLElement,
    detailCard: HTMLDivElement,
    countries: Country[],
    renderDetail: (
        country: Country,
        grid: HTMLElement,
        controls: HTMLElement,
        detailSection: HTMLElement,
        detailCard: HTMLDivElement
    ) => void) {
    // put listener on parent instead of adding to every card (bc cards are dynamically rendered)
    grid.addEventListener("click", (element) => {
        // find nearest element w data-name attribute
        const card = (element.target as HTMLElement).closest<HTMLElement>("article[data-name]");

        if (!card) return; // exit if no data

        // get country name from the cards h2
        const name = card.querySelector("h2")?.textContent?.trim();
        if (!name) return;

        const country = countries.find(c => c.name.common === name);
        if (country) {
            renderDetail(country, grid, controls, detailSection, detailCard);
        }
    });

    // back button to exit detail view
    backBtn.addEventListener("click", () => {
        location.reload();
    });
}


// toggles to detail view and renders the detail contents
export function renderDetail(
    country: Country,
    grid: HTMLElement,
    controls: HTMLElement,
    detailSection: HTMLElement,
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