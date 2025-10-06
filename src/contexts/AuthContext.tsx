import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  role: "student" | "organizer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "student" | "organizer") => Promise<boolean>;
  signup: (email: string, password: string, role: "student" | "organizer") => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: "student" | "organizer") => {
    if (role === "student" && !email.endsWith("@college.edu")) {
      return false;
    }
    setUser({ email, role });
    return true;
  };

  const signup = async (email: string, password: string, role: "student" | "organizer") => {
    if (role === "student" && !email.endsWith("@college.edu")) {
      return false;
    }
    setUser({ email, role });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
