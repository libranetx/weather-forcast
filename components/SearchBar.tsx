'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, History, Clock, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Error loading search history:', e)
      }
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    
    // Add to search history (limit to last 10 searches)
    const updatedHistory = [trimmed, ...searchHistory.filter(item => item !== trimmed)].slice(0, 10)
    setSearchHistory(updatedHistory)
    localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory))
    
    onSearch?.(trimmed)
    setShowHistory(false)
    setSearchQuery('')
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('weatherSearchHistory')
  }

  const removeFromHistory = (city: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedHistory = searchHistory.filter(item => item !== city)
    setSearchHistory(updatedHistory)
    localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory))
  }

  return (
    <div className="space-y-4 relative">
      <form onSubmit={handleSearch} className="group">
        <Card className={`
          border-2 shadow-md overflow-hidden transition-all duration-300
          ${isFocused 
            ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg' 
            : 'border-border/50 hover:border-blue-300'
          }
        `}>
          <div className="relative p-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for city, zip code, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-12 pr-24 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-14"
            />
            <Button 
              type="submit"
              className="
                absolute right-2 top-1/2 transform -translate-y-1/2 
                bg-gradient-to-r from-blue-600 to-blue-700 
                hover:from-blue-700 hover:to-blue-800 
                text-white h-10 px-6 shadow-md
                transition-all duration-300
              "
            >
              Search
            </Button>
          </div>
        </Card>
      </form>

      {/* History Button */}
      {searchHistory.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/70 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History className="h-3 w-3" />
          Recent Searches
          <Badge className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {searchHistory.length}
          </Badge>
        </Button>
      )}

      {/* History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border border-border/50 shadow-xl max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Recent Searches
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-muted-foreground hover:text-red-500"
                onClick={clearHistory}
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-1">
              {searchHistory.map((city, index) => (
                <Button
                  key={city}
                  variant="ghost"
                  className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-950/20 text-left"
                  onClick={() => {
                    setSearchQuery(city)
                    onSearch?.(city)
                    setShowHistory(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      #{index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500"
                      onClick={(e) => removeFromHistory(city, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Suggested Cities */}
      <div className="flex flex-wrap gap-2">
        {['New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Dubai', 'Singapore', 'Los Angeles'].map((city) => (
          <Button
            key={city}
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-border/70 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
            onClick={() => onSearch?.(city)}
          >
            <MapPin className="h-3 w-3" />
            {city}
          </Button>
        ))}
      </div>
    </div>
  )
}