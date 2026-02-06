import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplets, Wind, Eye, Sun, Thermometer, Gauge } from 'lucide-react'

interface WeatherDetailsProps {
  humidity: number
  windSpeed: number
  visibility: number
  uvIndex: number
}

export default function WeatherDetails({ 
  humidity, 
  windSpeed, 
  visibility, 
  uvIndex 
}: WeatherDetailsProps) {
  const getUvLevel = (index: number) => {
    if (index <= 2) return { label: 'Low', color: 'text-green-400' }
    if (index <= 5) return { label: 'Moderate', color: 'text-yellow-400' }
    if (index <= 7) return { label: 'High', color: 'text-orange-400' }
    return { label: 'Very High', color: 'text-red-400' }
  }

  const uvLevel = getUvLevel(uvIndex)

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${humidity}%`,
      progress: humidity,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${windSpeed} mph`,
      progress: Math.min(100, windSpeed * 10),
      color: 'from-gray-400 to-gray-300'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${visibility} mi`,
      progress: Math.min(100, visibility * 10),
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: `${uvIndex} (${uvLevel.label})`,
      progress: Math.min(100, uvIndex * 20),
      color: uvLevel.color.includes('green') ? 'from-green-400 to-emerald-400' :
             uvLevel.color.includes('yellow') ? 'from-yellow-400 to-amber-400' :
             uvLevel.color.includes('orange') ? 'from-orange-400 to-red-400' :
             'from-red-400 to-rose-400'
    }
  ]

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <detail.icon className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <p className="text-sm text-white/70">{detail.label}</p>
                  <p className="text-lg font-semibold text-white">{detail.value}</p>
                </div>
              </div>
            </div>
            <Progress 
              value={detail.progress} 
              className="h-2 bg-white/10 [&>div]:bg-linear-to-r"
              style={{
                ['--tw-gradient-from' as string]: detail.color.split(' ')[0].replace('from-', ''),
                ['--tw-gradient-to' as string]: detail.color.split(' ')[1].replace('to-', '')
              } as React.CSSProperties}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}