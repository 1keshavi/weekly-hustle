import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from "@/components/EventCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { useAuth } from "@/contexts/AuthContext";
import { Event, INITIAL_EVENTS } from "@/types/event";
import { toast } from "@/hooks/use-toast";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    club: "",
    description: "",
    category: "",
    tags: "",
    dateTime: "",
    venue: "",
  });

  if (!user || user.role !== "organizer") {
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventDate = new Date(formData.dateTime);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (eventDate < now || eventDate > weekFromNow) {
      toast({
        title: "Invalid Date",
        description: "Event must be within the current week",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      club: formData.club,
      description: formData.description,
      category: formData.category,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      dateTime: formData.dateTime,
      venue: formData.venue,
      createdBy: user.email,
      interested: 0,
      going: 0,
    };

    setEvents([newEvent, ...events]);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      club: "",
      description: "",
      category: "",
      tags: "",
      dateTime: "",
      venue: "",
    });

    toast({
      title: "Success",
      description: "Event created successfully",
    });
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Success",
      description: "Event deleted successfully",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      
      <div className="relative z-10">
        <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
              CAMPUS-POP
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">Organizer Dashboard</h2>
              <p className="text-muted-foreground">Manage your campus events</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="club">Club Name *</Label>
                    <Input
                      id="club"
                      required
                      value={formData.club}
                      onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Competition">Competition</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Audition">Audition</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., Technology, Networking, Career"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateTime">Date & Time *</Label>
                    <Input
                      id="dateTime"
                      type="datetime-local"
                      required
                      value={formData.dateTime}
                      onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      required
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Create Event</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events yet. Create your first event!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isOrganizer
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
