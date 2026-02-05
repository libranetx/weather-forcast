import Image from "next/image";

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  feelsLike: number
  pressure: number
  uvIndex: number
}

interface ForecastItem {
  time: string
  temp: number
  condition: string
  precipitation: number
}


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      hellp world
    </div>
  );
}
