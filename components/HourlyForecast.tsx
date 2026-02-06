import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Cloud, Sun, CloudRain, Moon } from 'lucide-react'

interface HourlyForecastProps {
  forecast: Array<{
    time: string
    temp: number
  }>
}

const getTimeIcon = (time: string) => {
  const hour = parseInt(time.split(' ')[0])
  const isPM = time.includes('PM')
  
  if (isPM && hour >= 6) {
    return <Moon className="h-5 w-5 text-blue-300" />
  } else if (hour >= 6 && hour < 18) {
    return <Sun className="h-5 w-5 text-yellow-400" />
  } else {
    return <Cloud className="h-5 w-5 text-gray-400" />
  }
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  const maxTemp = Math.max(...forecast.map(h => h.temp))
  const minTemp = Math.min(...forecast.map(h => h.temp))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <Badge variant="outline" className="bg-white/10 text-white border-white/20">
          Hourly Forecast
        </Badge>
        <div className="text-sm text-white/70">
          High: {maxTemp}° • Low: {minTemp}°
        </div>
      </div>

      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {forecast.map((hour, index) => {
            const heightPercentage = ((hour.temp - minTemp) / (maxTemp - minTemp)) * 100
            
            return (
              <div key={index} className="flex flex-col items-center min-w-20">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 w-full">
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        {getTimeIcon(hour.time)}
                      </div>
                      <div className="text-lg font-bold text-white">{hour.temp}°</div>
                      <div className="text-sm text-white/70">{hour.time}</div>
                    </div>
                  </CardContent>
                </Card>
                
                {index < forecast.length - 1 && (() => {
                  const diff = forecast[index + 1].temp - hour.temp
                  const isUp = diff > 0
                  const displayDiff = Math.abs(diff).toFixed(2)
                  
                  return (
                    <div className="mt-4 flex flex-col items-center">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Temperature line */}
                        <div className="absolute w-0.5 h-full bg-linear-to-b from-blue-400/50 via-purple-400/50 to-pink-400/50"></div>
                        
                        {/* Arrow */}
                        <div className="relative z-10 rotate-0">
                          <ArrowDown
                            className={`h-6 w-6 ${
                              isUp ? 'text-emerald-300 rotate-180' : 'text-sky-300'
                            }`}
                          />
                        </div>
                      </div>
                      
                      {/* Temperature change */}
                      <Badge 
                        variant="outline" 
                        className="mt-1 bg-white/5 text-white/70 border-white/10 text-xs"
                      >
                        {isUp ? '+' : '-'}{displayDiff}° {isUp ? '↑' : '↓'}
                      </Badge>
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="text-center text-sm text-white/50">
          Temperatures decreasing overnight with clear skies
        </div>
      </div>
    </div>
  )
}