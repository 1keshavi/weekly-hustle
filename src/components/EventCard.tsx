import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  event: Event;
  isOrganizer?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard = ({ event, isOrganizer, onEdit, onDelete }: EventCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isInterested, setIsInterested] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const [interestedCount, setInterestedCount] = useState(event.interested_count);
  const [goingCount, setGoingCount] = useState(event.going_count);

  useEffect(() => {
    if (user && !isOrganizer) {
      fetchParticipationStatus();
    }
  }, [user, event.id]);

  const fetchParticipationStatus = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("event_participation")
      .select("status")
      .eq("event_id", event.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!error && data) {
      setIsInterested(data.status === "interested");
      setIsGoing(data.status === "going");
    }
  };

  const handleParticipation = async (status: "interested" | "going") => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to participate in events",
      });
      return;
    }

    const newIsInterested = status === "interested" ? !isInterested : false;
    const newIsGoing = status === "going" ? !isGoing : false;

    // If both are false, delete the participation record
    if (!newIsInterested && !newIsGoing) {
      const { error } = await supabase
        .from("event_participation")
        .delete()
        .eq("event_id", event.id)
        .eq("user_id", user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }
    } else {
      // Upsert the participation record
      const { error } = await supabase
        .from("event_participation")
        .upsert({
          event_id: event.id,
          user_id: user.id,
          status: status,
        }, {
          onConflict: "user_id,event_id"
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }
    }

    // Update local state
    setIsInterested(newIsInterested);
    setIsGoing(newIsGoing);

    // Fetch updated counts
    const { data: eventData } = await supabase
      .from("events")
      .select("interested_count, going_count")
      .eq("id", event.id)
      .single();

    if (eventData) {
      setInterestedCount(eventData.interested_count);
      setGoingCount(eventData.going_count);
    }
  };

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
            <span>{interestedCount} interested · {goingCount} going</span>
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
                onClick={() => handleParticipation("interested")}
                className="flex-1 transition-all duration-200"
              >
                {isInterested ? "✓ Interested" : "Interested"}
              </Button>
              <Button
                variant={isGoing ? "default" : "outline"}
                size="sm"
                onClick={() => handleParticipation("going")}
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
