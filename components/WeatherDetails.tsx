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
    if (index <= 2) return { label: 'Low', color: 'text-green-500' }
    if (index <= 5) return { label: 'Moderate', color: 'text-yellow-500' }
    if (index <= 7) return { label: 'High', color: 'text-orange-500' }
    return { label: 'Very High', color: 'text-red-500' }
  }

  const uvLevel = getUvLevel(uvIndex)

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${humidity}%`,
      progress: humidity,
      color: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${windSpeed} mph`,
      progress: Math.min(100, windSpeed * 10),
      color: 'from-slate-400 to-slate-600',
      bg: 'bg-slate-50 dark:bg-slate-900/20'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${visibility} mi`,
      progress: Math.min(100, visibility * 10),
      color: 'from-blue-300 to-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: `${uvIndex} (${uvLevel.label})`,
      progress: Math.min(100, uvIndex * 20),
      color: uvLevel.label === 'Low' ? 'from-green-400 to-green-600' :
             uvLevel.label === 'Moderate' ? 'from-yellow-400 to-yellow-600' :
             uvLevel.label === 'High' ? 'from-orange-400 to-orange-600' :
             'from-red-400 to-red-600',
      bg: uvLevel.label === 'Low' ? 'bg-green-50 dark:bg-green-950/20' :
          uvLevel.label === 'Moderate' ? 'bg-yellow-50 dark:bg-yellow-950/20' :
          uvLevel.label === 'High' ? 'bg-orange-50 dark:bg-orange-950/20' :
          'bg-red-50 dark:bg-red-950/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {details.map((detail, index) => (
        <Card key={index} className="border-border/50">
          <CardContent className={`p-6 ${detail.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-white dark:bg-black/20">
                  <detail.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{detail.label}</p>
                  <p className="text-2xl font-bold">{detail.value}</p>
                </div>
              </div>
            </div>
            <Progress 
              value={detail.progress} 
              className="h-2 bg-white/50 dark:bg-black/20 [&>div]:bg-gradient-to-r"
              style={{
                ['--tw-gradient-from' as string]: detail.color.split(' ')[0].replace('from-', ''),
                ['--tw-gradient-to' as string]: detail.color.split(' ')[1].replace('to-', '')
              } as React.CSSProperties}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}