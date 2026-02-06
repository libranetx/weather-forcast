'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
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
    <form onSubmit={handleSearch} className="mb-6">
      <Card className="bg-linear-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
        <div className="relative flex items-center p-1">
          <Search className="absolute left-4 h-4 w-4 text-white/50" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 pl-10 pr-24 border-none bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            type="submit"
            className="absolute right-1 bg-linear-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white"
          >
            Search
          </Button>
        </div>
      </Card>
    </form>
  )
}