import { useState } from "react";
import {
  X, ChevronLeft, ChevronRight, CheckCircle,
  Plane, Hotel, Cloud, DollarSign,
} from "lucide-react";
import { formatCurrency } from "../utils/currency";

const STEPS = ["Itinerary Review", "Confirm Details", "Booking Complete"];

function generateBookingId() {
  return "TC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                i < current
                  ? "bg-green-500 border-green-500 text-white"
                  : i === current
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white border-gray-300 text-gray-400",
              ].join(" ")}
            >
              {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === current ? "text-indigo-600" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 h-0.5 mb-4 ${i < current ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1 — Itinerary Review
function ItineraryStep({ destination, weatherData, flightData, hotelData, itinerary, selectedHotel, setSelectedHotel }) {
  const topHotel = hotelData?.hotels?.reduce((a, b) => (a.rating > b.rating ? a : b));
  const displayHotel = selectedHotel ?? topHotel;
  const estimatedTotal = (flightData?.averagePrice ?? 0) + (displayHotel?.pricePerNight ?? 0) * 7;

  const now = new Date();
  const checkIn = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 7);
  const fmt = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Destination hero */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
        <span className="text-5xl">{destination.imageEmoji}</span>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
          <p className="text-sm text-gray-500">{destination.country} · {destination.region}</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">
            {fmt(checkIn)} → {fmt(checkOut)} (7 nights)
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Weather */}
        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
          <div className="flex items-center gap-2 text-sky-600 mb-2">
            <Cloud className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Weather</span>
          </div>
          {weatherData ? (
            <>
              <p className="text-2xl font-bold text-gray-800">{weatherData.currentTemp}°C</p>
              <p className="text-sm text-sky-700 font-medium">{weatherData.condition}</p>
              <p className="text-xs text-gray-500 mt-1">{weatherData.climate}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Loading…</p>
          )}
        </div>

        {/* Flights */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Plane className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Flights</span>
          </div>
          {flightData ? (
            <>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(flightData.cheapestPrice, flightData.currency)}</p>
              <p className="text-sm text-indigo-700 font-medium">Economy · Best Fare</p>
              <p className="text-xs text-gray-500 mt-1">{flightData.airlines?.[0]?.name}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Loading…</p>
          )}
        </div>

        {/* Hotels */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Hotel className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Your Hotel</span>
          </div>
          {hotelData ? (
            <>
              <p className="text-sm font-bold text-gray-800 line-clamp-1">{displayHotel?.name}</p>
              <p className="text-lg font-bold text-amber-700">{formatCurrency(displayHotel?.pricePerNight, hotelData?.currency ?? "USD")}<span className="text-xs font-normal text-gray-500">/night</span></p>
              <p className="text-xs text-gray-500 mt-1">⭐ {displayHotel?.rating} · {displayHotel?.type}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Loading…</p>
          )}
        </div>
      </div>

      {/* Airlines */}
      {flightData?.airlines && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2">Available Airlines</h4>
          <div className="space-y-2">
            {flightData.airlines.map((a) => (
              <div key={a.name} className="flex justify-between items-center px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm">
                <span className="font-medium text-gray-700">{a.name}</span>
                <span className="text-gray-500 text-xs">{a.duration}</span>
                <span className="font-bold text-indigo-600">{formatCurrency(a.price, flightData.currency)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel Selection */}
      {hotelData?.hotels && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2">Select Your Hotel</h4>
          <div className="space-y-2">
            {hotelData.hotels.map((h) => {
              const isSelected = (selectedHotel ?? topHotel) === h;
              return (
                <button
                  key={h.name}
                  onClick={() => setSelectedHotel(h)}
                  className={[
                    "w-full flex justify-between items-start px-3 py-3 rounded-lg border text-sm transition-all text-left",
                    isSelected
                      ? "bg-amber-50 border-amber-400 ring-1 ring-amber-400"
                      : "bg-gray-50 border-gray-100 hover:border-amber-200 hover:bg-amber-50/50",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="font-semibold text-gray-800 truncate">{h.name}</span>
                    <span className="text-xs text-gray-500">{h.type}</span>
                    {h.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {h.amenities.slice(0, 3).map((a) => (
                          <span key={a} className="text-xs bg-amber-100 text-amber-700 rounded px-1.5 py-0.5">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-0.5 ml-3 shrink-0">
                    <span className="font-bold text-amber-700">
                      {formatCurrency(h.pricePerNight, hotelData.currency)}
                      <span className="text-xs font-normal text-gray-400">/night</span>
                    </span>
                    <span className="text-xs text-gray-500">⭐ {h.rating}</span>
                    {isSelected && (
                      <span className="text-xs font-bold text-amber-600 mt-1">✓ Selected</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sample itinerary */}
      {itinerary?.itinerary && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2">Sample Itinerary Preview</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {itinerary.itinerary.slice(0, 3).map((day) => (
              <div key={day.day} className="px-3 py-2 rounded-lg bg-green-50 border border-green-100 text-xs text-gray-700">
                <span className="font-bold text-green-700">Day {day.day}: </span>
                {day.morning} → {day.afternoon} → {day.evening}
              </div>
            ))}
            {itinerary.itinerary.length > 3 && (
              <p className="text-xs text-gray-400 italic pl-1">+ {itinerary.itinerary.length - 3} more days…</p>
            )}
          </div>
        </div>
      )}

      {/* Estimated total */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
        <div className="flex items-center gap-2 text-green-700">
          <DollarSign className="w-5 h-5" />
          <span className="font-bold">Estimated Total Cost</span>
        </div>
        <span className="text-2xl font-extrabold text-green-700">{formatCurrency(estimatedTotal, flightData?.currency ?? "USD")}</span>
      </div>
    </div>
  );
}

// Step 2 — Confirmation
function ConfirmStep({ destination, travelerName, setTravelerName, specialRequests, setSpecialRequests, selectedHotel, hotelCurrency }) {
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-bold mb-1">⚠️ Please Review Before Confirming</p>
        <p>You are about to book a trip to <strong>{destination.name}, {destination.country}</strong>. This is a simulated booking — no real charges will be made.</p>
      </div>

      {selectedHotel && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">Selected Hotel</p>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-800">{selectedHotel.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{selectedHotel.type} · ⭐ {selectedHotel.rating}</p>
            </div>
            <p className="text-sm font-bold text-amber-700">
              {formatCurrency(selectedHotel.pricePerNight, hotelCurrency)}
              <span className="text-xs font-normal text-gray-500">/night</span>
            </p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Traveler Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={travelerName}
          onChange={(e) => setTravelerName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows={3}
          placeholder="Dietary requirements, room preferences, accessibility needs…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
        />
      </div>

      <p className="text-xs text-gray-500 text-center">
        By clicking "Confirm Booking" you agree to the simulated Terms &amp; Conditions of Smart Travel Concierge.
      </p>
    </div>
  );
}

// Step 3 — Success
function SuccessStep({ bookingId, destination, travelerName }) {
  return (
    <div className="flex flex-col items-center text-center py-6 space-y-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900">Booking Confirmed! 🎉</h3>
      <p className="text-gray-600 max-w-sm">
        Your trip to <strong>{destination.name}</strong> has been confirmed, {travelerName || "Traveler"}!
      </p>
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-8 py-4">
        <p className="text-xs text-indigo-500 uppercase tracking-widest font-semibold mb-1">Booking Reference</p>
        <p className="text-3xl font-extrabold text-indigo-700 tracking-widest">{bookingId}</p>
      </div>
      <p className="text-sm text-gray-500">
        A confirmation has been (simulated) sent to your email. Have a wonderful trip! ✈️
      </p>
    </div>
  );
}

export default function BookingModal({
  destination,
  weatherData,
  flightData,
  hotelData,
  itinerary,
  onClose,
  onConfirm,
}) {
  const [step, setStep] = useState(0);
  const [travelerName, setTravelerName] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingId] = useState(generateBookingId);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const canAdvance = step === 0 || (step === 1 && travelerName.trim().length > 0);

  const handleNext = () => {
    if (step === 1) {
      onConfirm?.({ destination, travelerName, specialRequests, bookingId, selectedHotel });
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{STEPS[step]}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{destination.name} · {destination.country}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-5">
          <StepIndicator current={step} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {step === 0 && (
            <ItineraryStep
              destination={destination}
              weatherData={weatherData}
              flightData={flightData}
              hotelData={hotelData}
              itinerary={itinerary}
              selectedHotel={selectedHotel}
              setSelectedHotel={setSelectedHotel}
            />
          )}
          {step === 1 && (
            <ConfirmStep
              destination={destination}
              travelerName={travelerName}
              setTravelerName={setTravelerName}
              specialRequests={specialRequests}
              setSpecialRequests={setSpecialRequests}
              selectedHotel={selectedHotel}
              hotelCurrency={hotelData?.currency ?? "USD"}
            />
          )}
          {step === 2 && (
            <SuccessStep
              bookingId={bookingId}
              destination={destination}
              travelerName={travelerName}
            />
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          {step < 2 ? (
            <>
              <button
                onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {step === 0 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className={[
                  "flex items-center gap-1.5 px-6 py-2 text-sm font-bold rounded-xl transition-all",
                  canAdvance
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed",
                ].join(" ")}
              >
                {step === 1 ? "Confirm Booking" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="mx-auto flex items-center gap-1.5 px-8 py-2 text-sm font-bold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
