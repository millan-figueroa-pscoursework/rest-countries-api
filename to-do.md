### 🎯 Users should be able to:

[x] See all countries from the API on the homepage<br>
[x] Search for a country using an `input` field<br>
[x] Filter countries by region<br>
[x] Click on a country to see more detailed information on a separate page<br>
[x] Click through to the border countries on the detail page<br>
[x] Back to list button functinality<br>
[x] Update moon icon on theme toggle<br>
[x] Toggle the color scheme between light and dark mode<br>
[x] Deploy to Vercel

### 📝Nexst steps

[x] Finish styling detail view<br>
[x] Fix currencies/ language render<br>
[x] Fix htmlelement annotation compiler issues<br>
[x] Fix back button styles and functionality so it goes back to list<br>
[x] Add border countries ui and functionality<br>
[x] Make search case insensitive<br>
[x] Type event param in handleDetails<br>
[x] Move renderGrid function to ui.ts
[x] Fix flag size in detail view<br>
[x] Fix styling in flag in container so it doesn't cut off<br>
[ ] Add padding in filter box<br>
[x] Add hover styles on flag cards and border countries<br>
[x] Fix spacing on mobile grid and details views<br>
[x] Fix text size on small view<br>
[ ] Answer reflections questions<br>

# Next Steps: Rest Countries API → Climate Justice / Activism App

- [ ] **Verify API fetch**

  - Use `tempTestQuick.js` to confirm we can get country data.
  - Ensure the app-level mapping (`toCountry`) works.

- [ ] **Create CountryImpact model**

  - Define a new TypeScript interface `CountryImpact`.
  - Include fields for the activism-related metrics we care about:
    - AI data centers
    - Water insecurity
    - High national debt
    - Weak tech regulation
    - Climate change impact
    - Poverty rate

- [ ] **Integrate CountryImpact with Country**

  - Add a property like `impact?: CountryImpact` to the app-level `Country` model.
  - Prepare to populate it with external datasets.

- [ ] **Find / gather datasets**

  - Collect data for each of the metrics.
  - Keep datasets in a consistent shape for easy mapping to countries.

- [ ] **Write data mappers**

  - Functions to merge raw dataset info into each `CountryImpact` object.
  - Handle missing data gracefully.

- [ ] **Test combined data**

  - Create a test script to fetch countries and attach impact data.
  - Log first few entries to verify correctness.

- [ ] **Start building UI / visualization**
  - Display countries with associated impact data.
  - Consider adding:
    - Maps of affected regions
    - Highlighting by metric (e.g., high debt, water insecurity)
    - Filter/sort functionality
