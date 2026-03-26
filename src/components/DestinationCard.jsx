import { MapPin, Thermometer, Star, Plane, Hotel, Tag, ChevronRight } from "lucide-react";

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

function RegionBadge({ region }) {
  return (
    <span
      className={[
        "text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide",
        region === "India"
          ? "bg-orange-100 text-orange-700"
          : "bg-blue-100 text-blue-700",
      ].join(" ")}
    >
      {region === "India" ? "🇮🇳 India" : "🌐 Global"}
    </span>
  );
}

export default function DestinationCard({
  destination,
  weatherData,
  flightData,
  hotelData,
  onViewDetails,
  onBook,
}) {
  const isWeatherLoading = !weatherData;
  const isFlightLoading = !flightData;
  const isHotelLoading = !hotelData;

  const topHotelRating = hotelData
    ? Math.max(...hotelData.hotels.map((h) => h.rating))
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden border border-gray-100">
      {/* Hero */}
      <div className="relative flex items-center justify-center h-36 bg-gradient-to-br from-indigo-50 to-blue-100">
        <span className="text-7xl select-none drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
          {destination.imageEmoji}
        </span>
        <div className="absolute top-3 left-3">
          <RegionBadge region={destination.region} />
        </div>
        {destination.bestFor && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm border border-white/60">
              <Tag className="w-3 h-3 text-indigo-500" />
              {destination.bestFor}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name & location */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{destination.name}</h3>
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            {destination.country}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {destination.description}
        </p>

        {/* Temperature + condition */}
        <div className="flex items-center gap-2">
          {isWeatherLoading ? (
            <Skeleton className="h-7 w-40" />
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-sky-700 text-sm font-medium px-3 py-1 rounded-full">
              <Thermometer className="w-3.5 h-3.5" />
              {weatherData.currentTemp}°C · {weatherData.condition}
            </span>
          )}
        </div>

        {/* Highlights */}
        <ul className="space-y-1">
          {destination.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Flight & hotel row */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
          {/* Flights */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Plane className="w-3.5 h-3.5 text-indigo-400" />
            {isFlightLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span>
                From{" "}
                <span className="font-semibold text-gray-800">
                  ${flightData.cheapestPrice}
                </span>{" "}
                USD
              </span>
            )}
          </div>

          {/* Top hotel rating */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Hotel className="w-3.5 h-3.5 text-amber-400" />
            {isHotelLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-800">{topHotelRating}</span>
                <span className="text-gray-400">/ 5</span>
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => onViewDetails(destination)}
            className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-semibold rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onBook(destination)}
            className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm"
          >
            <Plane className="w-4 h-4" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
