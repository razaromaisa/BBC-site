/* =========================================================
   SOLAR & BACKUP MATHS
   ✏️  Tune these if you want more / less conservative estimates.
   ========================================================= */
import type { Product } from "./data";

/** Peak sun hours per day (Kotli / AJK, typical south-facing roof). */
export const SUN = { avg: 5, summer: 6, winter: 3.5 };
/** Share of rated power that actually reaches your appliances (heat, dust, wiring, inverter). */
export const PERFORMANCE = 0.8;
/** Inverter efficiency when running loads from the battery. */
export const INVERTER_EFF = 0.9;
/** Load used for the "≈ X h backup" note on battery cards. */
export const REF_LOAD = 500;

/** kWh ("units") a solar array makes per day. */
export const dailyUnits = (watts: number, sunHours = SUN.avg) => (watts / 1000) * sunHours * PERFORMANCE;

/** Real-world output on a clear day at noon (panels rarely hit their label rating). */
export const middayWatts = (watts: number) => watts * PERFORMANCE;

/** Hours of backup a battery bank gives at a given load. */
export const backupHours = (wh: number, usable: number, loadW: number) =>
  loadW > 0 ? (wh * usable * INVERTER_EFF) / loadW : 0;

export function fmtHours(h: number) {
  if (!isFinite(h) || h <= 0) return "0 min";
  if (h >= 48) return `${Math.round(h)} h`;
  const total = Math.round(h * 60);
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (!hrs) return `${mins} min`;
  return mins ? `${hrs} h ${mins} min` : `${hrs} h`;
}

export const fmtNum = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** Short energy line shown on product cards (null when not relevant). */
export function energyNote(p: Product): string | null {
  if (p.watts) {
    const u = dailyUnits(p.watts);
    return `≈ ${fmtNum(u, u < 10 ? 1 : 0)} units/day · ~${fmtNum(middayWatts(p.watts))} W at noon`;
  }
  if (p.batt) {
    const load = p.batt.wh < 500 ? 50 : REF_LOAD;
    return `≈ ${fmtHours(backupHours(p.batt.wh, p.batt.usable, load))} backup on ${load} W`;
  }
  if (p.maxLoad) return `Runs loads up to ${fmtNum(p.maxLoad)} W`;
  return null;
}

/* ---------- Appliances for the backup calculator (typical running watts) ---------- */
export const APPLIANCES = [
  { id: "bulb", name: "LED bulb", watts: 20, def: 4 },
  { id: "fan", name: "Ceiling fan (AC)", watts: 80, def: 3 },
  { id: "dcfan", name: "DC inverter fan", watts: 35, def: 0 },
  { id: "tv", name: "LED TV", watts: 100, def: 1 },
  { id: "fridge", name: "Refrigerator", watts: 150, def: 1 },
  { id: "router", name: "Wi-Fi router / laptop", watts: 60, def: 0 },
  { id: "pump", name: "Water pump (1 HP)", watts: 750, def: 0 },
  { id: "washer", name: "Washing machine", watts: 500, def: 0 },
  { id: "ac", name: "Inverter AC 1.5 ton", watts: 1200, def: 0 },
] as const;

export type ApplianceId = (typeof APPLIANCES)[number]["id"];
