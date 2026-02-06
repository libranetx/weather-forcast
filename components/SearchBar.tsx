'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    onSearch?.(trimmed)
  }

  return (
    <div className="space-y-4">
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

      {/* Suggested Cities */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('New York')}
        >
          <MapPin className="h-3 w-3" />
          New York
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('London')}
        >
          <MapPin className="h-3 w-3" />
          London
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Tokyo')}
        >
          <MapPin className="h-3 w-3" />
          Tokyo
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Sydney')}
        >
          <MapPin className="h-3 w-3" />
          Sydney
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Paris')}
        >
          <MapPin className="h-3 w-3" />
          Paris
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Dubai')}
        >
          <MapPin className="h-3 w-3" />
          Dubai
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Singapore')}
        >
          <MapPin className="h-3 w-3" />
          Singapore
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="
            gap-2 border-border/70 
            hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20
            transition-all duration-300
          "
          onClick={() => onSearch?.('Los Angeles')}
        >
          <MapPin className="h-3 w-3" />
          Los Angeles
        </Button>
      </div>
    </div>
  )
}