import { Calendar, MapPin, Clock, Star, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  priceType: "free" | "ticketed";
  price?: string;
  program: string[];
  category: "concert" | "recital";
  beginnerFriendly: boolean;
}

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export const EventCard = ({ event, onSelect }: EventCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 border-warm-gray/20 bg-gradient-to-br from-card to-cream/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-elegant text-lg font-semibold text-foreground group-hover:text-burgundy transition-colors line-clamp-2">
              {event.title}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant={event.category === "recital" ? "secondary" : "default"}
              className={event.category === "recital" ? "bg-gold/20 text-burgundy border-gold/30" : "bg-burgundy/10 text-burgundy border-burgundy/20"}
            >
              {event.category === "recital" ? "Student Recital" : "Concert"}
            </Badge>
            {event.beginnerFriendly && (
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent/30">
                <BookOpen className="w-3 h-3 mr-1" />
                Beginner Friendly
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{event.venue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant={event.priceType === "free" ? "secondary" : "outline"}
              className={event.priceType === "free" ? "bg-accent text-accent-foreground" : ""}
            >
              {event.priceType === "free" ? "Free" : event.price || "Ticketed"}
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSelect(event)}
            className="border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-primary-foreground transition-all"
          >
            View Details
          </Button>
        </div>
        
        {event.program.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Featured: {event.program.slice(0, 2).join(", ")}
              {event.program.length > 2 && "..."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};