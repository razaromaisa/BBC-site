/* Remembers the last WhatsApp message link for this browser tab, so the thank-you page
   can offer "WhatsApp didn't open? Try again". Nothing is sent anywhere. */
const KEY = "bbc-last-wa";

export function rememberWhatsApp(url: string) {
  try { sessionStorage.setItem(KEY, url); } catch { /* storage blocked: the button just won't show */ }
}

export function lastWhatsApp(): string | null {
  try {
    const url = sessionStorage.getItem(KEY);
    return url && url.startsWith("https://wa.me/") ? url : null;
  } catch {
    return null;
  }
}
