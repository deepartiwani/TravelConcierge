import { fetchWeatherData, fetchClimateHistory } from "./weatherService.js";
import { fetchFlightPrices, fetchHotelRatings, generateItinerary } from "./travelService.js";

export class MCPClient {
  constructor(serverName, config = {}) {
    this.serverName = serverName;
    this.config = config;
    this.connected = false;
  }

  async connect() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.connected = true;
    console.info(`[MCP] Connected to ${this.serverName}`);
  }

  async callTool(toolName, params = {}) {
    if (!this.connected) {
      throw new Error(`[MCP] Not connected to ${this.serverName}. Call connect() first.`);
    }

    // Weather MCP tools
    if (toolName === "get_weather") {
      return fetchWeatherData(params.destination, params.month);
    }
    if (toolName === "get_climate_history") {
      return fetchClimateHistory(params.destination);
    }

    // Travel API MCP tools
    if (toolName === "get_flight_prices") {
      return fetchFlightPrices(params.origin, params.destination, params.month);
    }
    if (toolName === "get_hotel_ratings") {
      return fetchHotelRatings(params.destination);
    }
    if (toolName === "generate_itinerary") {
      return generateItinerary(params.destination, params.days);
    }

    throw new Error(`[MCP] Unknown tool: ${toolName} on server ${this.serverName}`);
  }

  disconnect() {
    this.connected = false;
    console.info(`[MCP] Disconnected from ${this.serverName}`);
  }
}

export const weatherMCPClient = new MCPClient("weather-mcp-server", {
  endpoint: "mcp://weather.local/v1",
  timeout: 5000,
});

export const travelMCPClient = new MCPClient("travel-api-mcp-server", {
  endpoint: "mcp://travel.local/v1",
  timeout: 8000,
});
