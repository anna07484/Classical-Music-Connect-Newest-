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
import { Trophy, Calendar, Star, Music, MapPin } from "lucide-react";
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
        "new-york": ["NY", "NewYork", "Carnegie Hall", "Lincoln Center", "Juilliard School", "Manhattan School of Music", "Frick Collection"],
        "los-angeles": ["LA", "Los Angeles", "Walt Disney Concert Hall", "Hollywood Bowl", "UCLA Royce Hall", "LA Opera"]
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
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 border-warm-gray/20 bg-gradient-to-br from-card to-cream/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-elegant text-lg font-semibold text-foreground group-hover:text-burgundy transition-colors line-clamp-2">
                              {result.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{result.venue}</span>
                              {result.location && (
                                <>
                                  <span>•</span>
                                  <span>{result.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {result.description && (
                          <p className="text-sm text-muted-foreground mb-3">{result.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                            Search Result
                          </Badge>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-primary-foreground transition-all"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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

      case "learn":
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="font-elegant text-xl text-burgundy flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Discover Classical Music
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Explore the rich world of classical music through composers, forms, and fascinating facts.</p>
              </CardContent>
            </Card>

            {/* Composer Spotlight */}
            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy">🎼 Composer of the Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-elegant rounded-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-burgundy">Wolfgang Amadeus Mozart</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Austrian composer (1756-1791) who created over 600 works including symphonies, concertos, and operas. 
                        Known for his incredible musical genius from a young age.
                      </p>
                      <Badge variant="outline" className="mt-2 bg-accent/10 text-accent-foreground border-accent/30">
                        Classical Period
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Musical Forms Explained */}
            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy">🎻 Learn the Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <h4 className="font-semibold text-sm text-burgundy">Symphony</h4>
                    <p className="text-xs text-muted-foreground">A large orchestral work, usually in 4 movements, showcasing the full power of an orchestra.</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <h4 className="font-semibold text-sm text-burgundy">Concerto</h4>
                    <p className="text-xs text-muted-foreground">A piece featuring a solo instrument accompanied by an orchestra, highlighting virtuosity.</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <h4 className="font-semibold text-sm text-burgundy">Opera</h4>
                    <p className="text-xs text-muted-foreground">A dramatic work combining singing, orchestral music, and often dance and staging.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Listening Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy">🎧 Listen Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-sm text-burgundy">Top 5 Piano Concertos</h4>
                    <p className="text-xs text-muted-foreground mb-2">Essential listening for piano lovers</p>
                    <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground">
                      🎵 Listen on Spotify
                    </Button>
                  </div>
                  <div className="p-3 bg-burgundy/5 rounded-lg border border-burgundy/20">
                    <h4 className="font-semibold text-sm text-burgundy">Mozart's Greatest Hits</h4>
                    <p className="text-xs text-muted-foreground mb-2">Perfect introduction to classical music</p>
                    <Button variant="outline" size="sm" className="border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-primary-foreground">
                      🎵 Listen on YouTube
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Did You Know Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="font-elegant text-lg text-burgundy">💡 Did You Know?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-subtle rounded-lg border border-gold/20">
                  <p className="text-sm text-foreground font-medium mb-2">🎼 Fun Fact</p>
                  <p className="text-sm text-muted-foreground">
                    Beethoven was completely deaf when he composed his legendary 9th Symphony, including the famous "Ode to Joy"!
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3 text-xs text-burgundy hover:text-burgundy hover:bg-burgundy/10">
                    Show me another fact →
                  </Button>
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

      case "assistant":
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