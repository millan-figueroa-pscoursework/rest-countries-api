import type { Country } from "./models/interfaces";

// ***FUNCTIONS TO RENDER DETAILED VIEW

// function sets up country clicking through event delegation
export function handleDetail(
    grid: HTMLElement,
    backBtn: HTMLButtonElement,
    countries: Country[],
    renderDetail: (c: Country) => void
) {
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
export function renderDetail(country: Country) {
    console.log("Render details!!")
}