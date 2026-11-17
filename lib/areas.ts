/* =========================================================
   AREAS WE INSTALL IN: shown on /solar-installation-azad-kashmir, the home page and in
   Google's structured data. Grouped by the three divisions of Azad Jammu & Kashmir.
   ✏️  Only list places you really install in. Add towns customers ask about most.
   ========================================================= */

export type Region = {
  /** Used for the #link on the page, e.g. /solar-installation-azad-kashmir#mirpur-division */
  id: string;
  name: string;
  districts: { name: string; towns: string[] }[];
  /** What matters for solar in this part of AJK */
  notes: string[];
};

export const REGIONS: Region[] = [
  {
    id: "mirpur-division",
    name: "Kotli, Mirpur & Bhimber",
    districts: [
      { name: "Kotli", towns: ["Kotli city", "Khuiratta", "Sehnsa", "Nakyal", "Charhoi", "Fatehpur", "Tatta Pani", "Dolia Jattan"] },
      { name: "Mirpur", towns: ["Mirpur city", "Dadyal", "Chakswari", "Islamgarh"] },
      { name: "Bhimber", towns: ["Bhimber city", "Samahni", "Barnala"] },
    ],
    notes: [
      "Our shop is in Kotli, so survey visits, installation and service are quickest here.",
      "Long, hot summers give strong output, but heat lowers panel efficiency. We leave an air gap under the panels so they run cooler.",
      "Dust builds up fast in the plains. A quick wash every couple of weeks keeps output up.",
    ],
  },
  {
    id: "poonch-division",
    name: "Rawalakot, Bagh, Pallandri & Haveli",
    districts: [
      { name: "Poonch", towns: ["Rawalakot", "Hajira", "Abbaspur", "Thorar"] },
      { name: "Bagh", towns: ["Bagh city", "Dhirkot", "Harighel"] },
      { name: "Sudhnoti", towns: ["Pallandri", "Trarkhal", "Mang"] },
      { name: "Haveli", towns: ["Forward Kahuta"] },
    ],
    notes: [
      "Cold weather actually helps panels: they produce more per hour of sun when they are cool.",
      "Winter days are shorter and hills can shade a roof for part of the day, so we check the sun path during the survey.",
      "Where it snows, panels are fitted at a steeper angle so snow slides off sooner.",
    ],
  },
  {
    id: "muzaffarabad-division",
    name: "Muzaffarabad, Neelum & Jhelum Valley",
    districts: [
      { name: "Muzaffarabad", towns: ["Muzaffarabad city"] },
      { name: "Jhelum Valley", towns: ["Hattian Bala", "Chikar", "Chinari"] },
      { name: "Neelum", towns: ["Athmuqam", "Kel", "Sharda"] },
    ],
    notes: [
      "Valley homes often get fewer direct sun hours, so we size the system on your real sun hours, not a standard number.",
      "Grid supply can be unreliable in remote valleys, so a battery bank matters more here. Lithium handles the cold and daily cycling best.",
      "Mounting structures are chosen for wind and snow load on exposed hillside roofs.",
    ],
  },
];

export const ALL_DISTRICTS = REGIONS.flatMap((r) => r.districts.map((d) => d.name));

export const AJK_PAGE = "/solar-installation-azad-kashmir";
export const PRICE_PAGE = "/solar-system-price";
