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
          <h2 class="text-xl font-semibold">Extraction Atlas — Seeded Impact Table</h2>
          <p class="text-sm opacity-70">Showing ${seeded.length} seeded countries</p>
        </div>
      </div>

      <div class="overflow-auto rounded-xl border">
        <table class="min-w-[900px] w-full text-sm">
          <thead class="sticky top-0 bg-white">
            <tr class="text-left border-b">
              <th class="p-3">Country</th>
              <th class="p-3">Region</th>
              <th class="p-3">AI DC</th>
              <th class="p-3">Water</th>
              <th class="p-3">Climate</th>
              <th class="p-3">Debt</th>
              <th class="p-3">Poverty</th>
              <th class="p-3">Regulation</th>
            </tr>
          </thead>
          <tbody>
            ${seeded.map(r => `
              <tr class="border-b hover:bg-black/5">
                <td class="p-3 font-medium flex items-center gap-2">
                  <img class="h-4 w-6 rounded-sm" src="${r.country.flagUrl}" alt="" />
                  ${r.country.displayName}
                </td>
                <td class="p-3">${r.country.region}</td>
                <td class="p-3">${r.aiDataCenterPresence}</td>
                <td class="p-3">${r.waterInsecurity}</td>
                <td class="p-3">${r.climateRisk}</td>
                <td class="p-3">${r.nationalDebtRisk}</td>
                <td class="p-3">${r.povertyRate}</td>
                <td class="p-3">${r.techRegulationStrength}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
