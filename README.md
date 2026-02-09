## Weather Forecast App

This app is a modern weather dashboard built with Next.js and the Visual Crossing Weather API, designed to provide a clean, real-time view of the current weather and near-term forecast for any city.

### Data Source & API Integration

- **Visual Crossing Weather API (Timeline endpoint)**  
  - Uses the Timeline API from Visual Crossing to fetch **current conditions, today’s high/low, hourly forecast, and summary description** for a given location (city name, address, etc.).  
  - All external calls go through a server-side helper in `lib/weather.ts`, which builds URLs like:  
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{LOCATION}?unitGroup=metric&include=current,hours&key=YOUR_API_KEY`  
    (based on the docs and examples from [`https://www.visualcrossing.com/weather-api/`](https://www.visualcrossing.com/weather-api/)).  
  - The Next.js route `GET /api/weather` wraps this helper and returns a simplified, UI-friendly JSON structure:
    - City name and resolved address
    - Current temperature, feels-like, humidity, wind speed, visibility, UV index
    - Today’s high/low, sunrise, sunset, and numeric moon phase
    - Up to 24 hours of hourly forecast (time + temperature)

- **Secure API key handling**  
  - The Visual Crossing API key is **never exposed on the client**.  
  - It is read from an environment variable (`VISUAL_CROSSING_API_KEY`) on the server and used only inside the API route and helper.

### Core Features

- **Live current weather section**  
  - Shows:
    - City name and condition label (e.g. “Partially cloudy”).  
    - Large **current temperature in Celsius**.  
    - “Feels like” temperature.  
    - Today’s **high and low** based on Visual Crossing’s `tempmax` and `tempmin`.  
    - A **dynamic weather icon** (sun, clouds, rain, snow, drizzle, wind) that matches the condition text.  
    - A descriptive summary line using Visual Crossing’s `description` text, when available.

- **Quick stats panel**  
  - Displays key numbers in compact cards:
    - Temperature  
    - Feels like  
    - Humidity  
    - Wind speed (in **km/h**, aligned with `unitGroup=metric`).

- **Detailed weather metrics**  
  - Separate “Weather Details” section with:
    - **Humidity** (%)  
    - **Wind speed** (km/h)  
    - **Visibility** (km)  
    - **UV index** (with Low / Moderate / High / Very High labels)  
  - Each metric includes an icon, value, label, and a gradient progress bar that visualizes relative intensity.

- **Sunrise, sunset, and moon phase**  
  - Three compact cards show:
    - **Sunrise time**.  
    - **Sunset time**.  
    - **Moon phase** as a human-friendly label (e.g. New Moon, Waxing Crescent, Full Moon, etc.), derived from the numeric phase value.

### Hourly Forecast

- **24-hour rolling forecast**  
  - A horizontal scrollable strip of cards representing up to 24 upcoming hours.  
  - Each hour displays the time in `hh AM/PM` format (e.g. `01 PM`, `08 PM`), the temperature for that hour, and a time-of-day icon (sun, cloud, or moon) chosen based on the hour and AM/PM.

- **Temperature trend between hours**  
  - Between each pair of hourly cards, the app shows a vertical gradient line, an arrow indicating **temperature moving up or down**, and a badge with **temperature change** formatted with two decimal places (e.g. `+2.01° ↑`, `-0.50° ↓`).

### Search & City Selection

- **Search bar with free-text input**  
  - Users can search for **any city name, zip code, or location description**.  
  - On submit, the app calls the internal `/api/weather` route with the new location and updates all sections (current weather, details, sunrise/sunset, moon phase, hourly forecast).

- **Suggested popular cities**  
  - Under the search field, there is a row of quick-access buttons for popular cities:  
    New York, London, Tokyo, Sydney, Paris, Dubai, Singapore, Los Angeles.  
  - Clicking a suggestion instantly loads the weather for that city via the same API route.

### Auto-Refresh & Live Updates

- **Automatic refresh every 5 minutes**  
  - For the **currently selected location**, the app automatically re-fetches data from `/api/weather` every **5 minutes** in the background to keep the dashboard reasonably up to date.

- **Update status indicator**  
  - The “Current Weather” header badge shows:
    - “Loading…” during the initial fetch.  
    - “Updated HH:MM:SS” after a successful refresh, using the local browser time.  
  - The top-right “Live Updates” badge reflects whether a refresh is currently in progress.

### Error Handling & UX

- **Graceful error messages**  
  - If the API route or Visual Crossing call fails, the app shows a user-friendly error message and avoids rendering partial or broken data.

- **Loading feedback**  
  - While loading, badges and values provide simple feedback:
    - Badges show loading/live states.  
    - Value fields show `--` placeholders until real data arrives.

### Units & Assumptions

- **Metric system by default**  
  - All requests to Visual Crossing use `unitGroup=metric`.  
  - UI labels are consistent with metric units:
    - Temperature: **Celsius**.  
    - Wind speed: **km/h**.  
    - Visibility: **km**.

- **Extensible for US units**  
  - The internal API route already accepts a `unitGroup` parameter (`metric` or `us`), so adding a UI toggle for units can be done later without major refactoring.

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

2. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   VISUAL_CROSSING_API_KEY=YOUR_API_KEY_HERE
   ```

   You can obtain an API key by signing up on the Visual Crossing Weather site and following their “How do I get started with the Weather API?” guide linked from [`https://www.visualcrossing.com/weather-api/`](https://www.visualcrossing.com/weather-api/).

3. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open the app**

   Visit `http://localhost:3000` in your browser to use the weather dashboard.

