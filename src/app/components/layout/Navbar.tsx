import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Search,
  Building2,
  PlusCircle,
  Info,
  Phone,
  HelpCircle,
  Bell,
  Globe,
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useAuth } from "../../data/auth";
import { AVATARS } from "../../data/properties";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { currentUser, isLoggedIn, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-md shadow-sm";
  const textColor = isHome && !scrolled ? "text-white" : "text-[#374151]";
  const logoColor = isHome && !scrolled ? "text-white" : "text-[#2563EB]";

  const navLinks = [
    { label: "Browse Hostels", to: "/search" },
    { label: "Bachelor Flats", to: "/search?type=bachelor-flat" },
    { label: "List Property", to: "/owner-dashboard" },
    { label: "About Us", to: "/#about" },
    { label: "Contact", to: "/#contact" },
  ];

  const getUserAvatar = () => {
    if (!currentUser) return "";
    if (currentUser.avatar) return currentUser.avatar;
    // Fallback to AVATARS based on user name/gender
    if (currentUser.name === "Priya Sharma") return AVATARS.woman1;
    if (currentUser.name === "Rajesh Kumar") return AVATARS.man2;
    if (currentUser.name === "Anil Mehta") return AVATARS.man1;
    return AVATARS.man1;
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        initial={false}
        animate={{ height: scrolled ? 64 : 80 }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 ${logoColor}`}>
            <Home className="h-7 w-7" />
            <span className="font-['Poppins'] text-[22px]" style={{ fontWeight: 700 }}>
              RoomFinder
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`group relative px-4 py-2 text-[15px] transition-colors hover:text-[#2563EB] ${textColor}`}
                style={{ fontWeight: 500 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#2563EB] transition-all duration-200 group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button className={`rounded-full p-2 transition-colors hover:bg-white/10 ${textColor}`}>
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className={`relative rounded-full p-2 transition-colors hover:bg-white/10 ${textColor}`}>
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#EF4444]" />
            </button>

            {isLoggedIn && currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-transparent p-1 pr-3 transition-all hover:border-[#E5E7EB] hover:bg-white/80"
                >
                  <ImageWithFallback
                    src={getUserAvatar()}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className={`text-[14px] ${textColor}`} style={{ fontWeight: 500 }}>
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${textColor} ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-[240px] rounded-xl border border-[#E5E7EB] bg-white py-2 shadow-xl"
                    >
                      <div className="border-b border-[#E5E7EB] px-4 pb-3 pt-1">
                        <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{currentUser.name}</p>
                        <p className="text-[12px] text-[#6B7280]">{currentUser.email}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] ${
                          currentUser.role === "owner" ? "bg-[#FFF7ED] text-[#F97316]" : "bg-[#EFF6FF] text-[#2563EB]"
                        }`} style={{ fontWeight: 600 }}>
                          {currentUser.role === "owner" ? "Property Owner" : "User"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to={currentUser.role === "owner" ? "/owner-dashboard" : "/dashboard"}
                          className="flex items-center gap-3 px-4 py-2 text-[14px] text-[#374151] transition-colors hover:bg-[#F3F4F6]"
                          style={{ fontWeight: 500 }}
                        >
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        {currentUser.role === "user" && (
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-[14px] text-[#374151] transition-colors hover:bg-[#F3F4F6]"
                            style={{ fontWeight: 500 }}
                          >
                            <Heart className="h-4 w-4" /> Saved Properties
                          </Link>
                        )}
                        <Link
                          to={currentUser.role === "owner" ? "/owner-dashboard" : "/dashboard"}
                          className="flex items-center gap-3 px-4 py-2 text-[14px] text-[#374151] transition-colors hover:bg-[#F3F4F6]"
                          style={{ fontWeight: 500 }}
                        >
                          <Settings className="h-4 w-4" /> Settings
                        </Link>
                      </div>

                      <div className="border-t border-[#E5E7EB] pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2 text-[14px] text-[#EF4444] transition-colors hover:bg-[#FEE2E2]"
                          style={{ fontWeight: 500 }}
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 text-[15px] transition-colors hover:text-[#2563EB] ${textColor}`}
                  style={{ fontWeight: 500 }}
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg bg-[#F97316] px-5 py-2.5 text-[15px] text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`rounded-lg p-2 lg:hidden ${textColor}`}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-[70] w-[280px] bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <Link to="/" className="flex items-center gap-2 text-[#2563EB]">
                  <Home className="h-6 w-6" />
                  <span className="font-['Poppins'] text-[20px]" style={{ fontWeight: 700 }}>
                    RoomFinder
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User info in mobile menu */}
              {isLoggedIn && currentUser && (
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={getUserAvatar()}
                      alt={currentUser.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{currentUser.name}</p>
                      <p className="text-[12px] text-[#6B7280]">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col p-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[#374151] transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                      style={{ fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="my-4 border-t border-gray-200" />
                {isLoggedIn && currentUser ? (
                  <>
                    <Link
                      to={currentUser.role === "owner" ? "/owner-dashboard" : "/dashboard"}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[#374151] hover:bg-[#EFF6FF]"
                      style={{ fontWeight: 500 }}
                    >
                      <LayoutDashboard className="h-5 w-5" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[#EF4444] hover:bg-[#FEE2E2]"
                      style={{ fontWeight: 500 }}
                    >
                      <LogOut className="h-5 w-5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[#374151] hover:bg-[#EFF6FF]"
                      style={{ fontWeight: 500 }}
                    >
                      <User className="h-5 w-5" /> Login
                    </Link>
                    <Link
                      to="/login"
                      className="mt-3 rounded-lg bg-[#F97316] py-3 text-center text-[15px] text-white"
                      style={{ fontWeight: 600 }}
                    >
                      Sign Up Free
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
