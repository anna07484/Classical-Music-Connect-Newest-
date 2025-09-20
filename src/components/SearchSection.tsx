import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VenueResult {
  name: string;
  address: string;
  type: string;
  description?: string;
}

export const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [venues, setVenues] = useState<VenueResult[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim() && !selectedCity) {
      toast({
        title: "Please enter a search term or select a city",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate venue search results for now
      const mockVenues: VenueResult[] = [
        {
          name: "Carnegie Hall",
          address: "881 7th Ave, New York, NY 10019",
          type: "Concert Hall",
          description: "World-renowned venue for classical music performances"
        },
        {
          name: "Lincoln Center",
          address: "10 Lincoln Center Plaza, New York, NY 10023", 
          type: "Performance Complex",
          description: "Home to Metropolitan Opera, NY Philharmonic"
        },
        {
          name: "Walt Disney Concert Hall",
          address: "111 S Grand Ave, Los Angeles, CA 90012",
          type: "Concert Hall", 
          description: "Iconic venue designed by Frank Gehry"
        }
      ];

      // Filter by city if selected
      const filteredVenues = selectedCity 
        ? mockVenues.filter(venue => 
            venue.address.toLowerCase().includes(selectedCity.toLowerCase())
          )
        : mockVenues;

      // Filter by search query if provided
      const searchResults = query.trim()
        ? filteredVenues.filter(venue =>
            venue.name.toLowerCase().includes(query.toLowerCase()) ||
            venue.description?.toLowerCase().includes(query.toLowerCase())
          )
        : filteredVenues;

      setVenues(searchResults);
      
      toast({
        title: `Found ${searchResults.length} venues`,
        description: "Showing classical music venues in your area"
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to fetch venue information",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search concerts, venues, composers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-burgundy/20"
          />
        </div>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-32 border-burgundy/20">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Cities</SelectItem>
            <SelectItem value="new york">New York</SelectItem>
            <SelectItem value="los angeles">Los Angeles</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-burgundy hover:bg-burgundy/90"
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {venues.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-elegant text-lg text-burgundy">Venues Found</h3>
          {venues.map((venue, index) => (
            <Card key={index} className="border-burgundy/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{venue.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{venue.address}</span>
                    </div>
                    {venue.description && (
                      <p className="text-sm text-muted-foreground mt-2">{venue.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="bg-gold/10 text-burgundy border-gold/30">
                    {venue.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};