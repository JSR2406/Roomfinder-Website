import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "owner";
  avatar: string;
  phone: string;
  gender: string;
  location: string;
  verified: boolean;
  memberSince: string;
}

const MOCK_USERS: AppUser[] = [
  {
    id: "user-1",
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "priya123",
    role: "user",
    avatar: "", // will be set from AVATARS
    phone: "+91 98765 43210",
    gender: "Female",
    location: "Pimpri-Chinchwad, Pune",
    verified: true,
    memberSince: "January 2026",
  },
  {
    id: "owner-1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "rajesh123",
    role: "owner",
    avatar: "",
    phone: "+91 99887 76543",
    gender: "Male",
    location: "Pimpri, Pune",
    verified: true,
    memberSince: "October 2025",
  },
  {
    id: "user-2",
    name: "Anil Mehta",
    email: "anil@example.com",
    password: "anil123",
    role: "user",
    avatar: "",
    phone: "+91 97654 32100",
    gender: "Male",
    location: "Chinchwad, Pune",
    verified: true,
    memberSince: "February 2026",
  },
];

interface AuthContextType {
  currentUser: AppUser | null;
  allUsers: AppUser[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, role: "user" | "owner") => { success: boolean; error?: string };
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>(() => {
    const saved = localStorage.getItem("rf_users");
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("rf_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("rf_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("rf_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("rf_current_user");
    }
  }, [currentUser]);

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const signup = (name: string, email: string, password: string, role: "user" | "owner") => {
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }
    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
      avatar: "",
      phone: "",
      gender: "",
      location: "Pimpri-Chinchwad, Pune",
      verified: false,
      memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers: users,
        login,
        signup,
        logout,
        isLoggedIn: currentUser !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
