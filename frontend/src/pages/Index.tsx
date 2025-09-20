import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ChatBot } from "@/components/ChatBot";
import { SearchSection } from "@/components/SearchSection";
import { mockEvents, Event } from "@/data/mockEvents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Star, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handlePostRecital = (formData: any) => {
    toast({
      title: "Recital Posted!",
      description: "Your recital has been added to the event feed.",
    });
    setActiveTab("discover");
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  const handleFilterChange = (filters: { city: string; eventType: string }) => {
    let filtered = [...mockEvents];
    
    // Filter by city
    if (filters.city !== "all") {
      const cityMap: Record<string, string[]> = {
        "new-york": ["Carnegie Hall", "Lincoln Center", "Juilliard School", "Manhattan School of Music", "Frick Collection"],
        "los-angeles": ["Walt Disney Concert Hall", "Hollywood Bowl", "UCLA Royce Hall", "LA Opera"]
      };
      
      const cityVenues = cityMap[filters.city] || [];
      filtered = filtered.filter(event => 
        cityVenues.some(venue => event.venue.includes(venue))
      );
    }
    
    // Filter by event type
    if (filters.eventType !== "all") {
      if (filters.eventType === "free") {
        filtered = filtered.filter(event => event.priceType === "free");
      } else {
        filtered = filtered.filter(event => event.category === filters.eventType);
      }
    }
    
    setFilteredEvents(filtered);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "discover":
        return (
          <div className="space-y-6">
            <HeroSection />
            
            <SearchSection 
              onSearchResults={handleSearchResults}
              onFilterChange={handleFilterChange}
            />
            
            {searchResults.length > 0 && (
              <div className="mb-6">
                <h3 className="font-elegant text-lg font-semibold mb-3 text-burgundy">Search Results</h3>
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-4 bg-card rounded-lg border border-border/50">
                      <h4 className="font-semibold text-burgundy">{result.title}</h4>
                      <p className="text-sm text-muted-foreground">{result.venue} • {result.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h2 className="font-elegant text-xl font-semibold mb-4 text-burgundy">
                Upcoming Events 
                {filteredEvents.length !== mockEvents.length && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({filteredEvents.length} of {mockEvents.length})
                  </span>
                )}
              </h2>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={handleEventSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "journal":
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="font-elegant text-xl text-burgundy flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Your Concert Journal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-burgundy">12</div>
                    <div className="text-sm text-muted-foreground">Concerts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">8</div>
                    <div className="text-sm text-muted-foreground">This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">5</div>
                    <div className="text-sm text-muted-foreground">Badges</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-burgundy">Recent Entries</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-card rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Mozart Piano Concerto</span>
                        <span className="text-xs text-muted-foreground">March 10</span>
                      </div>
                      <p className="text-xs text-muted-foreground">"The piano sounded like liquid gold flowing through the hall. Absolutely magical!"</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Bach & Beyond Recital</span>
                        <span className="text-xs text-muted-foreground">March 8</span>
                      </div>
                      <p className="text-xs text-muted-foreground">"First time hearing Goldberg Variations live. Each variation was like a different world!"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center p-2 bg-gold/10 text-burgundy border-gold/30">
                    <Star className="w-4 h-4 mr-1" />
                    First Concert
                  </Badge>
                  <Badge variant="outline" className="justify-center p-2 bg-accent/10 text-accent-foreground border-accent/30">
                    <Music className="w-4 h-4 mr-1" />
                    Mozart Fan
                  </Badge>
                  <Badge variant="outline" className="justify-center p-2 bg-burgundy/10 text-burgundy border-burgundy/30">
                    <Calendar className="w-4 h-4 mr-1" />
                    Regular Attendee
                  </Badge>
                  <Badge variant="outline" className="justify-center p-2 bg-muted/50 text-muted-foreground border-muted">
                    <Trophy className="w-4 h-4 mr-1" />
                    Coming Soon...
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "post":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="font-elegant text-xl text-burgundy">Post Your Recital</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePostRecital({}); }}>
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="e.g., Student Piano Recital: Chopin & Debussy" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="e.g., Manhattan School of Music - Hubbard Hall" />
                </div>
                
                <div>
                  <Label htmlFor="price-type">Price Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="ticketed">Ticketed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="program">Program</Label>
                  <Textarea
                    id="program"
                    placeholder="List the pieces you'll be performing, one per line"
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-elegant">
                  Post Recital
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      case "chat":
        return <ChatBot />;

      case "profile":
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-subtle">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-elegant rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Music className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="font-elegant text-xl font-semibold text-burgundy">Classical Music Explorer</h2>
                  <p className="text-muted-foreground text-sm">Member since March 2024</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy">Your Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Concerts Attended</span>
                    <span className="font-semibold text-burgundy">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Journal Entries</span>
                    <span className="font-semibold text-burgundy">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Badges Earned</span>
                    <span className="font-semibold text-burgundy">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Favorite Composer</span>
                    <span className="font-semibold text-burgundy">Mozart</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pb-20">
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;