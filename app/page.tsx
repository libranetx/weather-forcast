 "use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/WeatherDetails";
import HourlyForecast from "@/components/HourlyForecast";
import SearchBar from "@/components/SearchBar";
import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Navigation,
} from "lucide-react";

type HourlyForecastItem = {
  time: string;
  temp: number;
  icon: string;
};

type WeatherData = {
  city: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  moonPhase: number;
  hourlyForecast: HourlyForecastItem[];
  meta?: {
    unitGroup: "metric" | "us";
    timezone: string;
    description?: string;
  };
};

const getMoonPhaseLabel = (phase: number): string => {
  if (phase === 0 || phase === 1) return "New Moon";
  if (phase > 0 && phase < 0.25) return "Waxing Crescent";
  if (phase === 0.25) return "First Quarter";
  if (phase > 0.25 && phase < 0.5) return "Waxing Gibbous";
  if (phase === 0.5) return "Full Moon";
  if (phase > 0.5 && phase < 0.75) return "Waning Gibbous";
  if (phase === 0.75) return "Last Quarter";
  return "Waning Crescent";
};

export default function Home() {
  const [location, setLocation] = useState("New York");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeather = async (loc: string) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        location: loc,
        unitGroup: "metric",
      });

      const res = await fetch(`/api/weather?${params.toString()}`);
      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        throw new Error(data?.error || "Failed to fetch weather data");
      }

      setWeatherData(data as WeatherData);
      setLocation((data as WeatherData).city ?? loc);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(location);
  }, [location]);

  // Auto-refresh every 5 minutes for the current location
  useEffect(() => {
    const interval = setInterval(() => {
      loadWeather(location);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleSearch = (query: string) => {
    setLocation(query);
    loadWeather(query);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient-blue">
            Weather Forecast
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time weather data with modern design
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
        >
          <Navigation className="w-4 h-4 mr-2" />
          {loading ? "Updating..." : "Live"}
        </Badge>
      </div>

      <div className="mb-8">
        <Card className="shadow-modern border-border/50">
          <CardContent className="p-6">
            <SearchBar onSearch={handleSearch} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-modern-lg border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  Current Weather
                </CardTitle>
                <Badge className="bg-blue-500 text-white">
                  {lastUpdated
                    ? `Updated ${lastUpdated.toLocaleTimeString()}`
                    : loading
                    ? "Loading..."
                    : "Live"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}
              {weatherData && !error && (
                <CurrentWeather
                  city={weatherData.city}
                  condition={weatherData.condition}
                  temperature={weatherData.temperature}
                  feelsLike={weatherData.feelsLike}
                  tempMax={weatherData.tempMax}
                  tempMin={weatherData.tempMin}
                  description={weatherData.meta?.description}
                />
              )}
            </CardContent>
          </Card>

          <Card className="shadow-modern border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Weather Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weatherData && !error && (
                <WeatherDetails
                  humidity={weatherData.humidity}
                  windSpeed={weatherData.windSpeed}
                  visibility={weatherData.visibility}
                  uvIndex={weatherData.uvIndex}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <Card className="shadow-modern border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-2xl font-bold">
                    {weatherData ? `${weatherData.temperature}°` : "--"}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Feels Like</p>
                    <p className="text-2xl font-bold">
                    {weatherData ? `${weatherData.feelsLike}°` : "--"}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="text-2xl font-bold">
                    {weatherData ? `${weatherData.humidity}%` : "--"}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Wind</p>
                    <p className="text-2xl font-bold">
                    {weatherData ? `${weatherData.windSpeed} km/h` : "--"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-rows-1 md:grid-rows-3 gap-4">
            <Card className="shadow-modern border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sunrise</p>
                  <p className="text-lg font-semibold">
                    {weatherData?.sunrise ?? "--"}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-modern border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sunset</p>
                  <p className="text-lg font-semibold">
                    {weatherData?.sunset ?? "--"}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-modern border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Moon Phase</p>
                  <p className="text-lg font-semibold">
                    {weatherData
                      ? getMoonPhaseLabel(weatherData.moonPhase)
                      : "--"}
                  </p>
                </div>
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-slate-400 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <Card className="mt-6 shadow-modern border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-500" />
            24-Hour Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weatherData && !error && (
            <HourlyForecast forecast={weatherData.hourlyForecast} />
          )}
        </CardContent>
      </Card>

      {/* Footer Stats */}
    </div>
  );
}
