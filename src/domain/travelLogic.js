import { DESTINATIONS } from "./destinations.js";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function getMonthName(monthNumber) {
  return MONTH_NAMES[monthNumber - 1] ?? "Unknown";
}

export function getDestinationsByMonth(monthNumber, filter = "all") {
  const all = DESTINATIONS[monthNumber] ?? [];
  if (filter === "india") return all.filter((d) => d.region === "India");
  if (filter === "global") return all.filter((d) => d.region === "Global");
  return all;
}

export function getBestMonthForDestination(destinationId) {
  for (const [month, destinations] of Object.entries(DESTINATIONS)) {
    if (destinations.some((d) => d.id === destinationId)) {
      return Number(month);
    }
  }
  return null;
}
