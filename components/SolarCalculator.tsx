"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { waLink } from "@/lib/config";
import {
  APPLIANCES, SUN, backupHours, dailyUnits, fmtHours, fmtNum, middayWatts, type ApplianceId,
} from "@/lib/energy";
import { WaIcon } from "./Icons";

const PANELS = PRODUCTS.filter((p) => p.cat === "solar" && p.watts && p.watts < 1000);
const BATTERIES = PRODUCTS.filter((p) => p.batt && p.batt.wh >= 1000);
const PRESETS = [3, 5, 8, 10, 15];

function Stepper({ value, onChange, min = 0, max = 99, label }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; label: string;
}) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, v)));
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>−</button>
      <input
        type="number" inputMode="numeric" min={min} max={max} value={value} aria-label={label}
        onChange={(e) => set(parseInt(e.target.value, 10) || 0)}
      />
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>+</button>
    </div>
  );
}

export default function SolarCalculator() {
  /* ---------- Solar ---------- */
  const [panelId, setPanelId] = useState(PANELS[0]?.id ?? "");
  const [panels, setPanels] = useState(10);
  const panel = PANELS.find((p) => p.id === panelId) ?? PANELS[0];
  const panelW = panel?.watts ?? 585;
  const arrayW = panelW * panels;
  const kw = arrayW / 1000;
  const noonW = middayWatts(arrayW);
  const unitsDay = dailyUnits(arrayW);
  const unitsSummer = dailyUnits(arrayW, SUN.summer);
  const unitsWinter = dailyUnits(arrayW, SUN.winter);

  /* ---------- Backup ---------- */
  const [battId, setBattId] = useState(BATTERIES[0]?.id ?? "");
  const [batts, setBatts] = useState(1);
  const [counts, setCounts] = useState<Record<ApplianceId, number>>(
    () => Object.fromEntries(APPLIANCES.map((a) => [a.id, a.def])) as Record<ApplianceId, number>
  );
  const batt = BATTERIES.find((b) => b.id === battId) ?? BATTERIES[0];
  const bankWh = (batt?.batt?.wh ?? 0) * batts;
  const usableWh = bankWh * (batt?.batt?.usable ?? 0.5);
  const load = useMemo(() => APPLIANCES.reduce((s, a) => s + a.watts * (counts[a.id] || 0), 0), [counts]);
  const hours = backupHours(bankWh, batt?.batt?.usable ?? 0.5, load);
  const fillPct = Math.min(100, (hours / 12) * 100);

  /* ---------- Solar vs load ---------- */
  const spare = noonW - load;
  const morePanels = spare < 0 ? Math.ceil(-spare / middayWatts(panelW)) : 0;
  const rechargeH = spare > 0 && usableWh > 0 ? usableWh / spare : 0;

  const applianceList = APPLIANCES.filter((a) => counts[a.id] > 0).map((a) => `${counts[a.id]}× ${a.name}`).join(", ");
  const message =
    `Assalam o Alaikum! I used the solar calculator on your website:\n` +
    `• Solar: ${panels} × ${panel?.name} = ${fmtNum(kw, 2)} kW (~${fmtNum(unitsDay, 1)} units/day)\n` +
    `• Backup: ${batts} × ${batt?.name}, load ${fmtNum(load)} W → ~${fmtHours(hours)}\n` +
    (applianceList ? `• Appliances: ${applianceList}\n` : "") +
    `Please send me a quote.`;

  return (
    <section className="section calc-section" id="calculator" aria-labelledby="calc-title">
      <div className="container">
        <div className="sec-head center">
          <div>
            <p className="eyebrow">Solar &amp; backup calculator</p>
            <h2 id="calc-title">How much power will your solar make?</h2>
            <p className="sec-sub">Choose your panels and batteries to see how many watts and units you&apos;ll get, and how long your backup will last.</p>
          </div>
        </div>

        <div className="calc-grid">
          {/* ===== Solar production ===== */}
          <article className="calc-card reveal">
            <header className="calc-head">
              <span className="calc-ico sun" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
              <div><h3>Solar production</h3><p>How much electricity your panels will make</p></div>
            </header>

            <div className="calc-field">
              <span className="calc-label">Panel type</span>
              <div className="choice-row">
                {PANELS.map((p) => (
                  <button key={p.id} type="button" className={`choice${p.id === panel?.id ? " on" : ""}`}
                    aria-pressed={p.id === panel?.id} onClick={() => setPanelId(p.id)}>
                    <strong>{p.watts} W</strong><small>{p.name.replace(/\s*\d+W$/, "")}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-field calc-inline">
              <span className="calc-label">Number of panels</span>
              <Stepper label="Number of panels" value={panels} onChange={setPanels} min={1} max={60} />
            </div>
            <div className="preset-row" aria-label="Quick system sizes">
              {PRESETS.map((k) => (
                <button key={k} type="button" className="preset" onClick={() => setPanels(Math.ceil((k * 1000) / panelW))}>
                  {k} kW
                </button>
              ))}
            </div>

            <div className="calc-result">
              <div className="big-stat">
                <small>System size</small>
                <strong>{fmtNum(kw, 2)} <span>kW</span></strong>
                <em>{panels} × {panelW} W = {fmtNum(arrayW)} W rated</em>
              </div>
              <dl className="stat-grid">
                <div><dt>Midday output</dt><dd>≈ {fmtNum(noonW)} W</dd></div>
                <div><dt>Units per day</dt><dd>≈ {fmtNum(unitsDay, 1)} kWh</dd></div>
                <div><dt>Units per month</dt><dd>≈ {fmtNum(unitsDay * 30)}</dd></div>
                <div><dt>Summer / winter</dt><dd>{fmtNum(unitsSummer, 0)} / {fmtNum(unitsWinter, 0)} per day</dd></div>
              </dl>
            </div>
          </article>

          {/* ===== Battery backup ===== */}
          <article className="calc-card reveal">
            <header className="calc-head">
              <span className="calc-ico bat" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M16 4h-2V2h-4v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-5 15v-5.5H9L13 7v5.5h2L11 19Z" /></svg>
              </span>
              <div><h3>Battery backup</h3><p>How long your batteries will run your home</p></div>
            </header>

            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-batt">Battery</label>
              <select id="calc-batt" className="calc-select" value={batt?.id} onChange={(e) => setBattId(e.target.value)}>
                {BATTERIES.map((b) => (
                  <option key={b.id} value={b.id}>{b.name} · {fmtNum(b.batt!.wh / 1000, 2)} kWh</option>
                ))}
              </select>
            </div>
            <div className="calc-field calc-inline">
              <span className="calc-label">Number of batteries</span>
              <Stepper label="Number of batteries" value={batts} onChange={setBatts} min={1} max={16} />
            </div>

            <div className="calc-field">
              <span className="calc-label">Appliances to run <b className="load-pill">{fmtNum(load)} W</b></span>
              <ul className="appl-list">
                {APPLIANCES.map((a) => (
                  <li key={a.id} className={counts[a.id] ? "on" : ""}>
                    <span><strong>{a.name}</strong><small>{a.watts} W</small></span>
                    <Stepper label={a.name} value={counts[a.id]} max={20}
                      onChange={(v) => setCounts((c) => ({ ...c, [a.id]: v }))} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="calc-result">
              <div className="big-stat">
                <small>Backup time</small>
                <strong>{load > 0 ? <>≈ {fmtHours(hours)}</> : "Add appliances"}</strong>
                <div className="bar" aria-hidden="true"><span style={{ width: `${load > 0 ? fillPct : 0}%` }} /></div>
                <em>{fmtNum(usableWh / 1000, 2)} kWh usable of {fmtNum(bankWh / 1000, 2)} kWh bank</em>
              </div>
            </div>
          </article>
        </div>

        {/* ===== Solar vs load ===== */}
        <div className={`calc-verdict reveal${spare >= 0 ? " ok" : " warn"}`}>
          <span className="v-ico" aria-hidden="true">{spare >= 0 ? "✓" : "!"}</span>
          <p>
            {load === 0 ? (
              <>Add your appliances above to check if your solar can run them.</>
            ) : spare >= 0 ? (
              <>Your <b>{fmtNum(kw, 2)} kW</b> solar can run this <b>{fmtNum(load)} W</b> load at midday with about <b>{fmtNum(spare)} W</b> spare
                {rechargeH > 0 && <>, enough to recharge your batteries in roughly <b>{fmtHours(rechargeH)}</b> of good sun</>}.</>
            ) : (
              <>At midday your panels make about <b>{fmtNum(noonW)} W</b>, less than your <b>{fmtNum(load)} W</b> load.
                Add about <b>{morePanels} more panel{morePanels === 1 ? "" : "s"}</b> to run it fully on solar.</>
            )}
          </p>
          <a className="btn btn-wa" href={waLink(message)} target="_blank" rel="noopener"><WaIcon /> Get a quote for this</a>
        </div>

        <p className="calc-note">
          Estimates for Kotli / AJK sunshine (about {SUN.avg} peak sun hours a day, {SUN.summer} in summer, {SUN.winter} in winter) with 20% losses
          from heat, dust and wiring. Lithium batteries are counted at 90% usable, acid &amp; dry at 50% to protect their life.
          Real results depend on weather, shading, panel angle and appliance brand. We confirm everything during the free site survey.
        </p>
      </div>
    </section>
  );
}
