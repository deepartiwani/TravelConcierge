const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Realistic weather profiles keyed by destination name fragments
const WEATHER_PROFILES = {
  Maldives:      { base: 30, humidity: 78, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy"] },
  Bali:          { base: 28, humidity: 75, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy", "Scattered Showers"] },
  Marrakech:     { base: 20, humidity: 40, climate: "Semi-Arid",       conditions: ["Sunny", "Clear"] },
  "Chiang Mai":  { base: 28, humidity: 65, climate: "Tropical",        conditions: ["Partly Cloudy", "Sunny"] },
  Queenstown:    { base: 15, humidity: 60, climate: "Oceanic",         conditions: ["Partly Cloudy", "Sunny", "Breezy"] },
  "Machu Picchu":{ base: 16, humidity: 70, climate: "Highland",        conditions: ["Misty", "Partly Cloudy"] },
  Kyoto:         { base: 14, humidity: 55, climate: "Humid Subtropical",conditions: ["Clear", "Cherry Blossom Breeze"] },
  Reykjavik:     { base: 4,  humidity: 80, climate: "Subarctic",       conditions: ["Aurora Nights", "Overcast", "Breezy"] },
  Lisbon:        { base: 17, humidity: 65, climate: "Mediterranean",   conditions: ["Sunny", "Partly Cloudy"] },
  "Amalfi Coast":{ base: 20, humidity: 55, climate: "Mediterranean",   conditions: ["Sunny", "Clear"] },
  "Hoi An":      { base: 30, humidity: 72, climate: "Tropical",        conditions: ["Sunny", "Humid"] },
  Petra:         { base: 22, humidity: 30, climate: "Semi-Arid",       conditions: ["Sunny", "Clear", "Windy"] },
  Santorini:     { base: 22, humidity: 55, climate: "Mediterranean",   conditions: ["Sunny", "Clear"] },
  Provence:      { base: 21, humidity: 50, climate: "Mediterranean",   conditions: ["Sunny", "Breezy"] },
  Dubrovnik:     { base: 21, humidity: 55, climate: "Mediterranean",   conditions: ["Sunny", "Clear"] },
  "Scottish Highlands": { base: 13, humidity: 75, climate: "Oceanic", conditions: ["Partly Cloudy", "Misty", "Breezy"] },
  Bergen:        { base: 15, humidity: 75, climate: "Oceanic",         conditions: ["Partly Cloudy", "Misty"] },
  Banff:         { base: 14, humidity: 50, climate: "Continental",     conditions: ["Sunny", "Clear", "Cool Breeze"] },
  Tuscany:       { base: 23, humidity: 50, climate: "Mediterranean",   conditions: ["Sunny", "Clear"] },
  Algarve:       { base: 24, humidity: 55, climate: "Mediterranean",   conditions: ["Sunny", "Warm"] },
  Cappadocia:    { base: 20, humidity: 40, climate: "Semi-Arid",       conditions: ["Sunny", "Clear", "Cool Morning"] },
  Tokyo:         { base: 17, humidity: 60, climate: "Humid Subtropical",conditions: ["Clear", "Partly Cloudy"] },
  "Koh Samui":   { base: 28, humidity: 75, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy"] },
  Ubud:          { base: 27, humidity: 70, climate: "Tropical",        conditions: ["Sunny", "Afternoon Showers"] },
  Interlaken:    { base: 18, humidity: 60, climate: "Alpine",          conditions: ["Sunny", "Clear"] },
  Zermatt:       { base: 0,  humidity: 65, climate: "Alpine",          conditions: ["Snowfall", "Clear Skies", "Powder Snow"] },
  "New York City":{ base: 4, humidity: 58, climate: "Humid Continental",conditions: ["Cold", "Clear", "Light Snow"] },
  Sydney:        { base: 23, humidity: 62, climate: "Oceanic",         conditions: ["Sunny", "Partly Cloudy"] },
  Luxor:         { base: 24, humidity: 20, climate: "Desert",          conditions: ["Sunny", "Clear", "Hot"] },
  "Great Barrier Reef": { base: 27, humidity: 72, climate: "Tropical", conditions: ["Sunny", "Clear"] },
  "Cape Town":   { base: 13, humidity: 65, climate: "Mediterranean",   conditions: ["Partly Cloudy", "Breezy"] },
  // India
  Goa:           { base: 27, humidity: 68, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy"] },
  Jaipur:        { base: 18, humidity: 40, climate: "Semi-Arid",       conditions: ["Clear", "Sunny"] },
  Kerala:        { base: 28, humidity: 80, climate: "Tropical",        conditions: ["Partly Cloudy", "Humid"] },
  Agra:          { base: 22, humidity: 45, climate: "Semi-Arid",       conditions: ["Clear", "Sunny"] },
  Hampi:         { base: 30, humidity: 55, climate: "Tropical Dry",    conditions: ["Sunny", "Hot"] },
  Andaman:       { base: 28, humidity: 80, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy"] },
  Mathura:       { base: 26, humidity: 45, climate: "Semi-Arid",       conditions: ["Clear", "Holi Colours"] },
  Rishikesh:     { base: 21, humidity: 55, climate: "Subtropical",     conditions: ["Clear", "Breezy"] },
  Munnar:        { base: 18, humidity: 75, climate: "Highland",        conditions: ["Misty", "Partly Cloudy"] },
  Darjeeling:    { base: 14, humidity: 70, climate: "Highland",        conditions: ["Clear", "Mountain Breeze"] },
  Ooty:          { base: 16, humidity: 65, climate: "Highland",        conditions: ["Clear", "Cool Breeze"] },
  Coorg:         { base: 22, humidity: 72, climate: "Highland",        conditions: ["Partly Cloudy", "Misty"] },
  Leh:           { base: 15, humidity: 25, climate: "High-Altitude Desert", conditions: ["Sunny", "Clear", "Cold Nights"] },
  Spiti:         { base: 12, humidity: 22, climate: "High-Altitude Desert", conditions: ["Sunny", "Clear"] },
  Manali:        { base: 13, humidity: 55, climate: "Alpine",          conditions: ["Partly Cloudy", "Breezy"] },
  Meghalaya:     { base: 20, humidity: 90, climate: "Subtropical Highland", conditions: ["Monsoon Rains", "Misty"] },
  Sikkim:        { base: 18, humidity: 80, climate: "Subtropical Highland", conditions: ["Partly Cloudy", "Misty"] },
  Uttarakhand:   { base: 13, humidity: 70, climate: "Alpine",          conditions: ["Partly Cloudy", "Clear"] },
  Rajasthan:     { base: 30, humidity: 40, climate: "Semi-Arid",       conditions: ["Sunny", "Hot"] },
  Kullu:         { base: 14, humidity: 55, climate: "Alpine",          conditions: ["Clear", "Mountain Breeze"] },
  Mysuru:        { base: 25, humidity: 60, climate: "Tropical",        conditions: ["Sunny", "Partly Cloudy"] },
  Pushkar:       { base: 23, humidity: 35, climate: "Semi-Arid",       conditions: ["Clear", "Sunny"] },
  Pondicherry:   { base: 27, humidity: 70, climate: "Tropical",        conditions: ["Sunny", "Coastal Breeze"] },
  Rann:          { base: 18, humidity: 30, climate: "Semi-Arid",       conditions: ["Clear", "Full Moon Nights"] },
  Auli:          { base: -2, humidity: 60, climate: "Alpine",          conditions: ["Snowfall", "Clear Skies"] },
};

const MONSOON_MONTHS = [6, 7, 8, 9];
const RAINFALL_MAP = { Low: "Low", Moderate: "Moderate", High: "High", Monsoon: "High" };

function getProfile(destinationName) {
  for (const [key, profile] of Object.entries(WEATHER_PROFILES)) {
    if (destinationName.toLowerCase().includes(key.toLowerCase())) return profile;
  }
  // Fallback
  return { base: 22, humidity: 60, climate: "Temperate", conditions: ["Partly Cloudy"] };
}

function pickCondition(profile, monthNum) {
  const isMonsoon = MONSOON_MONTHS.includes(monthNum) && profile.climate === "Tropical";
  if (isMonsoon) return "Monsoon";
  return profile.conditions[monthNum % profile.conditions.length];
}

function getRainfall(condition, climate) {
  if (condition === "Monsoon") return "High";
  if (["Misty", "Overcast", "Scattered Showers"].includes(condition)) return "Moderate";
  if (climate === "Desert" || climate === "Semi-Arid" || climate === "High-Altitude Desert") return "Low";
  return "Moderate";
}

function getUVIndex(climate, condition) {
  if (["Desert", "Tropical", "Semi-Arid"].includes(climate) && condition === "Sunny") return 10;
  if (condition === "Monsoon" || condition === "Overcast") return 3;
  if (climate === "Alpine" && condition.includes("Snow")) return 6;
  return 6;
}

export function fetchWeatherData(destination, month) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const monthNum = typeof month === "number" ? month : new Date(`${month} 1`).getMonth() + 1;
      const monthName = MONTH_NAMES[monthNum - 1] ?? "January";
      const profile = getProfile(destination);
      const condition = pickCondition(profile, monthNum);
      const tempVariation = Math.round((monthNum - 6.5) * 0.5);
      const currentTemp = profile.base + tempVariation;
      const forecast = Array.from({ length: 5 }, (_, i) => ({
        day: ["Mon", "Tue", "Wed", "Thu", "Fri"][i],
        temp: currentTemp + Math.round(Math.random() * 4 - 2),
        condition: profile.conditions[(monthNum + i) % profile.conditions.length],
      }));

      resolve({
        destination,
        month: monthName,
        currentTemp,
        humidity: profile.humidity + Math.round(Math.random() * 10 - 5),
        condition,
        forecast,
        climate: profile.climate,
        rainfall: getRainfall(condition, profile.climate),
        uvIndex: getUVIndex(profile.climate, condition),
      });
    }, 800);
  });
}

export function fetchClimateHistory(destination) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const profile = getProfile(destination);
      const monthly = MONTH_NAMES.map((name, i) => {
        const tempVariation = Math.round((i + 1 - 6.5) * 0.5);
        return {
          month: name,
          avgTemp: profile.base + tempVariation,
          humidity: profile.humidity + Math.round(Math.random() * 10 - 5),
          rainfall: MONSOON_MONTHS.includes(i + 1) && profile.climate === "Tropical" ? "High" : "Low",
        };
      });
      resolve({ destination, monthly });
    }, 1000);
  });
}
