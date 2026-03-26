const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Base price ranges per destination category
const PRICE_PROFILES = {
  // International luxury
  Maldives:       { min: 800,  avg: 1100 },
  Iceland:        { min: 700,  avg: 950  },
  Switzerland:    { min: 650,  avg: 900  },
  "New Zealand":  { min: 900,  avg: 1200 },
  Norway:         { min: 700,  avg: 950  },
  // International mid-range
  Japan:          { min: 550,  avg: 750  },
  Italy:          { min: 450,  avg: 650  },
  Greece:         { min: 400,  avg: 600  },
  Portugal:       { min: 350,  avg: 500  },
  France:         { min: 450,  avg: 650  },
  Croatia:        { min: 400,  avg: 580  },
  Turkey:         { min: 300,  avg: 450  },
  Peru:           { min: 600,  avg: 850  },
  Jordan:         { min: 500,  avg: 700  },
  Morocco:        { min: 350,  avg: 500  },
  Scotland:       { min: 400,  avg: 580  },
  Canada:         { min: 700,  avg: 950  },
  // SE Asia & affordable
  Bali:           { min: 350,  avg: 500  },
  Thailand:       { min: 300,  avg: 450  },
  Vietnam:        { min: 280,  avg: 420  },
  // Long-haul
  Australia:      { min: 900,  avg: 1250 },
  "South Africa": { min: 650,  avg: 900  },
  Egypt:          { min: 450,  avg: 650  },
  "United States":{ min: 700,  avg: 950  },
  // India domestic
  Goa:            { min: 80,   avg: 160  },
  Jaipur:         { min: 60,   avg: 120  },
  Kerala:         { min: 80,   avg: 160  },
  Agra:           { min: 50,   avg: 100  },
  Hampi:          { min: 60,   avg: 110  },
  Andaman:        { min: 150,  avg: 280  },
  Mathura:        { min: 50,   avg: 90   },
  Rishikesh:      { min: 55,   avg: 100  },
  Munnar:         { min: 80,   avg: 150  },
  Darjeeling:     { min: 90,   avg: 170  },
  Ooty:           { min: 70,   avg: 130  },
  Coorg:          { min: 80,   avg: 150  },
  Leh:            { min: 120,  avg: 220  },
  Spiti:          { min: 130,  avg: 230  },
  Manali:         { min: 80,   avg: 150  },
  Meghalaya:      { min: 100,  avg: 180  },
  Sikkim:         { min: 110,  avg: 200  },
  Rajasthan:      { min: 70,   avg: 130  },
  Kullu:          { min: 90,   avg: 160  },
  Mysuru:         { min: 70,   avg: 130  },
  Pushkar:        { min: 65,   avg: 120  },
  Pondicherry:    { min: 75,   avg: 140  },
  Rann:           { min: 100,  avg: 190  },
  Auli:           { min: 110,  avg: 200  },
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

function isDomestic(destination) {
  return getPriceProfile(destination).avg < 300;
}

function getAirlines(destination, basePrice) {
  const pool = isDomestic(destination) ? DOMESTIC_AIRLINES : INTERNATIONAL_AIRLINES;
  const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  return selected.map((a) => ({
    name: a.name,
    price: Math.round(basePrice * a.premiumFactor),
    duration: isDomestic(destination)
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
        currency: "USD",
        airlines: getAirlines(destination, average),
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
    { name: "Taj Holiday Village", type: "Luxury",  pricePerNight: 220, amenities: ["Private Beach", "Pool", "Spa", "Watersports"] },
    { name: "W Goa",               type: "Luxury",  pricePerNight: 280, amenities: ["Infinity Pool", "DJ Nights", "Beach Club"] },
    { name: "Pousada Tauma",        type: "Boutique",pricePerNight: 120, amenities: ["Quiet Pool", "Garden", "Home-Style Dining"] },
    { name: "Zostel Goa",          type: "Budget",  pricePerNight: 18,  amenities: ["Dorms", "Common Kitchen", "Social Events"] },
  ],
  Jaipur: [
    { name: "Rambagh Palace",  type: "Luxury",  pricePerNight: 450, amenities: ["Heritage Palace", "Polo Ground", "Royal Spa"] },
    { name: "Samode Haveli",   type: "Boutique",pricePerNight: 200, amenities: ["Courtyard Pool", "Rooftop Dining", "Heritage Rooms"] },
    { name: "Hotel Pearl Palace",type: "Budget", pricePerNight: 30,  amenities: ["Rooftop Cafe", "Free Wi-Fi", "Auto Rickshaw Help"] },
    { name: "Zostel Jaipur",   type: "Budget",  pricePerNight: 15,  amenities: ["Dorms", "Social Activities", "Tours"] },
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

function generateRating(type) {
  const base = { Luxury: 4.5, Boutique: 4.2, Budget: 3.8 }[type] ?? 4.0;
  return Math.round((base + Math.random() * 0.4) * 10) / 10;
}

function getHotels(destination) {
  for (const [key, hotels] of Object.entries(HOTEL_DATA)) {
    if (destination.toLowerCase().includes(key.toLowerCase())) return hotels;
  }
  return DEFAULT_HOTELS;
}

export function fetchHotelRatings(destination) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hotels = getHotels(destination).map((h) => ({
        ...h,
        rating: generateRating(h.type),
      }));
      resolve({ destination, hotels });
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
