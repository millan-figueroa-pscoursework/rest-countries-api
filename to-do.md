### 🎯 Users should be able to:

[x] See all countries from the API on the homepage<br>
[x] Search for a country using an `input` field<br>
[x] Filter countries by region<br>
[x] Click on a country to see more detailed information on a separate page<br>
[x] Click through to the border countries on the detail page<br>
[x] Back to list button functinality<br>
[x] Update moon icon on theme toggle<br>
[x] Toggle the color scheme between light and dark mode<br>
[ ] Deploy to Netlify

### 📝Nexst steps

[x] Finish styling detail view<br>
[x] Fix currencies/ language render<br>
[x] Fix htmlelement annotation compiler issues<br>
[x] Fix back button styles and functionality so it goes back to list<br>
[x] Add border countries ui and functionality<br>
[x] Make search case insensitive<br>
[x] Type event param in handleDetails<br>
[x] Move renderGrid function to ui.ts
[ ] Fix styling in flag in container so it doesn't cut off<br>
[ ] Add hover styles on flag cards and border countries<br>
[ ] Fix spacing on mobile grid and details views<br>
[ ] Fix text size on small view<br>
[ ] Answer reflections questions<br>

### 📌 Project Requirements

#### [x] Responsive Design:

Ensure the application is fully responsive across various devices and screen sizes.

#### [x] API Integration:

Effectively integrate the specified API to fetch and display data dynamically.

#### [x] Interactivity:

Implement interactive elements such as search functionality, form validation, and dynamic content updates.

#### [x] Accessibility:

Follow best practices to make the application accessible to all users.

#### [x] Version Control:

Use Git for version control, with regular commits and a well-documented GitHub repository.

#### [x] Documentation:

Include a comprehensive README.md file detailing the project setup, features, and any additional notes.

## 📋 Submission Requirements

#### ☐ GitHub Repository:

Host your project on GitHub with all source code and assets.
Ensure the repository is public and includes a detailed README.md file.

#### ☐ Live Demo:

Deploy your application using a platform like GitHub Pages, Netlify, or Vercel.
Provide a link to the live demo in your README.md file.

#### ☐ Reflection Document:

Write a 200-300 word reflection discussing your development process, challenges faced, solutions implemented, and potential improvements.

- Interacting with static vs rendered elements
- Event delegation to be able to show country details view
- Installing the latest version of Tailwind, setting up global variables
- Separation of concerns (models, utilities, api)
- Using ts annotation for querySelector like <HTMLDivElement>. Its a generic which tells TypeScript that you're expecting the selected element to be an HTMLDivElement

1. main is the entry point. html structure does not live inside main.ts. html is the entry point Vite serves directly, main.ts only handles dynamic logic (rendering, fetching, data, interactivity)
2. Vite serves index.html as-is, finds script tag, compiles ts to js and injects it, that script manipulates the DOM
3. Anything we want to be static (headers, base layout, placeholders, meta tags) goes in index. Anything generated (like fetching countries and populating cards) happens inside main.ts. Rendering related goes in ui.ts. Separation of concerns.
4. Global css import works in either index.html or main.ts. To toggle dark theme have one source of truth.
5. Hit 10 field limit had to refactor api call. Refactor speeds up app, avoids hitting api rate lmits, avoids repeated downloads, faster UI (cached data), is cleaner than doing API calls per border click. Fixes the “border names don’t show up” and 400 error.
6. Record is a TS utility that lets you define an object whose keys and values have specific types. It’s basically a shortcut for writing an object type with index signatures.<br>
   Example:<br>
   `Record<string, number>`<br>
   Same as:<br>
   `{ [key: string]: number }`<br>
   So it’s just a cleaner, built-in way to express “object used as a dictionary/lookup table”.
   Instead of manually typing something like:
   `interface CountryPopulation {
  [code: string]: number;
}`<br>
   U can write:<br>
   `type CountryPopulation = Record<string, number>;`
