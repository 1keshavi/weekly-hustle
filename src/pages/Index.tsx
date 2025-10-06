import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Sparkles, TrendingUp } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
              CAMPUS-POP
            </h1>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </nav>
        </header>

        <main className="container mx-auto px-4">
          <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent leading-tight">
                Discover Campus Events
                <br />
                <span className="text-5xl md:text-6xl">That Matter</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Your weekly guide to the most exciting events, workshops, and activities happening on campus
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-[var(--shadow-card-hover)] hover:scale-105 transition-transform">
                    <Users className="mr-2 h-5 w-5" />
                    Join as Student
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:scale-105 transition-transform">
                    <Calendar className="mr-2 h-5 w-5" />
                    Organizer Login
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Weekly Events</h3>
              <p className="text-muted-foreground">
                Curated events happening this week - never miss what matters
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Filters</h3>
              <p className="text-muted-foreground">
                Find events by category, date, popularity, and more
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Stay Connected</h3>
              <p className="text-muted-foreground">
                Mark your interest and track events you're attending
              </p>
            </div>
          </section>

          <section className="py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-bold mb-6">For Event Organizers</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Create and manage your campus events with ease. Reach students where they are and track engagement in real-time.
              </p>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Start Organizing
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 CAMPUS-POP. Making campus life more connected.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
