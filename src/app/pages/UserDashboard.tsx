import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Home, Heart, Calendar, MessageCircle, User, Bell, HelpCircle, LogOut,
  PlusCircle, Search, ArrowRight, Eye, TrendingUp, Clock, Star, CheckCircle2,
  ChevronRight, Settings, Send, AlertCircle, Info, Trash2, X, BookOpen, Phone, Mail, FileText,
} from "lucide-react";
import { properties, AVATARS } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../data/auth";
import { useMessaging } from "../data/messaging";
import { toast } from "sonner";

const menuItems = [
  { icon: Home, label: "Dashboard", key: "dashboard", badge: 0 },
  { icon: Heart, label: "Saved Properties", key: "saved", badge: 5 },
  { icon: Calendar, label: "My Bookings", key: "bookings", badge: 2 },
  { icon: MessageCircle, label: "Messages", key: "messages", badge: 3 },
  { icon: User, label: "Profile Settings", key: "profile", badge: 0 },
  { icon: Bell, label: "Notifications", key: "notifications", badge: 3 },
  { icon: HelpCircle, label: "Help & Support", key: "help", badge: 0 },
];

const stats = [
  { icon: Heart, label: "Saved Properties", value: 5, trend: "+2 this week", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" },
  { icon: Calendar, label: "Active Bookings", value: 2, trend: "1 pending", color: "text-[#10B981]", bg: "bg-[#D1FAE5]" },
  { icon: MessageCircle, label: "Unread Messages", value: 3, trend: "+3 today", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { icon: Eye, label: "Profile Views", value: 12, trend: "+5 this week", color: "text-[#8B5CF6]", bg: "bg-[#EDE9FE]" },
];

const activities = [
  { icon: Heart, color: "text-[#2563EB] bg-[#EFF6FF]", text: 'You saved "Sunshine PG for Boys"', time: "2 hours ago" },
  { icon: CheckCircle2, color: "text-[#10B981] bg-[#D1FAE5]", text: "Booking confirmed for Royal Hostel", time: "Yesterday" },
  { icon: MessageCircle, color: "text-[#F59E0B] bg-[#FEF3C7]", text: "New message from property owner", time: "2 days ago" },
  { icon: Eye, color: "text-[#8B5CF6] bg-[#EDE9FE]", text: "Your profile was viewed 5 times", time: "3 days ago" },
  { icon: Star, color: "text-[#F59E0B] bg-[#FEF3C7]", text: "You reviewed Modern PG", time: "1 week ago" },
];

const bookings = [
  { id: "BOOK12345", property: properties[0], room: "Single Room", checkIn: "March 1, 2026", status: "Confirmed", price: 8000, category: "active" },
  { id: "BOOK12346", property: properties[1], room: "Double Sharing", checkIn: "Feb 15, 2026", status: "Pending", price: 7500, category: "active" },
  { id: "BOOK12340", property: properties[2], room: "1 BHK", checkIn: "Dec 1, 2025", checkOut: "Jan 31, 2026", status: "Completed", price: 12000, category: "past" },
  { id: "BOOK12341", property: properties[3], room: "Double Sharing", checkIn: "Oct 15, 2025", checkOut: "Dec 14, 2025", status: "Completed", price: 6500, category: "past" },
  { id: "BOOK12342", property: properties[4], room: "Single Room", checkIn: "Sep 1, 2025", checkOut: "Nov 30, 2025", status: "Completed", price: 8500, category: "past" },
  { id: "BOOK12343", property: properties[5], room: "Studio", checkIn: "Feb 20, 2026", status: "Cancelled", price: 15000, category: "cancelled", cancelReason: "Found a closer option" },
];

// Contact name lookup for non-auth users in conversations
const CONTACT_MAP: Record<string, { name: string; avatar: string; property?: string }> = {
  "owner-1": { name: "Rajesh Kumar", avatar: AVATARS.man2, property: "Sunshine PG" },
  "user-sunita": { name: "Sunita Patil", avatar: AVATARS.woman2, property: "Royal Girls Hostel" },
  "user-amit": { name: "Amit Deshmukh", avatar: AVATARS.man1, property: "Urban Living" },
  "owner-vinod": { name: "Vinod Jadhav", avatar: AVATARS.man2, property: "Green Valley PG" },
  "owner-meera": { name: "Meera Shah", avatar: AVATARS.woman1, property: "Comfort Zone Ladies PG" },
  "owner-prashant": { name: "Prashant More", avatar: AVATARS.man1, property: "Metro Heights Studio" },
  "user-1": { name: "Priya Sharma", avatar: AVATARS.woman1 },
  "user-2": { name: "Anil Mehta", avatar: AVATARS.man1 },
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { currentUser, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation state from Chat Now button on PropertyDetailsPage
  useEffect(() => {
    const state = location.state as { tab?: string; chatId?: string } | null;
    if (state?.tab) {
      setActiveTab(state.tab);
    }
    if (state?.chatId) {
      setSelectedChat(state.chatId);
    }
    // Clear the state so it doesn't persist on refresh
    if (state?.tab || state?.chatId) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-[#D1D5DB]" />
          <h2 className="mt-4 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Please Sign In</h2>
          <p className="mt-2 text-[16px] text-[#6B7280]">You need to be logged in to access your dashboard.</p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-8 py-3 text-[15px] text-white transition-all hover:bg-[#1D4ED8]"
            style={{ fontWeight: 600 }}
          >
            Sign In <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const getUserAvatar = () => {
    if (currentUser.avatar) return currentUser.avatar;
    if (currentUser.name === "Priya Sharma") return AVATARS.woman1;
    if (currentUser.name === "Rajesh Kumar") return AVATARS.man2;
    if (currentUser.name === "Anil Mehta") return AVATARS.man1;
    return AVATARS.man1;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F9FAFB] pt-20">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white lg:block" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div className="sticky top-20 p-6">
            {/* User Profile */}
            <div className="mb-6 text-center">
              <ImageWithFallback src={getUserAvatar()} alt={currentUser.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
              <h3 className="mt-3 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>{currentUser.name}</h3>
              <p className="text-[14px] text-[#6B7280]">{currentUser.email}</p>
              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-[12px] ${
                currentUser.verified ? "bg-[#D1FAE5] text-[#047857]" : "bg-[#FEF3C7] text-[#B45309]"
              }`} style={{ fontWeight: 600 }}>
                {currentUser.verified ? "Verified User" : "Unverified"}
              </span>
            </div>

            <div className="mb-4 border-t border-[#E5E7EB]" />

            {/* Menu */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-all ${
                    activeTab === item.key
                      ? "bg-[#2563EB] text-white"
                      : "text-[#374151] hover:bg-[#F3F4F6]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] ${
                      activeTab === item.key ? "bg-white/20 text-white" : "bg-[#EF4444] text-white"
                    }`} style={{ fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#EF4444] transition-all hover:bg-[#FEE2E2]"
                style={{ fontWeight: 500 }}
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </nav>

            <div className="mt-6">
              <Link
                to="/owner-dashboard"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] py-2.5 text-[14px] text-white transition-all hover:brightness-110"
                style={{ fontWeight: 600 }}
              >
                <PlusCircle className="h-4 w-4" /> List Your Property
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#E5E7EB] bg-white py-2 lg:hidden">
          {[
            { icon: Home, label: "Dashboard", key: "dashboard" },
            { icon: Search, label: "Search", key: "search" },
            { icon: Heart, label: "Saved", key: "saved" },
            { icon: MessageCircle, label: "Messages", key: "messages" },
            { icon: User, label: "Profile", key: "profile" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => item.key === "search" ? window.location.href = "/search" : setActiveTab(item.key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                activeTab === item.key ? "text-[#2563EB]" : "text-[#6B7280]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]" style={{ fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 lg:p-8 lg:pb-8" ref={ref}>
          {activeTab === "dashboard" && <DashboardView inView={inView} userName={currentUser.name} />}
          {activeTab === "saved" && <SavedView />}
          {activeTab === "bookings" && <BookingsView />}
          {activeTab === "messages" && (
            <MessagesView
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentUserId={currentUser.id}
            />
          )}
          {activeTab === "profile" && <ProfileView user={currentUser} />}
          {activeTab === "notifications" && <NotificationsView />}
          {activeTab === "help" && <HelpView />}
        </main>
      </div>
    </motion.div>
  );
}

function DashboardView({ inView, userName }: { inView: boolean; userName: string }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] p-6 sm:p-8"
        style={{ backgroundImage: "radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)" }}
      >
        <h1 className="font-['Poppins'] text-[24px] text-[#1E293B] sm:text-[32px]" style={{ fontWeight: 600 }}>
          Welcome back, {userName.split(" ")[0]}! 👋
        </h1>
        <p className="mt-1 text-[16px] text-[#6B7280] sm:text-[18px]">Find your perfect accommodation today</p>
        <Link
          to="/search"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-[14px] text-[#2563EB] transition-all hover:scale-[1.02]"
          style={{ fontWeight: 600 }}
        >
          Browse Properties <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <div className="font-['Poppins'] text-[32px] text-[#111827]" style={{ fontWeight: 700 }}>{s.value}</div>
            <p className="text-[14px] text-[#6B7280]">{s.label}</p>
            <p className="mt-1 text-[12px] text-[#10B981]" style={{ fontWeight: 500 }}>
              <TrendingUp className="mr-1 inline h-3 w-3" />{s.trend}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Activity */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Recent Activity</h2>
          <button className="text-[14px] text-[#2563EB]" style={{ fontWeight: 600 }}>View All</button>
        </div>
        <div className="space-y-3">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-[#F9FAFB]"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.color}`}>
                <a.icon className="h-5 w-5" />
              </div>
              <p className="flex-1 text-[14px] text-[#374151]">{a.text}</p>
              <span className="shrink-0 text-[13px] text-[#9CA3AF]">{a.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Saved Properties Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Your Saved Properties</h2>
          <button className="text-[14px] text-[#2563EB]" style={{ fontWeight: 600 }}>View All (5)</button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SavedView() {
  const [page, setPage] = useState(1);
  const savedProperties = properties.slice(0, 5);
  const itemsPerPage = 3;
  const totalItems = savedProperties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedSaved = savedProperties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1 className="mb-6 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Saved Properties ({totalItems})</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedSaved.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] transition-colors ${page === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-[#F3F4F6]"}`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] transition-colors ${
                  page === p
                    ? "bg-[#2563EB] text-white shadow-md"
                    : "border border-[#D1D5DB] text-[#374151] hover:bg-[#F3F4F6]"
                }`}
                style={{ fontWeight: page === p ? 600 : 400 }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] transition-colors ${page === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-[#F3F4F6]"}`}
            >
              &gt;
            </button>
          </div>
          <p className="text-[14px] text-[#6B7280]">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} properties
          </p>
        </div>
      )}
    </div>
  );
}

function BookingsView() {
  const [tab, setTab] = useState("active");

  const activeBookings = bookings.filter((b) => b.category === "active");
  const pastBookings = bookings.filter((b) => b.category === "past");
  const cancelledBookings = bookings.filter((b) => b.category === "cancelled");

  const currentBookings = tab === "active" ? activeBookings : tab === "past" ? pastBookings : cancelledBookings;

  const statusStyle = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-[#D1FAE5] text-[#047857]";
      case "Pending": return "bg-[#FEF3C7] text-[#B45309]";
      case "Completed": return "bg-[#EFF6FF] text-[#2563EB]";
      case "Cancelled": return "bg-[#FEE2E2] text-[#DC2626]";
      default: return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>My Bookings</h1>
      <div className="mb-6 flex gap-4 border-b border-[#E5E7EB]">
        {[
          { key: "active", label: `Active (${activeBookings.length})` },
          { key: "past", label: `Past (${pastBookings.length})` },
          { key: "cancelled", label: `Cancelled (${cancelledBookings.length})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-[15px] transition-colors ${
              tab === t.key ? "border-b-[3px] border-[#2563EB] text-[#2563EB]" : "text-[#6B7280] hover:text-[#374151]"
            }`}
            style={{ fontWeight: tab === t.key ? 600 : 500 }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {currentBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-[#6B7280]"
        >
          <Calendar className="mb-3 h-12 w-12 text-[#D1D5DB]" />
          <p className="text-[16px]" style={{ fontWeight: 500 }}>No {tab} bookings</p>
          <p className="mt-1 text-[13px] text-[#9CA3AF]">
            {tab === "active" ? "Browse properties to make your first booking" : `You don't have any ${tab} bookings yet`}
          </p>
          {tab === "active" && (
            <Link
              to="/search"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-[14px] text-white transition-all hover:bg-[#1D4ED8]"
              style={{ fontWeight: 600 }}
            >
              Browse Properties <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {currentBookings.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:flex-row"
            >
              <ImageWithFallback
                src={b.property.image}
                alt={b.property.name}
                className="h-40 w-full rounded-lg object-cover sm:h-auto sm:w-48"
              />
              <div className="flex-1">
                <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>{b.property.name}</h3>
                <p className="text-[13px] text-[#6B7280]" style={{ fontFamily: "monospace" }}>#{b.id}</p>
                <div className="mt-2 space-y-1 text-[14px] text-[#4B5563]">
                  <p>
                    <Clock className="mr-1.5 inline h-3.5 w-3.5 text-[#9CA3AF]" />
                    Check-in: {b.checkIn}
                  </p>
                  {"checkOut" in b && b.checkOut && (
                    <p>
                      <Clock className="mr-1.5 inline h-3.5 w-3.5 text-[#9CA3AF]" />
                      Check-out: {b.checkOut}
                    </p>
                  )}
                  <p>Room: {b.room}</p>
                  <p>Location: {b.property.location}</p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className={`inline-block rounded-full px-3 py-1 text-[12px] ${statusStyle(b.status)}`} style={{ fontWeight: 600 }}>
                    {b.status}
                  </span>
                  {"cancelReason" in b && b.cancelReason && (
                    <span className="text-[12px] text-[#9CA3AF]">Reason: {b.cancelReason}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-[20px] text-[#111827]" style={{ fontWeight: 700 }}>
                  &#8377;{b.price.toLocaleString("en-IN")}<span className="text-[14px] text-[#6B7280]" style={{ fontWeight: 400 }}>/mo</span>
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:items-end">
                  <Link to={`/property/${b.property.id}`} className="rounded-lg border border-[#D1D5DB] px-4 py-1.5 text-[13px] text-[#374151] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]" style={{ fontWeight: 500 }}>
                    View Details
                  </Link>
                  {b.category === "active" && b.status === "Pending" && (
                    <button
                      onClick={() => toast.info("Booking cancellation requested")}
                      className="rounded-lg border border-[#FCA5A5] px-4 py-1.5 text-[13px] text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
                      style={{ fontWeight: 500 }}
                    >
                      Cancel Booking
                    </button>
                  )}
                  {b.category === "past" && (
                    <button
                      onClick={() => toast.success("Review submitted!")}
                      className="rounded-lg border border-[#FCD34D] px-4 py-1.5 text-[13px] text-[#B45309] transition-colors hover:bg-[#FEF3C7]"
                      style={{ fontWeight: 500 }}
                    >
                      Write Review
                    </button>
                  )}
                  {b.category === "cancelled" && (
                    <Link
                      to="/search"
                      className="rounded-lg border border-[#93C5FD] px-4 py-1.5 text-[13px] text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
                      style={{ fontWeight: 500 }}
                    >
                      Book Again
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesView({
  selectedChat,
  setSelectedChat,
  currentUserId,
}: {
  selectedChat: string | null;
  setSelectedChat: (id: string | null) => void;
  currentUserId: string;
}) {
  const { conversations, getConversationsForUser, sendMessage, markAsRead, readStatus } = useMessaging();
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userConversations = getConversationsForUser(currentUserId);

  const filteredConversations = userConversations.filter((conv) => {
    if (!searchQuery) return true;
    const otherId = conv.participants.find((p) => p !== currentUserId) || "";
    const contact = CONTACT_MAP[otherId];
    const name = contact?.name || otherId;
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedConversation = conversations.find((c) => c.id === selectedChat);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation?.messages.length]);

  useEffect(() => {
    if (selectedChat) {
      markAsRead(selectedChat, currentUserId);
    }
  }, [selectedChat, selectedConversation?.messages.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    sendMessage(selectedChat, currentUserId, messageInput.trim());
    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUnreadCount = (conv: typeof conversations[0]) => {
    const lastReadTs = readStatus[conv.id]?.[currentUserId] || 0;
    return conv.messages.filter((m) => m.from !== currentUserId && m.timestamp > lastReadTs).length;
  };

  const getOtherParticipant = (conv: typeof conversations[0]) => {
    const otherId = conv.participants.find((p) => p !== currentUserId) || "";
    return CONTACT_MAP[otherId] || { name: "Unknown User", avatar: AVATARS.man1 };
  };

  return (
    <div>
      <h1 className="mb-4 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Messages</h1>
      <div className="flex h-[600px] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        {/* Conversation List */}
        <div className={`w-full border-r border-[#E5E7EB] sm:w-[320px] ${selectedChat !== null ? "hidden sm:block" : ""}`}>
          <div className="border-b border-[#E5E7EB] p-4">
            <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2">
              <Search className="h-4 w-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[14px] outline-none"
              />
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(600px - 65px)" }}>
            {filteredConversations.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-[14px] text-[#9CA3AF]">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const other = getOtherParticipant(conv);
                const unread = getUnreadCount(conv);
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`flex w-full items-center gap-3 border-b border-[#F3F4F6] px-4 py-3 text-left transition-colors hover:bg-[#F9FAFB] ${
                      selectedChat === conv.id ? "bg-[#EFF6FF]" : ""
                    }`}
                  >
                    <div className="relative">
                      <ImageWithFallback src={other.avatar} alt={other.name} className="h-12 w-12 rounded-full object-cover" />
                      {unread > 0 && <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-[#EF4444]" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{other.name}</span>
                        <span className="text-[12px] text-[#9CA3AF]">{lastMsg?.time || ""}</span>
                      </div>
                      <p className="text-[12px] text-[#6B7280]">{conv.propertyName}</p>
                      <p className="truncate text-[13px] text-[#6B7280]">
                        {lastMsg ? (lastMsg.from === currentUserId ? `You: ${lastMsg.text}` : lastMsg.text) : "No messages yet"}
                      </p>
                    </div>
                    {unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1 text-[11px] text-white" style={{ fontWeight: 700 }}>
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex flex-1 flex-col ${selectedChat === null ? "hidden sm:flex" : "flex"}`}>
          {selectedConversation ? (() => {
            const other = getOtherParticipant(selectedConversation);
            return (
              <>
                <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-4 py-3">
                  <button onClick={() => setSelectedChat(null)} className="sm:hidden">
                    <ChevronRight className="h-5 w-5 rotate-180 text-[#6B7280]" />
                  </button>
                  <ImageWithFallback src={other.avatar} alt={other.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{other.name}</p>
                    <p className="flex items-center gap-1 text-[12px] text-[#10B981]">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]" /> Online
                    </p>
                  </div>
                  <div className="ml-auto rounded-lg bg-[#F3F4F6] px-3 py-1 text-[12px] text-[#6B7280]">
                    {selectedConversation.propertyName}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedConversation.messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex ${msg.from === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                        msg.from === currentUserId
                          ? "rounded-br-md bg-[#2563EB] text-white"
                          : "rounded-bl-md bg-[#F3F4F6] text-[#374151]"
                      }`}>
                        <p className="text-[14px]">{msg.text}</p>
                        <p className={`mt-1 text-[11px] ${msg.from === currentUserId ? "text-white/70" : "text-[#9CA3AF]"}`}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="border-t border-[#E5E7EB] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 rounded-full bg-[#F3F4F6] px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        messageInput.trim()
                          ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                          : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            );
          })() : (
            <div className="flex h-full flex-col items-center justify-center text-[#6B7280]">
              <MessageCircle className="mb-3 h-12 w-12 text-[#D1D5DB]" />
              <p className="text-[16px]" style={{ fontWeight: 500 }}>Select a conversation to start messaging</p>
              <p className="mt-1 text-[13px] text-[#9CA3AF]">Choose from your contacts on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileView({ user }: { user: { name: string; email: string; phone: string; gender: string; location: string; memberSince: string; avatar?: string } }) {
  const getUserAvatar = () => {
    if (user.avatar) return user.avatar;
    if (user.name === "Priya Sharma") return AVATARS.woman1;
    if (user.name === "Rajesh Kumar") return AVATARS.man2;
    if (user.name === "Anil Mehta") return AVATARS.man1;
    return AVATARS.man1;
  };

  return (
    <div>
      <h1 className="mb-6 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Profile Settings</h1>
      <div className="max-w-2xl rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <ImageWithFallback src={getUserAvatar()} alt="Profile" className="h-20 w-20 rounded-full object-cover" />
          <div>
            <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>{user.name}</h3>
            <p className="text-[14px] text-[#6B7280]">Member since {user.memberSince}</p>
            <button className="mt-1 text-[14px] text-[#2563EB]" style={{ fontWeight: 600 }}>Change Photo</button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone || "+91 00000 00000" },
            { label: "Gender", value: user.gender || "Not specified" },
            { label: "Location", value: user.location },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1 block text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
              />
            </div>
          ))}
          <button
            onClick={() => toast.success("Profile updated successfully!")}
            className="mt-4 rounded-lg bg-[#2563EB] px-8 py-2.5 text-[15px] text-white transition-all hover:bg-[#1D4ED8]"
            style={{ fontWeight: 600 }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  const [notifications, setNotifications] = useState([
    { id: "n1", icon: CheckCircle2, color: "text-[#10B981] bg-[#D1FAE5]", title: "Booking Confirmed", message: "Your booking at Sunshine PG for Boys (Single Room) has been confirmed. Check-in: March 1, 2026.", time: "2 hours ago", read: false, type: "booking" },
    { id: "n2", icon: MessageCircle, color: "text-[#F59E0B] bg-[#FEF3C7]", title: "New Message from Rajesh Kumar", message: "\"When can you visit? We have availability from March 1st.\"", time: "3 hours ago", read: false, type: "message" },
    { id: "n3", icon: Heart, color: "text-[#2563EB] bg-[#EFF6FF]", title: "Price Drop Alert", message: "Royal Girls Hostel has reduced their Double Sharing room price to \u20b97,500/mo. A property you saved!", time: "5 hours ago", read: false, type: "alert" },
    { id: "n4", icon: Eye, color: "text-[#8B5CF6] bg-[#EDE9FE]", title: "Profile Viewed", message: "Your profile was viewed 5 times this week by property owners in Pimpri-Chinchwad.", time: "1 day ago", read: true, type: "system" },
    { id: "n5", icon: Star, color: "text-[#F59E0B] bg-[#FEF3C7]", title: "Leave a Review", message: "How was your experience at Urban Living Bachelor Flat? Share your feedback to help others.", time: "2 days ago", read: true, type: "system" },
    { id: "n6", icon: Calendar, color: "text-[#10B981] bg-[#D1FAE5]", title: "Booking Reminder", message: "Your check-in at Royal Girls Hostel is in 3 days (Feb 15, 2026). Don't forget your documents!", time: "2 days ago", read: true, type: "booking" },
    { id: "n7", icon: AlertCircle, color: "text-[#F97316] bg-[#FFF7ED]", title: "Verify Your Phone Number", message: "Complete your profile by verifying your phone number to unlock all features.", time: "3 days ago", read: true, type: "system" },
    { id: "n8", icon: TrendingUp, color: "text-[#2563EB] bg-[#EFF6FF]", title: "New Properties in Your Area", message: "3 new properties matching your preferences have been listed in Pimpri-Chinchwad this week.", time: "1 week ago", read: true, type: "alert" },
  ]);

  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = filter === "all"
    ? notifications
    : filter === "unread"
    ? notifications.filter((n) => !n.read)
    : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast("Notification removed");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Notifications</h1>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="self-start rounded-lg bg-[#EFF6FF] px-4 py-2 text-[13px] text-[#2563EB] transition-colors hover:bg-[#DBEAFE]"
            style={{ fontWeight: 600 }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: `Unread (${unreadCount})` },
          { key: "booking", label: "Bookings" },
          { key: "message", label: "Messages" },
          { key: "alert", label: "Alerts" },
          { key: "system", label: "System" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] transition-colors ${
              filter === f.key ? "bg-[#2563EB] text-white" : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
            style={{ fontWeight: 500 }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#6B7280]">
          <Bell className="mb-3 h-12 w-12 text-[#D1D5DB]" />
          <p className="text-[16px]" style={{ fontWeight: 500 }}>No notifications</p>
          <p className="mt-1 text-[13px] text-[#9CA3AF]">
            {filter === "unread" ? "You've read all your notifications" : `No ${filter} notifications to show`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markAsRead(n.id)}
              className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-sm ${
                n.read ? "border-[#E5E7EB] bg-white" : "border-[#BFDBFE] bg-[#EFF6FF]"
              }`}
            >
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.color}`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-[14px] text-[#111827] ${!n.read ? "" : ""}`} style={{ fontWeight: n.read ? 500 : 600 }}>{n.title}</p>
                    <p className="mt-0.5 text-[13px] text-[#6B7280]" style={{ lineHeight: 1.5 }}>{n.message}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                    className="mt-0.5 shrink-0 rounded-lg p-1 text-[#D1D5DB] opacity-0 transition-all hover:bg-[#FEE2E2] hover:text-[#DC2626] group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[12px] text-[#9CA3AF]">{n.time}</span>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-[#2563EB]" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function HelpView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I book a room?", a: "Browse properties using the Search page, select a property you like, choose your room type, and click \"Book Now\". You'll receive a confirmation once the owner approves your request." },
    { q: "How can I contact a property owner?", a: "You can contact owners through the \"Chat Now\" button on any property page, or use the \"Call Owner\" option. All messages appear in your Messages section." },
    { q: "What is the refund policy for cancellations?", a: "Cancellations made 7+ days before check-in receive a full refund. Cancellations within 3-7 days get a 50% refund. Less than 3 days notice results in no refund. Deposits are handled per property policy." },
    { q: "How do I verify my profile?", a: "Go to Profile Settings and complete all required fields including phone number and ID verification. Verified profiles get priority in search results and build trust with property owners." },
    { q: "Can I save properties to compare later?", a: "Yes! Click the heart icon on any property card to save it. View all saved properties in the Saved Properties section of your dashboard." },
    { q: "What should I check during a property visit?", a: "Verify room condition, check amenities, inspect bathrooms, test WiFi speed, review food quality (if included), check safety features like CCTV and fire extinguishers, and confirm all charges before booking." },
    { q: "How do reviews and ratings work?", a: "After your stay, you can leave a review in the Bookings section. Reviews include a 1-5 star rating and written feedback. Only verified stays can leave reviews, ensuring authentic feedback." },
  ];

  return (
    <div>
      <h1 className="mb-2 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Help & Support</h1>
      <p className="mb-6 text-[14px] text-[#6B7280]">Find answers to common questions or reach out to our team</p>

      {/* Quick Contact Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: Phone, title: "Call Us", subtitle: "+91 20 1234 5678", desc: "Mon-Sat, 9 AM - 7 PM", color: "text-[#2563EB] bg-[#EFF6FF]", borderColor: "border-[#BFDBFE]" },
          { icon: Mail, title: "Email Support", subtitle: "support@roomfinder.in", desc: "Response within 24 hours", color: "text-[#10B981] bg-[#D1FAE5]", borderColor: "border-[#A7F3D0]" },
          { icon: MessageCircle, title: "Live Chat", subtitle: "Start a conversation", desc: "Available 24/7", color: "text-[#F97316] bg-[#FFF7ED]", borderColor: "border-[#FED7AA]" },
        ].map((card) => (
          <motion.button
            key={card.title}
            whileHover={{ y: -4 }}
            onClick={() => toast.info(`${card.title}: ${card.subtitle}`)}
            className={`rounded-xl border ${card.borderColor} bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md`}
          >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <p className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{card.title}</p>
            <p className="mt-0.5 text-[13px] text-[#2563EB]" style={{ fontWeight: 500 }}>{card.subtitle}</p>
            <p className="mt-1 text-[12px] text-[#9CA3AF]">{card.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="border-b border-[#E5E7EB] px-6 py-4">
          <h2 className="flex items-center gap-2 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>
            <HelpCircle className="h-5 w-5 text-[#2563EB]" /> Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[#F9FAFB]"
              >
                <span className="text-[14px] text-[#111827]" style={{ fontWeight: 500 }}>{faq.q}</span>
                <ChevronRight className={`h-5 w-5 shrink-0 text-[#9CA3AF] transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-[14px] text-[#6B7280]" style={{ lineHeight: 1.7 }}>{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-6 text-center shadow-sm">
        <p className="text-[16px] text-[#111827]" style={{ fontWeight: 600 }}>Still need help?</p>
        <p className="mt-1 text-[14px] text-[#6B7280]">Our support team is here to assist you with anything you need.</p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => toast.info("Opening live chat...")}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-[14px] text-white transition-all hover:bg-[#1D4ED8]"
            style={{ fontWeight: 600 }}
          >
            <MessageCircle className="h-4 w-4" /> Start Live Chat
          </button>
          <button
            onClick={() => toast.info("Redirecting to email...")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-6 py-2.5 text-[14px] text-[#374151] transition-all hover:bg-[#F3F4F6]"
            style={{ fontWeight: 600 }}
          >
            <Mail className="h-4 w-4" /> Send an Email
          </button>
        </div>
      </div>
    </div>
  );
}