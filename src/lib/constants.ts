// WhatsApp configuration
export const WHATSAPP_NUMBER = "27737157352";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Pricing
export const PRICING = {
  luxuryExperience: 1200,
  addOns: {
    grazingBox: 350,
    snackPlatter: 250,
    fruitPlatter: 150,
  },
} as const;

// Occasions
export const OCCASIONS = [
  "Proposal",
  "Anniversary",
  "Birthday",
  "Date Night",
  "Celebration",
  "Other",
] as const;

// Time slots
export const TIME_SLOTS = [
  "Morning (9:00 AM)",
  "Midday (12:00 PM)",
  "Afternoon (3:00 PM)",
  "Sunset (5:00 PM)",
  "Evening (7:00 PM)",
] as const;

// Package features
export const PACKAGE_FEATURES = [
  "Full setup & clearing up",
  "Table, chairs & luxury decor",
  "Glasses, trays, plates & cutlery",
  "Ice bucket & drinks trolley",
  "Fresh flowers",
  "Complimentary drinks (wine, champagne, juice, cocktails or specialty tea)",
  "Games & entertainment",
  "Board games: chess, monopoly, ludo, scrabble",
  "Cards: intimacy cards, risk it or drink it, truth or dare",
] as const;

// Add-ons list
export const ADD_ONS: Array<{ id: string; name: string; price: number; priceLabel?: string }> = [
  { id: "grazing", name: "Grazing box (food)", price: 350 },
  { id: "snack", name: "Snack platter", price: 250 },
  { id: "fruit", name: "Fruit platter", price: 150 },
  { id: "drinks", name: "Additional drinks", price: 0, priceLabel: "Price depends on selection" },
];

// Themes
export const THEMES = [
  {
    id: "classic-romance",
    name: "Classic Romance",
    description: "Elegant white linens, rose petals, and champagne for intimate proposals and anniversaries.",
  },
  {
    id: "garden-elegance",
    name: "Garden Elegance",
    description: "Lush greenery, natural wood accents, and botanical touches for nature lovers.",
  },
  {
    id: "celebration-luxe",
    name: "Celebration Luxe",
    description: "Bold colors, premium decor, and festive touches for birthdays and special milestones.",
  },
] as const;

