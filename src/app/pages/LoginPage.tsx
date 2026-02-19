import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { Home, Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, UserCircle } from "lucide-react";
import { useAuth } from "../data/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "owner">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
      const result = signup(name, email, password, role);
      if (result.success) {
        toast.success("Account created successfully! Welcome to RoomFinder.");
        navigate(role === "owner" ? "/owner-dashboard" : "/dashboard");
      } else {
        setError(result.error || "Signup failed");
      }
    } else {
      const result = login(email, password);
      if (result.success) {
        toast.success("Welcome back!");
        // redirect based on role from login context
        const savedUser = JSON.parse(localStorage.getItem("rf_current_user") || "{}");
        navigate(savedUser.role === "owner" ? "/owner-dashboard" : "/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    }
  };

  const demoAccounts = [
    { name: "Priya Sharma", email: "priya@example.com", password: "priya123", role: "User" },
    { name: "Rajesh Kumar", email: "rajesh@example.com", password: "rajesh123", role: "Owner" },
    { name: "Anil Mehta", email: "anil@example.com", password: "anil123", role: "User" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF6FF] via-white to-[#FFF7ED] px-4 pt-20 pb-12"
    >
      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-[#2563EB]">
            <Home className="h-8 w-8" />
            <span className="font-['Poppins'] text-[28px]" style={{ fontWeight: 700 }}>
              RoomFinder
            </span>
          </Link>
          <p className="mt-2 text-[16px] text-[#6B7280]">
            {isSignUp ? "Create your account to get started" : "Welcome back! Sign in to your account"}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-xl shadow-black/5"
        >
          {/* Toggle Login / Sign Up */}
          <div className="mb-6 flex rounded-xl bg-[#F3F4F6] p-1">
            <button
              onClick={() => { setIsSignUp(false); setError(""); }}
              className={`flex-1 rounded-lg py-2.5 text-[14px] transition-all ${
                !isSignUp ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
              }`}
              style={{ fontWeight: 600 }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); }}
              className={`flex-1 rounded-lg py-2.5 text-[14px] transition-all ${
                isSignUp ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
              }`}
              style={{ fontWeight: 600 }}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 rounded-lg bg-[#FEE2E2] px-4 py-3 text-[14px] text-[#DC2626]"
              style={{ fontWeight: 500 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (sign up only) */}
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[#D1D5DB] py-3 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#D1D5DB] py-3 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#D1D5DB] py-3 pl-11 pr-12 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Role (sign up only) */}
            {isSignUp && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="mb-2 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("user")}
                    className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left transition-all ${
                      role === "user"
                        ? "border-[#2563EB] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] hover:border-[#D1D5DB]"
                    }`}
                  >
                    <UserCircle className={`h-6 w-6 ${role === "user" ? "text-[#2563EB]" : "text-[#9CA3AF]"}`} />
                    <div>
                      <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>Find a Room</p>
                      <p className="text-[12px] text-[#6B7280]">Browse & book</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("owner")}
                    className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left transition-all ${
                      role === "owner"
                        ? "border-[#F97316] bg-[#FFF7ED]"
                        : "border-[#E5E7EB] hover:border-[#D1D5DB]"
                    }`}
                  >
                    <Building2 className={`h-6 w-6 ${role === "owner" ? "text-[#F97316]" : "text-[#9CA3AF]"}`} />
                    <div>
                      <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>List Property</p>
                      <p className="text-[12px] text-[#6B7280]">Manage listings</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Forgot password (login only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[13px] text-[#374151]">
                  <input type="checkbox" className="rounded accent-[#2563EB]" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-[13px] text-[#2563EB]" style={{ fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] py-3.5 text-[15px] text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
              style={{ fontWeight: 600 }}
            >
              {isSignUp ? "Create Account" : "Sign In"} <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-[13px] text-[#9CA3AF]">Demo Accounts</span>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          {/* Demo accounts quick login */}
          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <motion.button
                key={acc.email}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setEmail(acc.email);
                  setPassword(acc.password);
                  setIsSignUp(false);
                  setError("");
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] px-4 py-3 text-left transition-all hover:border-[#2563EB] hover:bg-[#EFF6FF]"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  acc.role === "Owner" ? "bg-[#FFF7ED] text-[#F97316]" : "bg-[#EFF6FF] text-[#2563EB]"
                }`}>
                  {acc.role === "Owner" ? <Building2 className="h-5 w-5" /> : <UserCircle className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{acc.name}</p>
                  <p className="text-[12px] text-[#6B7280]">{acc.email} &middot; {acc.role}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] ${
                  acc.role === "Owner" ? "bg-[#FFF7ED] text-[#F97316]" : "bg-[#EFF6FF] text-[#2563EB]"
                }`} style={{ fontWeight: 600 }}>
                  {acc.role}
                </span>
              </motion.button>
            ))}
          </div>

          <p className="mt-4 text-center text-[12px] text-[#9CA3AF]">
            Click a demo account to pre-fill credentials, then hit Sign In
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}