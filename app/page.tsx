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
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black">Weather Forcast</h1>
        </div>

        {/* <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 mb-8">
            {error}
          </div>
        )}

        {weather && (
          <>
            <WeatherCard data={weather} location={location} isLoading={isLoading} />
            {forecast.length > 0 && <ForecastCard forecast={forecast} />}
          </>
        )} */}
      </div>
    </main>
  );
}
