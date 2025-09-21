import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Filter, ExternalLink, Calendar, Music } from "lucide-react";
import { mockEvents, Event } from "@/data/mockEvents";

interface SearchResult {
  id?: string;
  title: string;
  venue?: string;
  location?: string;
  description: string;
  url: string;
  type?: string;
  date?: string;
  price?: string;
  composer?: string;
  performer?: string;
}

interface SearchSectionProps {
  onSearchResults: (results: SearchResult[]) => void;
  onFilterChange: (filters: { city: string; eventType: string }) => void;
}

export const SearchSection = ({ onSearchResults, onFilterChange }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState("");

  const performEventSearch = async (query: string): Promise<SearchResult[]> => {
    console.log(`Searching events for: "${query}" with filters - City: ${selectedCity}, Type: ${selectedType}`);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Convert Event objects to SearchResult format and filter
    const searchResults = mockEvents
      .filter((event: Event) => {
        // City filter
        if (selectedCity !== "all") {
          const cityName = selectedCity === "new-york" ? "New York" : "Los Angeles";
          
          const eventLocation = event.location?.toLowerCase() || event.venue?.toLowerCase() || '';
          if (!eventLocation.includes(cityName.toLowerCase())) {
            return false;
          }
        }
        
        // Event type filter
        if (selectedType !== "all") {
          const eventType = event.type?.toLowerCase() || event.category?.toLowerCase() || '';
          const eventTitle = event.title?.toLowerCase() || '';
          const eventDescription = event.description?.toLowerCase() || '';
          
          if (!eventType.includes(selectedType) && 
              !eventTitle.includes(selectedType) && 
              !eventDescription.includes(selectedType)) {
            return false;
          }
        }
        
        // Search query filter - search across multiple fields
        if (query.trim()) {
          const queryLower = query.toLowerCase();
          const searchableFields = [
            event.title?.toLowerCase() || '',
            event.description?.toLowerCase() || '',
            event.venue?.toLowerCase() || '',
            event.location?.toLowerCase() || '',
            event.composer?.toLowerCase() || '',
            event.performer?.toLowerCase() || '',
            event.type?.toLowerCase() || '',
            event.category?.toLowerCase() || ''
          ].join(' ');
          
          if (!searchableFields.includes(queryLower)) {
            return false;
          }
        }
        
        return true;
      })
      .map((event: Event): SearchResult => ({
        id: event.id,
        title: event.title || 'Classical Music Event',
        venue: event.venue,
        location: event.location,
        description: event.description || 'Classical music performance',
        url: event.url || event.ticketUrl || '#',
        type: event.type || event.category,
        date: event.date || event.startDate,
        price: event.price,
        composer: event.composer,
        performer: event.performer
      }))
      .slice(0, 20); // Limit results
    
    // Sort results by relevance
    if (query.trim()) {
      const queryLower = query.toLowerCase();
      return searchResults.sort((a, b) => {
        // Prioritize title matches
        const aTitleMatch = a.title.toLowerCase().includes(queryLower);
        const bTitleMatch = b.title.toLowerCase().includes(queryLower);
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        
        // Then venue matches
        const aVenueMatch = a.venue?.toLowerCase().includes(queryLower);
        const bVenueMatch = b.venue?.toLowerCase().includes(queryLower);
        
        if (aVenueMatch && !bVenueMatch) return -1;
        if (!aVenueMatch && bVenueMatch) return 1;
        
        // Then composer/performer matches
        const aArtistMatch = (a.composer?.toLowerCase().includes(queryLower) || 
                             a.performer?.toLowerCase().includes(queryLower));
        const bArtistMatch = (b.composer?.toLowerCase().includes(queryLower) || 
                             b.performer?.toLowerCase().includes(queryLower));
        
        if (aArtistMatch && !bArtistMatch) return -1;
        if (!aArtistMatch && bArtistMatch) return 1;
        
        return 0;
      });
    }
    
    return searchResults;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    setError("");
    
    try {
      const results = await performEventSearch(searchQuery);
      setSearchResults(results);
      onSearchResults(results);
      
      if (results.length === 0) {
        setError("No events found. Try different search terms or filters.");
      }
    } catch (error) {
      setError("Search failed. Please try again.");
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onFilterChange({ city, eventType: selectedType });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onFilterChange({ city: selectedCity, eventType: type });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError("");
    onSearchResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search concerts, venues, composers, or performers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-24"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSearch}
                className="h-8 px-2"
              >
                Clear
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="h-8 px-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="orchestral">Orchestral</SelectItem>
                <SelectItem value="chamber">Chamber</SelectItem>
                <SelectItem value="recital">Recital</SelectItem>
                <SelectItem value="ballet">Ballet</SelectItem>
                <SelectItem value="opera">Opera</SelectItem>
                <SelectItem value="symphony">Symphony</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCity !== "all" || selectedType !== "all") && (
          <div className="flex gap-2 flex-wrap">
            {selectedCity !== "all" && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                📍 {selectedCity === "new-york" ? "New York" : 
                     selectedCity === "los-angeles" ? "Los Angeles" : selectedCity}
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                🎼 {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </Badge>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Search Status Messages */}
      {isSearching && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p>Searching for classical music events...</p>
        </div>
      )}

      {searchQuery && !isSearching && searchResults.length === 0 && !error && (
        <div className="text-center py-8 text-muted-foreground">
          <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No classical music events found for "{searchQuery}"</p>
          <p className="text-sm mt-1">Try different search terms or adjust your filters</p>
        </div>
      )}
    </div>
  );
};