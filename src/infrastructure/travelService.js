const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Indian destination keys — used to determine currency (INR vs USD)
const INDIAN_DESTINATION_KEYS = new Set([
  "Goa", "Jaipur", "Kerala", "Agra", "Hampi", "Andaman", "Mathura",
  "Rishikesh", "Munnar", "Darjeeling", "Ooty", "Coorg", "Leh", "Spiti",
  "Manali", "Meghalaya", "Sikkim", "Rajasthan", "Kullu", "Mysuru",
  "Pushkar", "Pondicherry", "Rann", "Auli",
]);

// Base price ranges per destination category
// Indian destinations use INR; all others use USD
const PRICE_PROFILES = {
  // International luxury (USD)
  Maldives:       { min: 800,   avg: 1100  },
  Iceland:        { min: 700,   avg: 950   },
  Switzerland:    { min: 650,   avg: 900   },
  "New Zealand":  { min: 900,   avg: 1200  },
  Norway:         { min: 700,   avg: 950   },
  // International mid-range (USD)
  Japan:          { min: 550,   avg: 750   },
  Italy:          { min: 450,   avg: 650   },
  Greece:         { min: 400,   avg: 600   },
  Portugal:       { min: 350,   avg: 500   },
  France:         { min: 450,   avg: 650   },
  Croatia:        { min: 400,   avg: 580   },
  Turkey:         { min: 300,   avg: 450   },
  Peru:           { min: 600,   avg: 850   },
  Jordan:         { min: 500,   avg: 700   },
  Morocco:        { min: 350,   avg: 500   },
  Scotland:       { min: 400,   avg: 580   },
  Canada:         { min: 700,   avg: 950   },
  // SE Asia & affordable (USD)
  Bali:           { min: 350,   avg: 500   },
  Thailand:       { min: 300,   avg: 450   },
  Vietnam:        { min: 280,   avg: 420   },
  // Long-haul (USD)
  Australia:      { min: 900,   avg: 1250  },
  "South Africa": { min: 650,   avg: 900   },
  Egypt:          { min: 450,   avg: 650   },
  "United States":{ min: 700,   avg: 950   },
  // India domestic (INR)
  Goa:            { min: 6500,  avg: 13000 },
  Jaipur:         { min: 5000,  avg: 10000 },
  Kerala:         { min: 6500,  avg: 13000 },
  Agra:           { min: 4000,  avg: 8000  },
  Hampi:          { min: 5000,  avg: 9000  },
  Andaman:        { min: 12500, avg: 23000 },
  Mathura:        { min: 4000,  avg: 7500  },
  Rishikesh:      { min: 4500,  avg: 8500  },
  Munnar:         { min: 6500,  avg: 12500 },
  Darjeeling:     { min: 7500,  avg: 14000 },
  Ooty:           { min: 6000,  avg: 11000 },
  Coorg:          { min: 6500,  avg: 12500 },
  Leh:            { min: 10000, avg: 18000 },
  Spiti:          { min: 11000, avg: 19000 },
  Manali:         { min: 6500,  avg: 12500 },
  Meghalaya:      { min: 8500,  avg: 15000 },
  Sikkim:         { min: 9000,  avg: 17000 },
  Rajasthan:      { min: 6000,  avg: 11000 },
  Kullu:          { min: 7500,  avg: 13000 },
  Mysuru:         { min: 6000,  avg: 11000 },
  Pushkar:        { min: 5500,  avg: 10000 },
  Pondicherry:    { min: 6000,  avg: 12000 },
  Rann:           { min: 8500,  avg: 16000 },
  Auli:           { min: 9000,  avg: 17000 },
};

// Airline rosters
const INTERNATIONAL_AIRLINES = [
  { name: "Emirates",       hub: "DXB", premiumFactor: 1.15 },
  { name: "Singapore Airlines", hub: "SIN", premiumFactor: 1.20 },
  { name: "Qatar Airways",  hub: "DOH", premiumFactor: 1.10 },
  { name: "Lufthansa",      hub: "FRA", premiumFactor: 1.05 },
  { name: "British Airways",hub: "LHR", premiumFactor: 1.08 },
  { name: "Air France",     hub: "CDG", premiumFactor: 1.06 },
  { name: "Turkish Airlines",hub: "IST",premiumFactor: 0.95 },
  { name: "Etihad Airways", hub: "AUH", premiumFactor: 1.12 },
];

const DOMESTIC_AIRLINES = [
  { name: "IndiGo",         premiumFactor: 1.00 },
  { name: "Air India",      premiumFactor: 1.08 },
  { name: "SpiceJet",       premiumFactor: 0.92 },
  { name: "Vistara",        premiumFactor: 1.12 },
  { name: "Go First",       premiumFactor: 0.95 },
  { name: "AirAsia India",  premiumFactor: 0.90 },
];

function getPriceProfile(destination) {
  for (const [key, profile] of Object.entries(PRICE_PROFILES)) {
    if (destination.toLowerCase().includes(key.toLowerCase())) return profile;
  }
  return { min: 300, avg: 500 };
}

function isIndianDestination(destination) {
  for (const key of INDIAN_DESTINATION_KEYS) {
    if (destination.toLowerCase().includes(key.toLowerCase())) return true;
  }
  return false;
}

function getAirlines(destination, cheapestPrice) {
  const pool = isIndianDestination(destination) ? DOMESTIC_AIRLINES : INTERNATIONAL_AIRLINES;
  const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  // Normalise so the airline with the lowest premium factor is priced at
  // exactly cheapestPrice, keeping all other airlines proportionally higher.
  const minFactor = Math.min(...selected.map((a) => a.premiumFactor));
  const basePrice = cheapestPrice / minFactor;
  return selected.map((a) => ({
    name: a.name,
    price: Math.round(basePrice * a.premiumFactor),
    duration: isIndianDestination(destination)
      ? `${1 + Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`
      : `${7 + Math.floor(Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`,
  }));
}

export function fetchFlightPrices(origin = "DEL", destination, month) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const monthNum = typeof month === "number" ? month : new Date(`${month} 1`).getMonth() + 1;
      const monthName = MONTH_NAMES[monthNum - 1] ?? "January";
      const profile = getPriceProfile(destination);
      // Peak season surcharge for Dec/Jan
      const peakFactor = [12, 1].includes(monthNum) ? 1.25 : 1.0;
      const cheapest = Math.round(profile.min * peakFactor);
      const average = Math.round(profile.avg * peakFactor);

      resolve({
        origin,
        destination,
        month: monthName,
        cheapestPrice: cheapest,
        averagePrice: average,
        currency: isIndianDestination(destination) ? "INR" : "USD",
        airlines: getAirlines(destination, cheapest),
        bookingClass: "Economy",
      });
    }, 1000);
  });
}

// Hotel data per destination
const HOTEL_DATA = {
  Maldives: [
    { name: "Soneva Fushi", type: "Luxury",   pricePerNight: 1800, amenities: ["Private Pool", "Overwater Bungalow", "Spa", "Diving Centre"] },
    { name: "Coco Bodu Hithi", type: "Luxury",pricePerNight: 1200, amenities: ["Water Villa", "Free Snorkeling", "Fine Dining"] },
    { name: "Kuredu Island Resort", type: "Boutique", pricePerNight: 450, amenities: ["Dive School", "Beach Bar", "Water Sports"] },
    { name: "Embudu Village", type: "Budget",  pricePerNight: 220, amenities: ["Buffet Meals", "Snorkeling Gear", "Beach Access"] },
  ],
  Bali: [
    { name: "COMO Uma Ubud", type: "Luxury",   pricePerNight: 450, amenities: ["Infinity Pool", "Yoga Pavilion", "Jungle View", "Spa"] },
    { name: "Alaya Resort Ubud", type: "Boutique", pricePerNight: 220, amenities: ["Outdoor Pool", "Cultural Classes", "Restaurant"] },
    { name: "Katamama Villa", type: "Boutique", pricePerNight: 350, amenities: ["Private Butler", "Artisanal Design", "Pool"] },
    { name: "Adiwana Jembawan", type: "Budget", pricePerNight: 90,  amenities: ["Rice Field View", "Breakfast Included", "Wi-Fi"] },
  ],
  Goa: [
    { name: "Taj Holiday Village", type: "Luxury",  pricePerNight: 18500, amenities: ["Private Beach", "Pool", "Spa", "Watersports"] },
    { name: "W Goa",               type: "Luxury",  pricePerNight: 23000, amenities: ["Infinity Pool", "DJ Nights", "Beach Club"] },
    { name: "Pousada Tauma",        type: "Boutique",pricePerNight: 10000, amenities: ["Quiet Pool", "Garden", "Home-Style Dining"] },
    { name: "Zostel Goa",          type: "Budget",  pricePerNight: 1500,  amenities: ["Dorms", "Common Kitchen", "Social Events"] },
  ],
  Jaipur: [
    { name: "Rambagh Palace",  type: "Luxury",  pricePerNight: 37500, amenities: ["Heritage Palace", "Polo Ground", "Royal Spa"] },
    { name: "Samode Haveli",   type: "Boutique",pricePerNight: 16500, amenities: ["Courtyard Pool", "Rooftop Dining", "Heritage Rooms"] },
    { name: "Hotel Pearl Palace",type: "Budget", pricePerNight: 2500,  amenities: ["Rooftop Cafe", "Free Wi-Fi", "Auto Rickshaw Help"] },
    { name: "Zostel Jaipur",   type: "Budget",  pricePerNight: 1250,  amenities: ["Dorms", "Social Activities", "Tours"] },
  ],
  Kyoto: [
    { name: "Tawaraya Ryokan", type: "Luxury",  pricePerNight: 900, amenities: ["Traditional Kaiseki", "Hot Spring Bath", "Tea Ceremony"] },
    { name: "The Hiiragiya",   type: "Luxury",  pricePerNight: 650, amenities: ["Traditional Japanese Rooms", "Onsen", "Garden"] },
    { name: "Machiya Stay",    type: "Boutique",pricePerNight: 280, amenities: ["Traditional Townhouse", "Self-Catering", "Garden"] },
    { name: "Piece Hostel",    type: "Budget",  pricePerNight: 45,  amenities: ["Dorms", "Rooftop Terrace", "Bike Rental"] },
  ],
};

const DEFAULT_HOTELS = [
  { name: "The Grand Palace Hotel", type: "Luxury",   pricePerNight: 380, amenities: ["Rooftop Pool", "Spa", "Fine Dining", "Concierge"] },
  { name: "Boutique Heritage Inn",  type: "Boutique", pricePerNight: 180, amenities: ["Curated Art", "Yoga Class", "Local Breakfast"] },
  { name: "City View Suites",       type: "Boutique", pricePerNight: 140, amenities: ["City View", "Gym", "Free Breakfast"] },
  { name: "Budget Traveller Lodge", type: "Budget",   pricePerNight: 45,  amenities: ["Free Wi-Fi", "Common Kitchen", "Locker"] },
];

const DEFAULT_HOTELS_INR = [
  { name: "Heritage Grand Hotel",   type: "Luxury",   pricePerNight: 32000, amenities: ["Rooftop Pool", "Spa", "Fine Dining", "Concierge"] },
  { name: "Boutique Haveli Inn",    type: "Boutique", pricePerNight: 15000, amenities: ["Curated Art", "Yoga Class", "Local Breakfast"] },
  { name: "City View Residency",    type: "Boutique", pricePerNight: 12000, amenities: ["City View", "Gym", "Free Breakfast"] },
  { name: "Budget Yatri Lodge",     type: "Budget",   pricePerNight: 3750,  amenities: ["Free Wi-Fi", "Common Kitchen", "Locker"] },
];

function generateRating(type) {
  const base = { Luxury: 4.5, Boutique: 4.2, Budget: 3.8 }[type] ?? 4.0;
  return Math.round((base + Math.random() * 0.4) * 10) / 10;
}

function getHotels(destination) {
  for (const [key, hotels] of Object.entries(HOTEL_DATA)) {
    if (destination.toLowerCase().includes(key.toLowerCase())) return hotels;
  }
  return isIndianDestination(destination) ? DEFAULT_HOTELS_INR : DEFAULT_HOTELS;
}

export function fetchHotelRatings(destination) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hotels = getHotels(destination).map((h) => ({
        ...h,
        rating: generateRating(h.type),
      }));
      resolve({
        destination,
        hotels,
        currency: isIndianDestination(destination) ? "INR" : "USD",
      });
    }, 900);
  });
}

const ACTIVITY_TEMPLATES = {
  morning: ["Sunrise viewpoint visit", "Temple/heritage site tour", "Guided nature walk", "Local market breakfast tour", "Yoga & meditation session"],
  afternoon: ["Cultural immersion experience", "Adventure activity (trekking/rafting/diving)", "Local cuisine cooking class", "Museum & art gallery visit", "Scenic boat/cable-car ride"],
  evening: ["Sunset at iconic landmark", "Local street food walk", "Traditional performance/show", "Rooftop dinner with views", "Night bazaar exploration"],
};

export function generateItinerary(destination, days = 7) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itinerary = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1} — ${destination}`,
        morning: ACTIVITY_TEMPLATES.morning[i % ACTIVITY_TEMPLATES.morning.length],
        afternoon: ACTIVITY_TEMPLATES.afternoon[i % ACTIVITY_TEMPLATES.afternoon.length],
        evening: ACTIVITY_TEMPLATES.evening[i % ACTIVITY_TEMPLATES.evening.length],
        accommodation: getHotels(destination)[i % 4]?.name ?? "Local Guest House",
        estimatedCost: 80 + Math.round(Math.random() * 120),
      }));
      resolve({ destination, days, itinerary });
    }, 1200);
  });
}
