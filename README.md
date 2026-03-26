# Smart Travel Concierge ✈️

A **React + Vite** application that acts as an intelligent travel concierge, helping users discover the best global and Indian destinations based on their chosen travel month.

## Features

- **Month-Based Discovery** — Select any month and receive 6 curated destinations (3 global + 3 from India) based on best-time-to-visit logic.
- **Real-Time Data Simulation** — Simulated MCP (Model Context Protocol) services for:
  - 🌦️ **Weather MCP** — Current temperature, conditions, UV index, and 5-day forecast.
  - ✈️ **Travel API MCP** — Flight prices (Amadeus-style), airline options, and hotel ratings.
- **Booking Confirmation Flow** — A 3-step modal (Itinerary Review → Explicit Consent → Booking Reference) ensures the user explicitly approves before any booking is "confirmed".
- **Clean UI** — Built with Tailwind CSS v4 and Lucide-React icons.

## Architecture

```
src/
├── domain/              # Domain layer — travel logic & month-to-destination mapping
│   ├── destinations.js  # 72 destinations (12 months × 6)
│   └── travelLogic.js   # getDestinationsByMonth, getMonthName, getBestMonthForDestination
│
├── infrastructure/      # Infrastructure layer — MCP client & API wrappers
│   ├── mcpClient.js     # MCPClient class + pre-configured instances
│   ├── weatherService.js# Weather MCP: fetchWeatherData, fetchClimateHistory
│   └── travelService.js # Travel MCP: fetchFlightPrices, fetchHotelRatings, generateItinerary
│
└── components/          # Interface layer — React UI components
    ├── SearchBar.jsx    # Month selector + region toggle (All / India / Global)
    ├── DestinationCard.jsx  # Card with weather, flight, hotel data + skeleton loaders
    ├── DestinationGrid.jsx  # Responsive 3-column grid
    ├── BookingModal.jsx     # 3-step booking confirmation modal
    └── Dashboard.jsx        # Main orchestrator component
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Agent Instructions

See [`.github/agents/travel-specialist.md`](.github/agents/travel-specialist.md) for the Travel Specialist AI agent instructions, including how to use the MCP servers, destination recommendation logic, and booking flow guidelines.
