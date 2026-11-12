/* Shared gradients used by every product illustration + the WhatsApp icon symbol */
const DEFS = `
<radialGradient id="gShadow"><stop offset="0" stop-color="#0B1B33" stop-opacity=".28"/><stop offset="1" stop-color="#0B1B33" stop-opacity="0"/></radialGradient>
<radialGradient id="gGlow"><stop offset="0" stop-color="#FFD978" stop-opacity=".6"/><stop offset="1" stop-color="#FFD978" stop-opacity="0"/></radialGradient>
<linearGradient id="gPanel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B6FE6"/><stop offset=".6" stop-color="#183A9E"/><stop offset="1" stop-color="#102A6E"/></linearGradient>
<linearGradient id="gPanelDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34405C"/><stop offset="1" stop-color="#0A0F1E"/></linearGradient>
<linearGradient id="gFrame" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1F4F8"/><stop offset="1" stop-color="#AEB8C6"/></linearGradient>
<linearGradient id="gWhite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E2E8EF"/></linearGradient>
<linearGradient id="gSilver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F9FB"/><stop offset="1" stop-color="#B2BCC9"/></linearGradient>
<linearGradient id="gSilverH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9AA6B6"/><stop offset=".5" stop-color="#EEF2F6"/><stop offset="1" stop-color="#9AA6B6"/></linearGradient>
<linearGradient id="gDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B4659"/><stop offset="1" stop-color="#161D2A"/></linearGradient>
<linearGradient id="gBlack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C3442"/><stop offset="1" stop-color="#0B0F16"/></linearGradient>
<linearGradient id="gScreenDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#13213A"/><stop offset="1" stop-color="#050A14"/></linearGradient>
<linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD978"/><stop offset="1" stop-color="#F59E0B"/></linearGradient>
<linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5EEAA8"/><stop offset="1" stop-color="#10A65F"/></linearGradient>
<linearGradient id="gRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF7070"/><stop offset="1" stop-color="#C62828"/></linearGradient>
<linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4F8DF7"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient>
<linearGradient id="gPurple" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#5B21B6"/></linearGradient>
<linearGradient id="gWood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9A06B"/><stop offset="1" stop-color="#8C5A33"/></linearGradient>
<linearGradient id="gBlueSoft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E3ECFF"/><stop offset="1" stop-color="#9DB8F2"/></linearGradient>
<linearGradient id="gScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A3D"/><stop offset=".5" stop-color="#F0368A"/><stop offset="1" stop-color="#5B2BE0"/></linearGradient>
<linearGradient id="gCopper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8D1B4"/><stop offset="1" stop-color="#C47A55"/></linearGradient>
<linearGradient id="gToast" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5CB86"/><stop offset="1" stop-color="#C98A3E"/></linearGradient>
<linearGradient id="gJuice" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC15E"/><stop offset="1" stop-color="#FF6A3D"/></linearGradient>
<linearGradient id="gOven" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB36B" stop-opacity=".75"/><stop offset="1" stop-color="#D9481F" stop-opacity=".45"/></linearGradient>
<linearGradient id="gCream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFAF0"/><stop offset="1" stop-color="#E8D3AE"/></linearGradient>
<linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0FF"/><stop offset="1" stop-color="#5BA4F5"/></linearGradient>
<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1a15 15 0 0 1-1.5-.6 12 12 0 0 1-4.6-4.1c-.6-.8-1-1.8-1-2.8 0-1 .5-1.5.7-1.7.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.7c.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.5.2.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.3.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.5.3.1.1.1.7-.1 1.2Z"/></symbol>`;

export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs dangerouslySetInnerHTML={{ __html: DEFS }} />
    </svg>
  );
}
