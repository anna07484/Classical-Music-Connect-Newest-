import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface SearchSectionProps {
  onSearchResults: (results: any[]) => void;
  onFilterChange: (filters: { city: string; eventType: string }) => void;
}

export const SearchSection = ({ onSearchResults, onFilterChange }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Web scrape for classical music venues based on city
      const cityQuery = selectedCity !== "all" ? `${selectedCity} ` : "";
      const searchTerm = `${cityQuery}classical music concerts venues "${searchQuery}"`;
      
      // This would normally use a real web scraping service
      // For demo purposes, we'll simulate the search
      const mockResults = [
        {
          title: "Carnegie Hall - Classical Season",
          venue: "Carnegie Hall",
          location: "New York",
          description: "Upcoming classical music performances",
          url: "https://carnegiehall.org"
        },
        {
          title: "Lincoln Center Programs",
          venue: "David Geffen Hall",
          location: "New York", 
          description: "NY Philharmonic and guest artists",
          url: "https://lincolncenter.org"
        }
      ];

      onSearchResults(mockResults);
      toast({
        title: "Search Complete",
        description: `Found venues and events for "${searchQuery}"`,
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to complete search. Please try again.",
        variant: "destructive",
      });
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

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search concerts, venues, or composers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-20"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          size="sm"
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-elegant"
        >
          {isSearching ? "..." : "Search"}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-32">
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
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="orchestral">Orchestral</SelectItem>
              <SelectItem value="chamber">Chamber</SelectItem>
              <SelectItem value="recital">Recital</SelectItem>
              <SelectItem value="ballet">Ballet</SelectItem>
              <SelectItem value="opera">Opera</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCity !== "all" || selectedType !== "all") && (
        <div className="flex gap-2 flex-wrap">
          {selectedCity !== "all" && (
            <Badge variant="secondary" className="bg-burgundy/10 text-burgundy">
              {selectedCity === "new-york" ? "New York" : "Los Angeles"}
            </Badge>
          )}
          {selectedType !== "all" && (
            <Badge variant="secondary" className="bg-gold/10 text-burgundy">
              {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};