import { useState } from "react";
import { Plane, Search, Globe, MapPin } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const REGIONS = [
  { value: "all", label: "All Destinations" },
  { value: "india", label: "India" },
  { value: "global", label: "Global" },
];

export default function SearchBar({ onSearch, isLoading }) {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [region, setRegion] = useState("all");

  const handleDiscover = () => {
    if (!isLoading) onSearch({ month, region });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16 px-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/30">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Smart Travel Concierge
          </h1>
        </div>

        <p className="mt-2 text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
          Discover the world's best destinations curated for every month —
          from India's vibrant festivals to global hidden gems.
        </p>

        {/* Controls card */}
        <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-white/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-center">
            {/* Month selector */}
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">
                <Globe className="w-3.5 h-3.5" />
                Travel Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full rounded-xl bg-white/90 text-gray-800 font-medium px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer"
              >
                {MONTHS.map((name, i) => (
                  <option key={name} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Region filter */}
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                Region
              </label>
              <div className="flex rounded-xl overflow-hidden bg-white/20 ring-1 ring-white/30">
                {REGIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setRegion(value)}
                    className={[
                      "flex-1 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none",
                      region === value
                        ? "bg-white text-indigo-700 shadow-inner"
                        : "text-white/90 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discover button */}
          <button
            onClick={handleDiscover}
            disabled={isLoading}
            className={[
              "mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60",
              isLoading
                ? "bg-white/30 text-white/60 cursor-not-allowed"
                : "bg-white text-indigo-700 hover:bg-blue-50 hover:scale-105 active:scale-95",
            ].join(" ")}
          >
            <Search className="w-5 h-5" />
            {isLoading ? "Discovering…" : "Discover Destinations"}
          </button>
        </div>
      </div>
    </div>
  );
}
