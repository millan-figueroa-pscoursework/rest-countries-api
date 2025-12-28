import type { CountryImpact } from "../models/app/CountryImpact";

export function renderImpactTable(rows: CountryImpact[]) {
    const mount = document.getElementById("impact-table");
    if (!mount) return;

    const seeded = rows.filter(r =>
        r.aiDataCenterPresence !== "unknown" ||
        r.waterInsecurity !== "unknown" ||
        r.climateRisk !== "unknown" ||
        r.nationalDebtRisk !== "unknown" ||
        r.povertyRate !== "unknown" ||
        r.techRegulationStrength !== "unknown"
    );

    mount.innerHTML = `
    <div class="mt-10">
  <div class="flex items-end justify-between mb-3">
    <div>
      <h2 class="text-xl font-semibold text-lmText dark:text-dmText">
        Extraction Atlas — Seeded Impact Table
      </h2>
      <p class="text-sm text-lmInput dark:text-dmText/70">
        Showing ${seeded.length} seeded countries
      </p>
    </div>
  </div>

  <div
    class="
      overflow-auto rounded-xl border
      bg-surface dark:bg-dmElement
      border-lmInput/30 dark:border-dmText/10
    "
  >
    <table class="min-w-[900px] w-full text-sm">
      <thead
        class="
          sticky top-0 z-10
          bg-surface/95 dark:bg-dmElement/95
          backdrop-blur
          border-b border-lmInput/30 dark:border-dmText/10
        "
      >
        <tr class="text-left">
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Country</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Region</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">AI DC</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Water</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Climate</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Debt</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Poverty</th>
          <th class="p-3 font-semibold text-lmText dark:text-dmText">Regulation</th>
        </tr>
      </thead>

      <tbody>
        ${seeded
            .map(
                (r) => `
          <tr
            class="
              border-b border-lmInput/20 dark:border-dmText/10
              hover:bg-lmBg/60 dark:hover:bg-dmBg/40
              transition-colors
            "
          >
            <td class="p-3 font-medium text-lmText dark:text-dmText">
              <div class="flex items-center gap-2">
                <img
                  class="h-4 w-6 rounded-sm border border-lmInput/30 dark:border-dmText/10"
                  src="${r.country.flagUrl}"
                  alt=""
                />
                <span>${r.country.displayName}</span>
              </div>
            </td>

            <td class="p-3 text-lmText/80 dark:text-dmText/80">${r.country.region}</td>

            <td class="p-3 text-lmText dark:text-dmText">${r.aiDataCenterPresence}</td>
            <td class="p-3 text-lmText dark:text-dmText">${r.waterInsecurity}</td>
            <td class="p-3 text-lmText dark:text-dmText">${r.climateRisk}</td>
            <td class="p-3 text-lmText dark:text-dmText">${r.nationalDebtRisk}</td>
            <td class="p-3 text-lmText dark:text-dmText">${r.povertyRate}</td>
            <td class="p-3 text-lmText dark:text-dmText">${r.techRegulationStrength}</td>
          </tr>
        `
            )
            .join("")}
      </tbody>
    </table>
  </div>
</div>

  `;
}
