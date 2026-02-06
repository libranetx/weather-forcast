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
  Eye,
  Thermometer,
  Navigation,
} from "lucide-react";

export default function Home() {
  const weatherData = {
    city: "New York",
    condition: "Clear",
    temperature: 31,
    feelsLike: 27,
    humidity: 49.9,
    windSpeed: 4,
    visibility: 10,
    uvIndex: 5,
    hourlyForecast: [
      { time: "09 PM", temp: 27, icon: "clear" },
      { time: "10 PM", temp: 26, icon: "clear" },
      { time: "11 PM", temp: 25, icon: "clear" },
      { time: "12 AM", temp: 24, icon: "cloudy" },
      { time: "01 AM", temp: 23, icon: "cloudy" },
      { time: "02 AM", temp: 22, icon: "cloudy" },
      { time: "03 AM", temp: 21, icon: "cloudy" },
    ],
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
          Live Updates
        </Badge>
      </div>

      <div className="mb-8">
        <Card className="shadow-modern border-border/50">
          <CardContent className="p-6">
            <SearchBar />
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
                  Updated 5 min ago
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CurrentWeather
                city={weatherData.city}
                condition={weatherData.condition}
                temperature={weatherData.temperature}
                feelsLike={weatherData.feelsLike}
              />
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
              <WeatherDetails
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
                visibility={weatherData.visibility}
                uvIndex={weatherData.uvIndex}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
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
                    {weatherData.temperature}°
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Feels Like</p>
                  <p className="text-2xl font-bold">{weatherData.feelsLike}°</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="text-2xl font-bold">
                    {weatherData.windSpeed} mph
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <HourlyForecast forecast={weatherData.hourlyForecast} />
        </CardContent>
      </Card>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-modern border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="text-lg font-semibold">6:45 AM</p>
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
              <p className="text-lg font-semibold">7:30 PM</p>
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
              <p className="text-lg font-semibold">Waxing Crescent</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
