import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ChatBot } from "@/components/ChatBot";
import { SearchSection } from "@/components/SearchSection";
import { MusicTheorySection } from "@/components/MusicTheorySection";
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

  const renderContent = () => {
    switch (activeTab) {
      case "discover":
        return (
          <div className="space-y-6">
            <HeroSection />
            <SearchSection />
            <div>
              <h2 className="font-elegant text-xl font-semibold mb-4 text-burgundy">Upcoming Events</h2>
              <div className="space-y-4">
                {mockEvents.map((event) => (
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
        return <MusicTheorySection />;

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
            <span className="text-sm">Lessons Completed</span>
            <span className="font-semibold text-burgundy">4</span>
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