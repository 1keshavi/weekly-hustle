import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  isOrganizer?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard = ({ event, isOrganizer, onEdit, onDelete }: EventCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const [isGoing, setIsGoing] = useState(false);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] bg-gradient-to-br from-card to-card/95 border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {event.title}
              </h3>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {event.category}
            </Badge>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatDateTime(event.event_date_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.interested_count} interested · {event.going_count} going</span>
          </div>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-primary" />
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-primary/5 text-primary border-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="pt-4 flex gap-3">
          {!isOrganizer && (
            <>
              <Button
                variant={isInterested ? "default" : "outline"}
                size="sm"
                onClick={() => setIsInterested(!isInterested)}
                className="flex-1 transition-all duration-200"
              >
                {isInterested ? "✓ Interested" : "Interested"}
              </Button>
              <Button
                variant={isGoing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsGoing(!isGoing)}
                className="flex-1 transition-all duration-200"
              >
                {isGoing ? "✓ Going" : "Going"}
              </Button>
            </>
          )}
          {isOrganizer && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(event)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(event.id)}
                className="flex-1"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
