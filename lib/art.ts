/* =========================================================
   Product illustrations (inline SVG strings, 200×200).
   Gradients (#gPanel, #gWhite …) are defined once in components/SvgDefs.tsx.
   ========================================================= */
const T = (x: number, y: number, size: number, fill: string, txt: string, w = 800) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="${w}" fill="${fill}">${txt}</text>`;
const G = (tr: string, inner: string) => `<g transform="${tr}">${inner}</g>`;
const shadow = (rx = 64) => `<ellipse cx="100" cy="182" rx="${rx}" ry="8" fill="url(#gShadow)"/>`;
const svg = (inner: string) => `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${inner}</svg>`;

/* ---------- building blocks ---------- */
const panel = (dark = false) => {
  const fill = dark ? "url(#gPanelDark)" : "url(#gPanel)";
  const line = dark ? "#7486AC" : "#A9C4FF";
  return `<path d="M70 146 60 178M132 146l8 32" stroke="#98A4B5" stroke-width="7" stroke-linecap="round"/>
    <path d="M22 150 52 30h128l-24 120Z" fill="url(#gFrame)"/>
    <path d="M29 144 57 36h116l-22 108Z" fill="${fill}"/>
    <g stroke="${line}" stroke-opacity=".55" stroke-width="1.4"><path d="M86 36 59.5 144M115 36 90 144M144 36 120.5 144M47.7 72H165.7M38.3 108H158.3"/></g>
    <path d="M57 36h26L55 144H29Z" fill="#fff" opacity=".13"/>`;
};

const inverter = (kw: string, label = "HYBRID") => `
  <rect x="50" y="18" width="100" height="156" rx="16" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="62" y="34" width="76" height="44" rx="7" fill="url(#gScreenDark)"/>
  ${T(100, 57, 14, "#6EF0AE", kw)}${T(100, 70, 7, "#8FA3BF", label, 700)}
  <circle cx="84" cy="92" r="4" fill="#22C55E"/><circle cx="100" cy="92" r="4" fill="#F5A300"/><circle cx="116" cy="92" r="4" fill="#CBD5E1"/>
  <rect x="50" y="104" width="100" height="5" fill="url(#gGold)"/>
  <g stroke="#C9D2DE" stroke-width="3" stroke-linecap="round"><path d="M68 124h64M68 134h64M68 144h64M68 154h64"/></g>
  <g fill="#5B6676"><rect x="64" y="174" width="10" height="7" rx="2"/><rect x="80" y="174" width="10" height="7" rx="2"/><rect x="110" y="174" width="10" height="7" rx="2"/><rect x="126" y="174" width="10" height="7" rx="2"/></g>`;

const lithium = (label: string) => `
  <path d="M72 44V30h56v14" fill="none" stroke="#9AA6B6" stroke-width="7" stroke-linejoin="round"/>
  <rect x="38" y="42" width="124" height="132" rx="16" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="52" y="58" width="62" height="32" rx="6" fill="url(#gScreenDark)"/>
  ${T(83, 79, 13, "#6EF0AE", "100%")}
  <circle cx="138" cy="74" r="11" fill="url(#gGreen)"/>
  <path d="M138 68v6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M133.6 71.4a6.3 6.3 0 1 0 8.8 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="52" y="104" width="96" height="10" rx="5" fill="url(#gGreen)"/>
  <rect x="52" y="120" width="96" height="10" rx="5" fill="url(#gGreen)" opacity=".7"/>
  <rect x="52" y="136" width="96" height="10" rx="5" fill="url(#gGreen)" opacity=".4"/>
  ${T(100, 164, 9, "#66758A", label, 700)}`;

const tubular = (ah: string) => `
  <rect x="58" y="26" width="20" height="16" rx="3" fill="url(#gRed)"/><rect x="122" y="26" width="20" height="16" rx="3" fill="#1A1F29"/>
  <rect x="42" y="38" width="116" height="24" rx="7" fill="url(#gDark)"/>
  <g fill="url(#gGold)"><circle cx="62" cy="50" r="5"/><circle cx="77" cy="50" r="5"/><circle cx="92" cy="50" r="5"/><circle cx="108" cy="50" r="5"/><circle cx="123" cy="50" r="5"/><circle cx="138" cy="50" r="5"/></g>
  <rect x="46" y="58" width="108" height="116" rx="10" fill="url(#gBlack)"/>
  <rect x="46" y="92" width="108" height="46" fill="url(#gGreen)"/>
  ${T(100, 111, 9, "#fff", "TUBULAR")}${T(100, 130, 16, "#fff", ah)}
  <rect x="52" y="64" width="7" height="104" rx="3.5" fill="#fff" opacity=".07"/>`;

const dry = (label: string) => `
  <rect x="50" y="48" width="18" height="12" rx="2" fill="url(#gRed)"/><rect x="132" y="48" width="18" height="12" rx="2" fill="#AAB4C2"/>
  <rect x="34" y="58" width="132" height="116" rx="12" fill="url(#gBlack)"/>
  <rect x="34" y="58" width="132" height="18" rx="9" fill="#fff" opacity=".06"/>
  <rect x="34" y="96" width="132" height="46" fill="url(#gGold)"/>
  ${T(100, 115, 9, "#0B1B33", "SEALED · DRY")}${T(100, 134, 15, "#0B1B33", label)}`;

const carBattery = () => `
  <rect x="40" y="56" width="20" height="14" rx="3" fill="url(#gRed)"/><rect x="140" y="56" width="20" height="14" rx="3" fill="#1A1F29"/>
  <rect x="24" y="66" width="152" height="22" rx="7" fill="url(#gDark)"/>
  <rect x="28" y="84" width="144" height="90" rx="9" fill="url(#gBlack)"/>
  <rect x="42" y="98" width="116" height="60" rx="7" fill="url(#gBlue)"/>
  <path d="M106 104 90 130h11l-5 22 18-29h-11l6-19Z" fill="url(#gGold)"/>`;

const ups = () => `
  <rect x="30" y="58" width="140" height="112" rx="14" fill="url(#gDark)"/>
  <rect x="30" y="58" width="140" height="18" rx="9" fill="#fff" opacity=".07"/>
  <rect x="46" y="84" width="62" height="34" rx="6" fill="#070B12" stroke="#2D3748"/>
  ${T(77, 106, 14, "#6EF0AE", "230V")}
  <circle cx="54" cy="138" r="5" fill="url(#gGreen)"/><circle cx="70" cy="138" r="5" fill="url(#gGold)"/>
  <g stroke="#4A5568" stroke-width="4" stroke-linecap="round"><path d="M122 86h34M122 96h34M122 106h34M122 116h34M122 126h34M122 136h34M122 146h34"/></g>
  <rect x="40" y="168" width="18" height="7" rx="3" fill="#0B0F16"/><rect x="142" y="168" width="18" height="7" rx="3" fill="#0B0F16"/>`;

const accessories = () => `
  <circle cx="80" cy="100" r="46" fill="none" stroke="#E23B3B" stroke-width="12"/>
  <circle cx="80" cy="100" r="28" fill="none" stroke="#1F2530" stroke-width="12"/>
  <circle cx="80" cy="100" r="11" fill="url(#gSilver)"/>
  <path d="M126 100h16" stroke="#E23B3B" stroke-width="12" stroke-linecap="round"/>
  <rect x="138" y="88" width="34" height="24" rx="7" fill="url(#gBlack)"/><rect x="168" y="94" width="16" height="12" rx="3" fill="#3A4558"/>
  <rect x="134" y="122" width="46" height="56" rx="7" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="148" y="136" width="18" height="26" rx="3" fill="url(#gDark)"/><rect x="150" y="138" width="14" height="10" rx="2" fill="#22C55E"/>`;

const ceilingFan = (blade = "url(#gWood)", tag = "") => `
  <rect x="78" y="14" width="44" height="10" rx="5" fill="url(#gSilver)"/>
  <rect x="96" y="22" width="8" height="46" fill="url(#gSilverH)"/>
  <path d="M78 86 10 98Q6 104 12 108L80 98Z" fill="${blade}" stroke="#00000014"/>
  <path d="M122 86 190 98Q194 104 188 108L120 98Z" fill="${blade}" stroke="#00000014"/>
  <path d="M68 74Q100 58 132 74L128 94Q100 104 72 94Z" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <path d="M92 98 84 152Q100 160 116 152L108 98Z" fill="${blade}" stroke="#00000014"/>
  <ellipse cx="100" cy="98" rx="14" ry="6" fill="url(#gGold)"/>
  ${tag ? T(100, 86, 9, "#0B1B33", tag) : ""}`;

const pedestalFan = () => `
  <rect x="95" y="112" width="10" height="58" fill="url(#gSilverH)"/>
  <ellipse cx="100" cy="172" rx="46" ry="9" fill="url(#gDark)"/>
  <circle cx="100" cy="76" r="58" fill="#F6F8FB" stroke="url(#gSilver)" stroke-width="5"/>
  <g fill="url(#gBlueSoft)">
    <path d="M100 76C94 52 104 28 124 32 134 46 120 66 100 76Z"/>
    <path d="M100 76C94 52 104 28 124 32 134 46 120 66 100 76Z" transform="rotate(120 100 76)"/>
    <path d="M100 76C94 52 104 28 124 32 134 46 120 66 100 76Z" transform="rotate(240 100 76)"/>
  </g>
  <g stroke="#CFD8E3" stroke-width="1.5" fill="none"><circle cx="100" cy="76" r="44"/><circle cx="100" cy="76" r="28"/><path d="M100 18v116M42 76h116M59 35l82 82M141 35l-82 82"/></g>
  <circle cx="100" cy="76" r="12" fill="url(#gDark)"/><circle cx="100" cy="76" r="4" fill="url(#gGold)"/>`;

const cooler = () => `
  <rect x="52" y="22" width="96" height="148" rx="18" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="64" y="34" width="72" height="16" rx="8" fill="#E7ECF2"/>
  <circle cx="78" cy="42" r="3.5" fill="#22C55E"/><circle cx="90" cy="42" r="3.5" fill="#94A3B8"/><circle cx="102" cy="42" r="3.5" fill="#94A3B8"/>
  <rect x="64" y="58" width="72" height="72" rx="10" fill="#DCE3EC"/>
  <g stroke="#AEBACB" stroke-width="3" stroke-linecap="round"><path d="M72 68h56M72 77h56M72 86h56M72 95h56M72 104h56M72 113h56M72 122h56"/></g>
  <rect x="68" y="138" width="64" height="16" rx="5" fill="url(#gWater)" opacity=".7"/>
  <circle cx="68" cy="174" r="6" fill="#2A3140"/><circle cx="132" cy="174" r="6" fill="#2A3140"/>`;

const ac = () => `
  <rect x="14" y="58" width="172" height="62" rx="18" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="14" y="58" width="172" height="14" rx="7" fill="#fff"/>
  <rect x="28" y="104" width="144" height="8" rx="4" fill="#D9E0E9"/>
  ${T(156, 92, 13, "#2F80ED", "24°")}
  <circle cx="136" cy="88" r="2.5" fill="#22C55E"/>
  <g fill="none" stroke="#9CC9FF" stroke-width="3" stroke-linecap="round" opacity=".9">
    <path d="M50 128q8 10 0 20t0 20"/><path d="M100 128q8 10 0 20t0 20"/><path d="M150 128q8 10 0 20t0 20"/>
  </g>`;

const bulb = () => `
  <circle cx="100" cy="74" r="70" fill="url(#gGlow)"/>
  <path d="M100 24a48 48 0 0 0-29 86v14h58v-14a48 48 0 0 0-29-86Z" fill="url(#gWhite)" stroke="#E3E8EF" stroke-width="2"/>
  <ellipse cx="100" cy="70" rx="30" ry="32" fill="#FFE9B0" opacity=".55"/>
  <path d="M82 46a28 28 0 0 1 14-8" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>
  <rect x="70" y="122" width="60" height="10" rx="3" fill="url(#gSilver)"/>
  <rect x="72" y="134" width="56" height="10" rx="3" fill="url(#gSilver)"/>
  <rect x="76" y="146" width="48" height="10" rx="3" fill="url(#gSilver)"/>
  <path d="M84 158h32l-8 14h-16Z" fill="#5B6676"/>`;

const tube = () => `
  <ellipse cx="100" cy="100" rx="98" ry="40" fill="url(#gGlow)"/>
  <rect x="10" y="84" width="20" height="32" rx="5" fill="url(#gSilver)"/><rect x="170" y="84" width="20" height="32" rx="5" fill="url(#gSilver)"/>
  <rect x="24" y="89" width="152" height="22" rx="11" fill="#FFFDF6" stroke="#EDE6D2"/>
  <rect x="32" y="93" width="136" height="6" rx="3" fill="#fff"/>`;

const streetLight = () => `
  ${G("translate(26 4) scale(.42)", panel())}
  <path d="M70 58 100 66" stroke="#98A4B5" stroke-width="4"/>
  <rect x="96" y="58" width="8" height="114" fill="url(#gSilverH)"/>
  <rect x="84" y="168" width="32" height="8" rx="3" fill="url(#gDark)"/>
  <path d="M100 70q0-16 26-16h16" stroke="#98A4B5" stroke-width="6" fill="none"/>
  <path d="M140 64h44l12 50h-68Z" fill="url(#gGlow)"/>
  <rect x="134" y="48" width="56" height="16" rx="8" fill="url(#gDark)"/>
  <rect x="142" y="60" width="40" height="4" rx="2" fill="#FFE9A8"/>`;

const emergency = () => `
  <ellipse cx="100" cy="100" rx="90" ry="54" fill="url(#gGlow)"/>
  <path d="M68 72V54h64v18" stroke="url(#gDark)" stroke-width="9" fill="none" stroke-linejoin="round"/>
  <rect x="24" y="68" width="152" height="76" rx="18" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="38" y="80" width="124" height="38" rx="10" fill="#FFF4CC"/>
  <g fill="#FFC93C">${Array.from({ length: 10 }, (_, i) => `<circle cx="${50 + i * 11.2}" cy="92" r="3"/><circle cx="${50 + i * 11.2}" cy="106" r="3"/>`).join("")}</g>
  <rect x="86" y="126" width="28" height="8" rx="4" fill="url(#gDark)"/>`;

const lamp = () => `
  <ellipse cx="100" cy="112" rx="70" ry="40" fill="url(#gGlow)"/>
  <path d="M64 38h72l20 66H44Z" fill="url(#gCream)" stroke="#E2CFA8"/>
  <rect x="96" y="104" width="8" height="58" fill="url(#gGold)"/>
  <ellipse cx="100" cy="166" rx="40" ry="10" fill="url(#gDark)"/>`;

const iron = (body = "url(#gBlue)", steam = false) => `
  <path d="M30 120c-16 0-18 30 0 40" stroke="#1F2530" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${steam ? `<g fill="#DCE8F5"><circle cx="186" cy="100" r="7"/><circle cx="178" cy="88" r="5"/><circle cx="190" cy="80" r="4"/></g>` : ""}
  <path d="M24 142c16-30 88-38 158-22v24q0 6-6 6H32q-10 0-8-8Z" fill="url(#gSilver)"/>
  <path d="M36 132c18-28 84-36 136-20v20Z" fill="${body}"/>
  <path d="M66 110c4-46 86-50 96-6" stroke="#1F2633" stroke-width="14" fill="none" stroke-linecap="round"/>
  ${steam ? `<rect x="112" y="112" width="34" height="12" rx="6" fill="url(#gWater)" opacity=".85"/>` : ""}
  <circle cx="${steam ? 88 : 112}" cy="121" r="9" fill="#fff" stroke="#CBD5E1"/>
  <path d="M${steam ? 88 : 112} 115v6" stroke="#1F2633" stroke-width="2.4" stroke-linecap="round"/>`;

const curler = () => G("rotate(-32 100 100)", `
  <path d="M26 101c-14 0-14 20-2 26" stroke="#1F2530" stroke-width="4" fill="none"/>
  <rect x="24" y="90" width="66" height="22" rx="11" fill="url(#gBlack)"/>
  <circle cx="44" cy="101" r="4" fill="#22C55E"/>
  <rect x="86" y="88" width="10" height="26" rx="3" fill="url(#gGold)"/>
  <rect x="94" y="92" width="84" height="18" rx="9" fill="url(#gCopper)"/>
  <rect x="98" y="82" width="70" height="8" rx="4" fill="#2A3140"/>
  <rect x="176" y="94" width="12" height="14" rx="6" fill="#1F2530"/>`);

const straightener = () => G("rotate(-28 100 100)", `
  <rect x="22" y="80" width="156" height="18" rx="9" fill="url(#gBlack)" transform="rotate(-4 22 89)"/>
  <rect x="22" y="104" width="156" height="18" rx="9" fill="url(#gBlack)" transform="rotate(4 22 113)"/>
  <rect x="110" y="88" width="60" height="7" rx="3" fill="url(#gCopper)" transform="rotate(-4 22 89)"/>
  <rect x="110" y="107" width="60" height="7" rx="3" fill="url(#gCopper)" transform="rotate(4 22 113)"/>
  <circle cx="40" cy="101" r="8" fill="url(#gGold)"/>
  <rect x="64" y="84" width="22" height="7" rx="3.5" fill="#22C55E" transform="rotate(-4 22 89)"/>`);

/* Garment steam press on a stand, 500ml tank + digital display */
const steamPress = () => `
  <path d="M100 30q23-16 46 0" stroke="#9AA6B6" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M123 22v-7" stroke="#9AA6B6" stroke-width="4" stroke-linecap="round"/>
  <rect x="120" y="22" width="7" height="122" rx="3" fill="url(#gSilverH)"/>
  <rect x="117" y="80" width="13" height="7" rx="2" fill="#5B6676"/>
  <path d="M84 146C60 132 46 112 56 90" stroke="#CBD5E1" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${G("rotate(-18 52 62)", `
    <rect x="36" y="34" width="34" height="58" rx="15" fill="url(#gPurple)"/>
    <rect x="34" y="28" width="38" height="12" rx="6" fill="url(#gSilver)"/>
    <rect x="47" y="54" width="12" height="22" rx="5" fill="#fff" opacity=".25"/>`)}
  <g fill="#DCE8F5"><circle cx="28" cy="34" r="7"/><circle cx="18" cy="24" r="5"/><circle cx="30" cy="14" r="4"/></g>
  <rect x="46" y="140" width="108" height="36" rx="16" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="58" y="100" width="44" height="46" rx="10" fill="url(#gWater)" opacity=".8" stroke="#BFD3E8"/>
  ${T(80, 128, 9, "#fff", "500ml")}
  <rect x="112" y="150" width="32" height="16" rx="4" fill="url(#gScreenDark)"/>
  ${T(128, 162, 9, "#6EF0AE", "180°")}`;

/* Ultrasonic humidifier, 3L tank + LED screen */
const humidifier = () => `
  <g fill="none" stroke="#CFE3F5" stroke-width="7" stroke-linecap="round" opacity=".85">
    <path d="M94 40c-8-8 8-14 0-24"/><path d="M108 40c-8-8 8-14 0-24" opacity=".6"/>
  </g>
  <rect x="86" y="40" width="28" height="14" rx="7" fill="url(#gSilver)"/>
  <rect x="54" y="50" width="92" height="126" rx="30" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="64" y="64" width="72" height="62" rx="18" fill="#EAF4FF" stroke="#C8DCEF"/>
  <path d="M64 96c12-6 24 6 36 0s24-6 36 0v12a18 18 0 0 1-18 18H82a18 18 0 0 1-18-18Z" fill="url(#gWater)" opacity=".75"/>
  ${T(100, 86, 9, "#5B87B8", "3L")}
  <rect x="76" y="134" width="48" height="22" rx="6" fill="url(#gScreenDark)"/>
  ${T(100, 150, 12, "#5EE7F2", "55%")}
  <circle cx="68" cy="164" r="3" fill="#94A3B8"/><circle cx="132" cy="164" r="3" fill="#94A3B8"/>
  <ellipse cx="100" cy="176" rx="36" ry="3" fill="#7DD3FC" opacity=".7"/>`;

const tv = () => `
  <rect x="12" y="28" width="176" height="112" rx="8" fill="url(#gBlack)"/>
  <rect x="17" y="33" width="166" height="102" rx="4" fill="url(#gScreen)"/>
  <path d="M17 112c42-28 92 20 166-26v49H17Z" fill="#fff" opacity=".13"/>
  <path d="M17 82c52-30 102 18 166-22v10c-64 40-114-8-166 24Z" fill="#fff" opacity=".2"/>
  <rect x="92" y="140" width="16" height="22" fill="url(#gSilverH)"/>
  <rect x="56" y="160" width="88" height="8" rx="4" fill="url(#gSilver)"/>`;

const fridge = () => `
  <rect x="52" y="12" width="96" height="164" rx="12" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <rect x="52" y="64" width="96" height="3" fill="#9AA6B6"/>
  <rect x="132" y="26" width="6" height="28" rx="3" fill="url(#gDark)"/><rect x="132" y="78" width="6" height="52" rx="3" fill="url(#gDark)"/>
  <rect x="64" y="80" width="26" height="16" rx="3" fill="url(#gScreenDark)"/>${T(77, 92, 8, "#6EF0AE", "4°C")}
  <rect x="58" y="16" width="10" height="156" rx="5" fill="#fff" opacity=".35"/>
  <rect x="58" y="174" width="12" height="6" rx="2" fill="#2A3140"/><rect x="130" y="174" width="12" height="6" rx="2" fill="#2A3140"/>`;

const washer = () => `
  <rect x="40" y="18" width="120" height="158" rx="14" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="40" y="46" width="120" height="2" fill="#DCE3EC"/>
  <rect x="54" y="26" width="40" height="13" rx="3" fill="url(#gScreenDark)"/>${T(74, 36, 8, "#6EF0AE", "0:45")}
  <circle cx="136" cy="32" r="8" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <circle cx="100" cy="110" r="48" fill="url(#gSilver)"/>
  <circle cx="100" cy="110" r="38" fill="#1C2A3F"/>
  <path d="M66 118c14-10 26 10 40 0s22-6 30 2v4a38 38 0 0 1-70 0Z" fill="url(#gWater)" opacity=".85"/>
  <path d="M80 86a30 30 0 0 1 22-8" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".45"/>`;

const microwave = () => `
  <rect x="16" y="50" width="168" height="112" rx="12" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="28" y="62" width="108" height="88" rx="8" fill="url(#gBlack)"/>
  <rect x="36" y="70" width="92" height="72" rx="5" fill="#FFD27A" opacity=".18"/>
  <path d="M40 76l26-4" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".25"/>
  <rect x="140" y="62" width="6" height="88" rx="3" fill="#CBD5E1"/>
  <rect x="152" y="64" width="24" height="12" rx="3" fill="url(#gScreenDark)"/>${T(164, 73, 7, "#6EF0AE", "12:00")}
  <g fill="#CBD5E1">${[0, 1, 2, 3].map((r) => [0, 1].map((c) => `<rect x="${153 + c * 12}" y="${84 + r * 12}" width="9" height="8" rx="2"/>`).join("")).join("")}</g>
  <circle cx="164" cy="140" r="7" fill="url(#gDark)"/>`;

const oven = () => `
  <rect x="16" y="44" width="168" height="120" rx="12" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <rect x="28" y="56" width="112" height="96" rx="8" fill="url(#gBlack)"/>
  <rect x="36" y="64" width="96" height="80" rx="6" fill="url(#gOven)"/>
  <path d="M40 104h88M40 124h88" stroke="#FFD7A8" stroke-opacity=".5" stroke-width="2"/>
  <rect x="36" y="58" width="96" height="4" rx="2" fill="#AEB8C6"/>
  <g fill="url(#gDark)"><circle cx="162" cy="76" r="9"/><circle cx="162" cy="104" r="9"/><circle cx="162" cy="132" r="9"/></g>
  <g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M162 70v5M162 98v5M162 126v5"/></g>
  <rect x="24" y="164" width="14" height="7" rx="2" fill="#2A3140"/><rect x="162" y="164" width="14" height="7" rx="2" fill="#2A3140"/>`;

const airfryer = () => `
  <rect x="46" y="30" width="108" height="146" rx="34" fill="url(#gBlack)"/>
  <rect x="54" y="36" width="92" height="10" rx="5" fill="#fff" opacity=".06"/>
  <rect x="70" y="50" width="60" height="30" rx="10" fill="#0A0F18" stroke="#2C3442"/>${T(100, 70, 12, "#FFB347", "200°")}
  <rect x="56" y="98" width="88" height="68" rx="20" fill="#232A36" stroke="#353E4E"/>
  <rect x="84" y="116" width="32" height="40" rx="9" fill="url(#gDark)"/>
  <rect x="90" y="120" width="20" height="3" rx="1.5" fill="url(#gGold)"/>`;

const vacuum = () => `
  <path d="M98 126c34-8 44-62 22-80" stroke="#2A3140" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M120 48l48 104" stroke="#AEB8C6" stroke-width="7" stroke-linecap="round"/>
  <rect x="146" y="148" width="48" height="16" rx="8" fill="url(#gDark)"/>
  <circle cx="120" cy="48" r="7" fill="url(#gDark)"/>
  <ellipse cx="62" cy="140" rx="46" ry="32" fill="url(#gRed)"/>
  <ellipse cx="58" cy="126" rx="30" ry="14" fill="#fff" opacity=".22"/>
  <rect x="36" y="112" width="40" height="10" rx="5" fill="url(#gDark)"/>
  <circle cx="44" cy="166" r="11" fill="url(#gBlack)"/><circle cx="44" cy="166" r="4" fill="#AEB8C6"/>`;

const juicer = () => `
  <path d="M136 52h20q6 0 6 6v42q0 6-6 6h-24" fill="none" stroke="#BFD3E8" stroke-width="8"/>
  <path d="M62 36h76l-8 96H70Z" fill="#EAF4FF" fill-opacity=".6" stroke="#BFD3E8" stroke-width="2"/>
  <path d="M66 84h68l-4 48H70Z" fill="url(#gJuice)"/>
  <g fill="#fff" opacity=".5"><circle cx="86" cy="100" r="3"/><circle cx="110" cy="112" r="2.5"/><circle cx="98" cy="94" r="2"/></g>
  <path d="M76 44l5 82" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
  <rect x="58" y="28" width="84" height="12" rx="5" fill="url(#gBlack)"/>
  <path d="M58 132h84l8 40H50Z" fill="url(#gBlack)"/>
  <circle cx="100" cy="152" r="8" fill="url(#gSilver)"/>`;

const kettle = () => `
  <path d="M146 72c40 2 40 68 4 74" stroke="#1F2633" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M56 86 24 66q-4-4 2-6l34 14Z" fill="url(#gSilver)"/>
  <path d="M54 66q46-16 92 0l10 94H44Z" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <rect x="92" y="84" width="16" height="60" rx="8" fill="url(#gWater)" opacity=".8"/>
  <path d="M64 78l-8 72" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
  <ellipse cx="100" cy="62" rx="38" ry="8" fill="url(#gBlack)"/>
  <rect x="90" y="48" width="20" height="10" rx="5" fill="url(#gBlack)"/>
  <rect x="38" y="158" width="124" height="16" rx="7" fill="url(#gBlack)"/>
  <rect x="44" y="158" width="112" height="3" rx="1.5" fill="#60A5FA"/>`;

const toaster = () => `
  <rect x="56" y="36" width="36" height="44" rx="12" fill="url(#gToast)"/>
  <rect x="108" y="36" width="36" height="44" rx="12" fill="url(#gToast)"/>
  <rect x="28" y="64" width="144" height="106" rx="28" fill="url(#gSilver)" stroke="#AEB8C6"/>
  <rect x="54" y="62" width="40" height="8" rx="4" fill="#2A3140"/><rect x="106" y="62" width="40" height="8" rx="4" fill="#2A3140"/>
  <rect x="40" y="76" width="10" height="84" rx="5" fill="#fff" opacity=".45"/>
  <rect x="170" y="96" width="12" height="22" rx="4" fill="url(#gDark)"/>
  <circle cx="100" cy="128" r="11" fill="url(#gDark)"/><path d="M100 120v6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`;

const domeCam = () => `
  <rect x="34" y="44" width="132" height="22" rx="11" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <path d="M44 66a56 56 0 0 0 112 0Z" fill="url(#gBlack)"/>
  <ellipse cx="82" cy="84" rx="18" ry="8" fill="#fff" opacity=".14"/>
  <circle cx="100" cy="96" r="17" fill="#070B12" stroke="#3A4558" stroke-width="4"/>
  <circle cx="100" cy="96" r="7" fill="#2F5BBF"/><circle cx="97" cy="93" r="2.5" fill="#fff" opacity=".7"/>
  <g fill="#E23B3B" opacity=".6"><circle cx="72" cy="96" r="2.5"/><circle cx="128" cy="96" r="2.5"/><circle cx="100" cy="72" r="2.5"/></g>`;

const bulletCam = () => `
  <rect x="14" y="56" width="28" height="64" rx="7" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <path d="M42 88h26l14 14" stroke="#C9D2DE" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${G("rotate(14 124 100)", `
    <rect x="68" y="80" width="114" height="42" rx="14" fill="url(#gWhite)" stroke="#D6DDE6"/>
    <path d="M62 78h122q6 0 6 6v4H62Z" fill="#E5EAF0"/>
    <rect x="172" y="84" width="16" height="34" rx="6" fill="url(#gBlack)"/>
    <circle cx="181" cy="101" r="9" fill="#070B12" stroke="#3A4558" stroke-width="2"/>
    <circle cx="181" cy="101" r="4" fill="#2F5BBF"/>
    <rect x="84" y="94" width="40" height="4" rx="2" fill="#CBD5E1"/>`)}`;

const wifiCam = () => `
  <ellipse cx="100" cy="168" rx="42" ry="10" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="88" y="124" width="24" height="44" rx="6" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <circle cx="100" cy="84" r="52" fill="url(#gWhite)" stroke="#D6DDE6"/>
  <rect x="56" y="62" width="88" height="46" rx="23" fill="url(#gBlack)"/>
  <circle cx="100" cy="85" r="15" fill="#070B12" stroke="#3A4558" stroke-width="4"/>
  <circle cx="100" cy="85" r="6" fill="#2F5BBF"/><circle cx="97" cy="82" r="2" fill="#fff" opacity=".7"/>
  <circle cx="130" cy="76" r="3" fill="#22C55E"/>
  <path d="M78 46a30 30 0 0 1 44 0" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>`;

const dvr = () => `
  <rect x="16" y="78" width="168" height="52" rx="10" fill="url(#gBlack)"/>
  <rect x="16" y="78" width="168" height="10" rx="5" fill="#fff" opacity=".06"/>
  <g><circle cx="36" cy="104" r="3.5" fill="#22C55E"/><circle cx="48" cy="104" r="3.5" fill="#3B82F6"/><circle cx="60" cy="104" r="3.5" fill="#3B82F6"/><circle cx="72" cy="104" r="3.5" fill="#F5A300"/></g>
  <rect x="90" y="98" width="50" height="12" rx="3" fill="#0A0F18" stroke="#2C3442"/>
  ${T(162, 108, 9, "#8FA3BF", "8CH")}
  <rect x="28" y="130" width="16" height="6" rx="2" fill="#0B0F16"/><rect x="156" y="130" width="16" height="6" rx="2" fill="#0B0F16"/>`;

/* ---------- final artworks ---------- */
const ART: Record<string, () => string> = {
  panel: () => svg(shadow(70) + panel()),
  panelDark: () => svg(shadow(70) + panel(true)),
  inverter6: () => svg(shadow(54) + inverter("6kW")),
  inverter4: () => svg(shadow(54) + inverter("4kW")),
  system: () => svg(shadow(80) + G("translate(-6 -6) scale(.62)", panel()) + G("translate(98 40) scale(.6)", inverter("5kW")) + G("translate(30 84) scale(.55)", lithium("48V"))),
  accessories: () => svg(shadow(74) + accessories()),
  lithium48: () => svg(shadow(66) + lithium("48V 100Ah")),
  lithium24: () => svg(shadow(66) + lithium("24V 100Ah")),
  tubular200: () => svg(shadow(60) + tubular("200Ah")),
  tubular150: () => svg(shadow(60) + tubular("150Ah")),
  dry100: () => svg(shadow(70) + dry("12V 100Ah")),
  dry7: () => svg(shadow(48) + G("translate(100 116) scale(.72) translate(-100 -116)", dry("12V 7Ah"))),
  car: () => svg(shadow(78) + carBattery()),
  ups: () => svg(shadow(74) + ups()),
  ceilingFan: () => svg(shadow(70) + ceilingFan()),
  ceilingFanDC: () => svg(shadow(70) + ceilingFan("url(#gWhite)", "DC")),
  pedestalFan: () => svg(shadow(52) + pedestalFan()),
  cooler: () => svg(shadow(56) + cooler()),
  ac: () => svg(shadow(84) + ac()),
  bulb: () => svg(shadow(40) + bulb()),
  tube: () => svg(shadow(84) + tube()),
  streetLight: () => svg(shadow(56) + streetLight()),
  emergency: () => svg(shadow(78) + emergency()),
  lamp: () => svg(shadow(50) + lamp()),
  iron: () => svg(shadow(78) + iron()),
  steamIron: () => svg(shadow(78) + iron("url(#gPurple)", true)),
  curler: () => svg(shadow(70) + curler()),
  straightener: () => svg(shadow(70) + straightener()),
  steamPress: () => svg(shadow(62) + steamPress()),
  humidifier: () => svg(shadow(50) + humidifier()),
  tv: () => svg(shadow(84) + tv()),
  fridge: () => svg(shadow(54) + fridge()),
  washer: () => svg(shadow(64) + washer()),
  microwave: () => svg(shadow(86) + microwave()),
  oven: () => svg(shadow(86) + oven()),
  airfryer: () => svg(shadow(58) + airfryer()),
  vacuum: () => svg(shadow(84) + vacuum()),
  juicer: () => svg(shadow(54) + juicer()),
  kettle: () => svg(shadow(66) + kettle()),
  toaster: () => svg(shadow(74) + toaster()),
  domeCam: () => svg(domeCam()),
  bulletCam: () => svg(shadow(72) + bulletCam()),
  wifiCam: () => svg(wifiCam()),
  dvr: () => svg(shadow(84) + dvr()),
  cctvPack: () => svg(shadow(70) + G("translate(-10 -14) scale(.62)", domeCam()) + G("translate(70 8) scale(.62)", bulletCam()) + G("translate(30 82) scale(.7)", dvr())),
  catBattery: () => svg(shadow(80) + G("translate(-4 30) scale(.78)", tubular("200Ah")) + G("translate(66 30) scale(.74)", lithium("48V"))),
};

const cache = new Map<string, string>();
export function artSvg(key: string): string {
  if (!cache.has(key)) cache.set(key, (ART[key] ?? ART.bulb)());
  return cache.get(key)!;
}
