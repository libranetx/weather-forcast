import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SearchBar from "@/components/SearchBar"
import CurrentWeather from "@/components/CurrentWeather"
import WeatherDetails from "@/components/WeatherDetails"
import HourlyForecast from "@/components/HourlyForecast"
import { Cloud, Droplets, Wind, Eye, Thermometer } from 'lucide-react'

export default function Home() {
  const weatherData = {
    city: 'New York',
    condition: 'Clear',
    temperature: 31,
    feelsLike: 27,
    humidity: 49.9,
    windSpeed: 4,
    visibility: 10,
    uvIndex: 5,
    hourlyForecast: [
      { time: '09 PM', temp: 27 },
      { time: '10 PM', temp: 26 },
      { time: '11 PM', temp: 25 },
      { time: '12 AM', temp: 24 },
      { time: '01 AM', temp: 23 },
      { time: '02 AM', temp: 22 },
      { time: '03 AM', temp: 21 },
    ]
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-2xl bg-linear-to-br from-slate-900/90 via-purple-900/80 to-blue-900/90 backdrop-blur-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cloud className="h-6 w-6 text-white/70" />
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Weather Forecast
            </CardTitle>
          </div>
          <p className="text-sm text-white/60">Real-time weather updates</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <SearchBar />
          
          <Card className="bg-linear-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="pt-6">
              <CurrentWeather 
                city={weatherData.city}
                condition={weatherData.condition}
                temperature={weatherData.temperature}
                feelsLike={weatherData.feelsLike}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-linear-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-400" />
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

            <Card className="bg-linear-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-400" />
                  Current Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Temperature</span>
                    <Badge variant="outline" className="bg-white/10 text-white">
                      {weatherData.temperature}°C
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Feels Like</span>
                    <Badge variant="outline" className="bg-white/10 text-white">
                      {weatherData.feelsLike}°C
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/70">Condition</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {weatherData.condition}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-white/20" />

          <Card className="bg-linear-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wind className="h-5 w-5 text-white/70" />
                24-Hour Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HourlyForecast forecast={weatherData.hourlyForecast} />
            </CardContent>
          </Card>

          <div className="text-center pt-4">
            <Badge variant="secondary" className="bg-white/10 text-white/70 hover:bg-white/20">
              <Eye className="h-3 w-3 mr-1" />
              Last updated: Today at 8:45 PM
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}