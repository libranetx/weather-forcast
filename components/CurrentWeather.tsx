import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cloud, Sun, CloudSnow, CloudRain, CloudDrizzle, Wind, Thermometer, Navigation } from 'lucide-react'

interface CurrentWeatherProps {
  city: string
  condition: string
  temperature: number
  feelsLike: number
  tempMax: number
  tempMin: number
  description?: string | null
}

const getWeatherIcon = (condition: string) => {
  const iconClass = "h-20 w-20"
  const c = condition.toLowerCase()

  if (c.includes('clear')) {
    return <Sun className={`${iconClass} text-yellow-500`} />
  }
  if (c.includes('cloud') || c.includes('overcast')) {
    return <Cloud className={`${iconClass} text-slate-400`} />
  }
  if (c.includes('rain')) {
    return <CloudRain className={`${iconClass} text-blue-500`} />
  }
  if (c.includes('snow')) {
    return <CloudSnow className={`${iconClass} text-blue-300`} />
  }
  if (c.includes('drizzle')) {
    return <CloudDrizzle className={`${iconClass} text-blue-400`} />
  }

  return <Wind className={`${iconClass} text-slate-400`} />
}

export default function CurrentWeather({ 
  city, 
  condition, 
  temperature, 
  feelsLike,
  tempMax,
  tempMin,
  description
}: CurrentWeatherProps) {
  const tempPercentage = Math.min(100, ((temperature + 10) / 50) * 100)
  const tempChange = tempMax - tempMin
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold">{city}</h2>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              <Navigation className="w-3 h-3 mr-1" />
              Updated
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            {getWeatherIcon(condition)}
            <div>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {condition}
              </Badge>
              <p className="text-muted-foreground mt-2">
                {description || "Detailed forecast not available."}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-7xl font-bold text-gradient-blue">
            {temperature}°
          </div>
          <p className="text-muted-foreground mt-2">Celsius</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Feels like {feelsLike}°</span>
          </div>
          <span className="font-medium">{temperature}°</span>
        </div>
        
        <Progress 
          value={tempPercentage} 
          className="h-3 bg-slate-100 dark:bg-slate-800 [&>div]:bg-linear-to-r from-blue-500 to-blue-700"
        />
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>-10°</span>
          <span>0°</span>
          <span>10°</span>
          <span>20°</span>
          <span>30°</span>
          <span>40°</span>
          <span>50°</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 pt-6">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">High</p>
            <p className="text-2xl font-bold">{tempMax}°</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Low</p>
            <p className="text-2xl font-bold">{tempMin}°</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Change</p>
            <p className={`text-2xl font-bold ${tempChange >= 0 ? 'text-green-500' : 'text-blue-500'}`}>
              {tempChange >= 0 ? '+' : '-'}
              {Math.abs(tempChange).toFixed(1)}°
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Trend</p>
            <p className="text-2xl font-bold text-blue-500">
              {tempChange >= 0 ? '↑' : '↓'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}