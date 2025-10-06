import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [role, setRole] = useState<"student" | "organizer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password, role);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Students must use a @college.edu email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Logged in successfully",
    });

    navigate(role === "student" ? "/student-feed" : "/organizer-dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(email, password, role);
    
    if (!success) {
      toast({
        title: "Signup Failed",
        description: "Students must use a @college.edu email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Account created successfully",
    });

    navigate(role === "student" ? "/student-feed" : "/organizer-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <BackgroundAnimation />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <Link to="/">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
            CAMPUS-POP
          </h1>
        </Link>

        <Card className="p-8 shadow-[var(--shadow-card-hover)] border-primary/20">
          <Tabs defaultValue="student" onValueChange={(value) => setRole(value as "student" | "organizer")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="organizer">Organizer</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">College Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-email">College Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="student@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">Must end with @college.edu</p>
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Sign Up</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="organizer">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="org-email">Email</Label>
                      <Input
                        id="org-email"
                        type="email"
                        placeholder="organizer@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-password">Password</Label>
                      <Input
                        id="org-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="org-signup-email">Email</Label>
                      <Input
                        id="org-signup-email"
                        type="email"
                        placeholder="organizer@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-signup-password">Password</Label>
                      <Input
                        id="org-signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Sign Up</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
