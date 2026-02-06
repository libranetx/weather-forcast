import { NextResponse } from "next/server";
import { fetchVisualCrossingWeather } from "@/lib/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location") || "New York";
  const unitParam = searchParams.get("unitGroup");
  const unitGroup = (unitParam === "us" ? "us" : "metric") as "metric" | "us";

  try {
    const data = await fetchVisualCrossingWeather(location, { unitGroup });
    const today = data.days[0];

    if (!today) {
      return NextResponse.json(
        { error: "No weather data available for this location." },
        { status: 502 }
      );
    }

    const simplified = {
      city: data.resolvedAddress || data.address || location,
      condition: today.conditions,
      temperature: today.temp,
      feelsLike: today.feelslike,
      humidity: today.humidity,
      windSpeed: today.windspeed,
      visibility: today.visibility,
      uvIndex: today.uvindex,
      sunrise: today.sunrise,
      sunset: today.sunset,
      moonPhase: today.moonphase,
      hourlyForecast: (today.hours ?? []).slice(0, 24).map((hour) => ({
        time: hour.datetime,
        temp: hour.temp,
        icon: hour.icon,
      })),
      meta: {
        unitGroup,
        timezone: data.timezone,
        description: data.description,
      },
    };

    return NextResponse.json(simplified, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

