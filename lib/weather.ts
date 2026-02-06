const API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

if (!API_KEY) {
  // This will fail fast on the server if the key is missing
  throw new Error(
    "VISUAL_CROSSING_API_KEY is not set. Please add it to your .env.local file."
  );
}

export interface VisualCrossingWeatherResponse {
  address: string;
  resolvedAddress: string;
  timezone: string;
  description?: string;
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    feelslike: number;
    humidity: number;
    precip: number;
    windspeed: number;
    visibility: number;
    uvindex: number;
    sunrise: string;
    sunset: string;
    moonphase: number;
    conditions: string;
    icon: string;
    hours?: Array<{
      datetime: string;
      temp: number;
      feelslike: number;
      humidity: number;
      windspeed: number;
      icon: string;
      conditions: string;
    }>;
  }>;
}

export async function fetchVisualCrossingWeather(
  location: string,
  options?: { unitGroup?: "metric" | "us" }
): Promise<VisualCrossingWeatherResponse> {
  const unitGroup = options?.unitGroup ?? "metric";

  const params = new URLSearchParams({
    unitGroup,
    key: API_KEY!,
    include: "current,hours",
  });

  const url = `${API_BASE_URL}/${encodeURIComponent(location)}?${params.toString()}`;

  const res = await fetch(url, {
    // Cache on the server for 10 minutes; adjust as needed
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch weather data (${res.status} ${res.statusText}): ${text}`
    );
  }

  return (await res.json()) as VisualCrossingWeatherResponse;
}

