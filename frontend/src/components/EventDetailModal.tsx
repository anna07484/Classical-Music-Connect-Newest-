import { Calendar, MapPin, Clock, Heart, BookmarkPlus, Share2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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
  beginnersNotes?: {
    context: string;
    listenFor: string;
    funFact: string;
  };
}

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal = ({ event, isOpen, onClose }: EventDetailModalProps) => {
  const { toast } = useToast();

  if (!event) return null;

  const handleSave = () => {
    toast({
      title: "Event Saved",
      description: "Added to your saved events list",
    });
  };

  const handleAttended = () => {
    toast({
      title: "Concert Logged!",
      description: "Added to your concert journal. Keep building your classical music journey!",
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: event.title,
      text: `Check out this classical music event: ${event.title} at ${event.venue}`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-elegant text-2xl text-burgundy pr-8">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-burgundy" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-burgundy" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <MapPin className="w-4 h-4 text-burgundy" />
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={event.category === "recital" ? "secondary" : "default"}
              className={event.category === "recital" ? "bg-gold/20 text-burgundy border-gold/30" : "bg-burgundy/10 text-burgundy border-burgundy/20"}
            >
              {event.category === "recital" ? "Student Recital" : "Concert"}
            </Badge>
            <Badge 
              variant={event.priceType === "free" ? "secondary" : "outline"}
              className={event.priceType === "free" ? "bg-accent text-accent-foreground" : ""}
            >
              {event.priceType === "free" ? "Free" : event.price || "Ticketed"}
            </Badge>
            {event.beginnerFriendly && (
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent/30">
                Beginner Friendly
              </Badge>
            )}
          </div>

          {/* Program */}
          <div>
            <h3 className="font-elegant text-lg font-semibold mb-3 text-burgundy">Program</h3>
            <div className="space-y-2">
              {event.program.map((piece, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>{piece}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Beginners Panel */}
          {event.beginnerFriendly && event.beginnersNotes && (
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-gold/5">
              <CardHeader>
                <CardTitle className="text-lg font-elegant text-burgundy flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  For Beginners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-burgundy mb-1">Context</h4>
                  <p className="text-sm text-muted-foreground">{event.beginnersNotes.context}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-burgundy mb-1">What to Listen For</h4>
                  <p className="text-sm text-muted-foreground">{event.beginnersNotes.listenFor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-burgundy mb-1">Fun Fact</h4>
                  <p className="text-sm text-muted-foreground">{event.beginnersNotes.funFact}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} variant="outline" className="flex-1 min-w-[120px]">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Save Event
            </Button>
            <Button onClick={handleAttended} className="flex-1 min-w-[120px] bg-gradient-elegant hover:opacity-90">
              <Heart className="w-4 h-4 mr-2" />
              I Attended
            </Button>
            <Button onClick={handleShare} variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};