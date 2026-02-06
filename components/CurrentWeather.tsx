import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cloud, Sun, CloudSnow, CloudRain, CloudDrizzle, Wind, Thermometer } from 'lucide-react'

interface CurrentWeatherProps {
  city: string
  condition: string
  temperature: number
  feelsLike: number
}

const getWeatherIcon = (condition: string) => {
  const iconClass = "h-14 w-14"
  
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className={`${iconClass} text-yellow-400`} />
    case 'clouds':
      return <Cloud className={`${iconClass} text-gray-300`} />
    case 'rain':
      return <CloudRain className={`${iconClass} text-blue-400`} />
    case 'snow':
      return <CloudSnow className={`${iconClass} text-blue-200`} />
    case 'drizzle':
      return <CloudDrizzle className={`${iconClass} text-blue-300`} />
    default:
      return <Wind className={`${iconClass} text-white/70`} />
  }
}

export default function CurrentWeather({ 
  city, 
  condition, 
  temperature, 
  feelsLike 
}: CurrentWeatherProps) {
  const tempPercentage = Math.min(100, (temperature / 50) * 100)
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{city}</h2>
          <div className="flex items-center gap-2 mt-2">
            {getWeatherIcon(condition)}
            <div>
              <Badge className="bg-white/20 text-white border-white/30">
                {condition}
              </Badge>
              <p className="text-sm text-white/70 mt-1">Mostly sunny throughout the day</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-6xl font-bold bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
            {temperature}°
          </div>
          <p className="text-sm text-white/70 mt-1">Celcius</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white/70">Feels like {feelsLike}°</span>
          </div>
          <span className="text-sm font-medium text-white">{temperature}°</span>
        </div>
        
        <Progress 
          value={tempPercentage} 
          className="h-2 bg-white/10 [&>div]:bg-linear-to-r from-blue-400 to-purple-500"
        />
        
        <div className="flex justify-between text-xs text-white/50">
          <span>-10°</span>
          <span>0°</span>
          <span>10°</span>
          <span>20°</span>
          <span>30°</span>
          <span>40°</span>
          <span>50°</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{temperature}°</div>
            <p className="text-xs text-white/70 mt-1">High</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{feelsLike}°</div>
            <p className="text-xs text-white/70 mt-1">Low</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{Math.abs(temperature - feelsLike)}°</div>
            <p className="text-xs text-white/70 mt-1">Difference</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}