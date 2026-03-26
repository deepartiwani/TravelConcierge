import DestinationCard from "./DestinationCard.jsx";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-gray-100 rounded-xl flex-1" />
          <div className="h-9 bg-indigo-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl mb-4">🗺️</span>
      <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations found</h3>
      <p className="text-gray-500 max-w-sm">
        Try selecting a different month or region to discover amazing travel destinations.
      </p>
    </div>
  );
}

export default function DestinationGrid({
  destinations,
  weatherMap,
  flightMap,
  hotelMap,
  onViewDetails,
  onBook,
  isLoading,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading && destinations.length === 0
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        : destinations.length === 0
        ? <EmptyState />
        : destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              weatherData={weatherMap?.[dest.id] ?? null}
              flightData={flightMap?.[dest.id] ?? null}
              hotelData={hotelMap?.[dest.id] ?? null}
              onViewDetails={onViewDetails}
              onBook={onBook}
            />
          ))}
    </div>
  );
}
