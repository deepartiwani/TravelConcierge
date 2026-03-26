import { useState, useEffect, useCallback } from "react";
import { Globe, MapPin, BarChart2 } from "lucide-react";
import SearchBar from "./SearchBar.jsx";
import DestinationGrid from "./DestinationGrid.jsx";
import BookingModal from "./BookingModal.jsx";
import { getDestinationsByMonth, getMonthName } from "../domain/travelLogic.js";
import { fetchWeatherData } from "../infrastructure/weatherService.js";
import { fetchFlightPrices, fetchHotelRatings, generateItinerary } from "../infrastructure/travelService.js";

const INITIAL_MONTH = new Date().getMonth() + 1;
const INITIAL_REGION = "all";

function fetchEnrichment(destinations, month, setWeatherMap, setFlightMap, setHotelMap) {
  setWeatherMap({});
  setFlightMap({});
  setHotelMap({});
  destinations.forEach((dest) => {
    Promise.all([
      fetchWeatherData(dest.name, month),
      fetchFlightPrices("DEL", dest.name, month),
      fetchHotelRatings(dest.name),
    ]).then(([weather, flight, hotel]) => {
      setWeatherMap((prev) => ({ ...prev, [dest.id]: weather }));
      setFlightMap((prev) => ({ ...prev, [dest.id]: flight }));
      setHotelMap((prev) => ({ ...prev, [dest.id]: hotel }));
    });
  });
}

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(INITIAL_MONTH);
  const [regionFilter, setRegionFilter] = useState(INITIAL_REGION);
  const [destinations, setDestinations] = useState(() =>
    getDestinationsByMonth(INITIAL_MONTH, INITIAL_REGION)
  );
  const [weatherMap, setWeatherMap] = useState({});
  const [flightMap, setFlightMap] = useState({});
  const [hotelMap, setHotelMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Booking modal state
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  // Kick off enrichment for initial destinations after mount
  useEffect(() => {
    const initial = getDestinationsByMonth(INITIAL_MONTH, INITIAL_REGION);
    fetchEnrichment(initial, INITIAL_MONTH, setWeatherMap, setFlightMap, setHotelMap);
  }, []);

  const handleSearch = useCallback(({ month, region }) => {
    setIsLoading(true);
    setSelectedMonth(month);
    setRegionFilter(region);
    const results = getDestinationsByMonth(month, region);
    setDestinations(results);
    setIsLoading(false);
    fetchEnrichment(results, month, setWeatherMap, setFlightMap, setHotelMap);
  }, []);

  const handleViewDetails = (destination) => {
    handleBookNow(destination);
  };

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setItinerary(null);
    setShowBookingModal(true);
    generateItinerary(destination.name, 7).then(setItinerary);
  };

  const handleBookingClose = () => {
    setShowBookingModal(false);
    setSelectedDestination(null);
    setItinerary(null);
  };

  const handleBookingConfirm = ({ bookingId, destination: dest, travelerName }) => {
    console.info(`Booking confirmed: ${bookingId} for ${dest.name} by ${travelerName}`);
  };

  const regionLabel = {
    all: "All Destinations",
    india: "India",
    global: "Global",
  }[regionFilter];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Search bar */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Stats bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5 font-semibold text-indigo-700">
            <BarChart2 className="w-4 h-4" />
            {destinations.length} destination{destinations.length !== 1 ? "s" : ""} found
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-500" />
            {getMonthName(selectedMonth)}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            {regionLabel}
          </span>
        </div>
      </div>

      {/* Destination grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <DestinationGrid
          destinations={destinations}
          weatherMap={weatherMap}
          flightMap={flightMap}
          hotelMap={hotelMap}
          onViewDetails={handleViewDetails}
          onBook={handleBookNow}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        Smart Travel Concierge · Built with React, Tailwind CSS &amp; simulated MCP services
      </footer>

      {/* Booking Modal */}
      {showBookingModal && selectedDestination && (
        <BookingModal
          destination={selectedDestination}
          weatherData={weatherMap[selectedDestination.id] ?? null}
          flightData={flightMap[selectedDestination.id] ?? null}
          hotelData={hotelMap[selectedDestination.id] ?? null}
          itinerary={itinerary}
          onClose={handleBookingClose}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}
