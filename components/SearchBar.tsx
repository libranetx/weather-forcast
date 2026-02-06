'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality here
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="group">
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <div className="relative p-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for city, zip code, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-24 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-14"
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white h-10 px-6"
            >
              Search
            </Button>
          </div>
        </Card>
      </form>

      {/* Recent Searches */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <MapPin className="h-3 w-3" />
          New York
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MapPin className="h-3 w-3" />
          London
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MapPin className="h-3 w-3" />
          Tokyo
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MapPin className="h-3 w-3" />
          Sydney
        </Button>
      </div>
    </div>
  )
}