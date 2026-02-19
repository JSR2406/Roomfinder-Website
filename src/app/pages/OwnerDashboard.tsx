import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  BarChart3, Home, PlusCircle, Inbox, IndianRupee, Users, TrendingUp,
  Star, Settings, LogOut, Crown, Eye, Calendar, ArrowRight, ArrowUp,
  CheckCircle2, XCircle, Clock, ChevronRight, MessageCircle, Download,
  Building2, MoreVertical, Pencil, Trash2, ExternalLink,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart,
} from "recharts";
import { properties, AVATARS } from "../data/properties";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useAuth } from "../data/auth";

const ownerMenu = [
  { icon: BarChart3, label: "Dashboard Overview", key: "dashboard", badge: 0 },
  { icon: Home, label: "My Properties", key: "properties", badge: 8 },
  { icon: PlusCircle, label: "Add New Property", key: "add", badge: 0 },
  { icon: Inbox, label: "Booking Requests", key: "bookings", badge: 5 },
  { icon: IndianRupee, label: "Revenue & Payments", key: "revenue", badge: 0 },
  { icon: Users, label: "Tenant Management", key: "tenants", badge: 0 },
  { icon: TrendingUp, label: "Analytics", key: "analytics", badge: 0 },
  { icon: Star, label: "Reviews", key: "reviews", badge: 12 },
  { icon: Settings, label: "Settings", key: "settings", badge: 0 },
];

const revenueData = [
  { month: "Aug", revenue: 145000 },
  { month: "Sep", revenue: 156000 },
  { month: "Oct", revenue: 168000 },
  { month: "Nov", revenue: 172000 },
  { month: "Dec", revenue: 180000 },
  { month: "Jan", revenue: 185000 },
  { month: "Feb", revenue: 192000 },
];

const bookingsByProperty = [
  { name: "Sunshine PG", bookings: 12 },
  { name: "Royal Hostel", bookings: 8 },
  { name: "Urban Living", bookings: 5 },
  { name: "Green Valley", bookings: 4 },
];

const revenueByType = [
  { name: "Single", value: 45, color: "#2563EB" },
  { name: "Double", value: 35, color: "#F97316" },
  { name: "Triple", value: 20, color: "#10B981" },
];

const bookingRequests = [
  { id: 1, user: "Amit Patel", avatar: AVATARS.man1, property: "Sunshine PG", room: "Single Room", date: "March 15, 2026", amount: 8000, status: "pending" },
  { id: 2, user: "Priya Sharma", avatar: AVATARS.woman1, property: "Sunshine PG", room: "Double Sharing", date: "March 10, 2026", amount: 6000, status: "pending" },
  { id: 3, user: "Rahul Deshmukh", avatar: AVATARS.man2, property: "Royal Hostel", room: "Single Room", date: "March 20, 2026", amount: 9000, status: "pending" },
];

const topProperties = [
  { rank: 1, name: "Sunshine PG for Boys", views: 324, bookings: 12, revenue: 96000, occupancy: 95 },
  { rank: 2, name: "Royal Girls Hostel", views: 267, bookings: 8, revenue: 72000, occupancy: 87 },
  { rank: 3, name: "Urban Living Flat", views: 189, bookings: 5, revenue: 60000, occupancy: 75 },
];

const ownerActivities = [
  { text: 'New booking from Priya Sharma - Sunshine PG', time: "2 hours ago", color: "text-[#2563EB] bg-[#EFF6FF]", icon: Calendar },
  { text: "Payment received - ₹8,000", time: "5 hours ago", color: "text-[#10B981] bg-[#D1FAE5]", icon: IndianRupee },
  { text: "New review received - 5 stars", time: "1 day ago", color: "text-[#F59E0B] bg-[#FEF3C7]", icon: Star },
  { text: "Property viewed 24 times today", time: "1 day ago", color: "text-[#8B5CF6] bg-[#EDE9FE]", icon: Eye },
  { text: "Revenue milestone: ₹1L this month", time: "3 days ago", color: "text-[#10B981] bg-[#D1FAE5]", icon: TrendingUp },
];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { currentUser, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const ownerName = currentUser?.name || "Rajesh Kumar";
  const ownerAvatar = currentUser?.name === "Priya Sharma" ? AVATARS.woman1
    : currentUser?.name === "Anil Mehta" ? AVATARS.man1
    : AVATARS.man2;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F9FAFB] pt-20">
      <div className="flex">
        {/* Dark Sidebar */}
        <aside className="hidden w-[280px] shrink-0 bg-[#111827] lg:block" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div className="sticky top-20 p-6">
            <div className="mb-6 text-center">
              <ImageWithFallback src={ownerAvatar} alt={ownerName} className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-[#2563EB]" />
              <h3 className="mt-3 text-[18px] text-white" style={{ fontWeight: 600 }}>{ownerName}</h3>
              <p className="text-[14px] text-[#9CA3AF]">Property Owner</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#F59E0B]/20 px-3 py-1 text-[12px] text-[#F59E0B]" style={{ fontWeight: 600 }}>
                <Crown className="h-3 w-3" /> Premium Member
              </span>
            </div>

            <div className="mb-4 border-t border-[#1F2937]" />

            <nav className="space-y-1">
              {ownerMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-all ${
                    activeTab === item.key
                      ? "bg-[#2563EB] text-white"
                      : "text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge > 0 && (
                    <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] ${
                      activeTab === item.key ? "bg-white/20" : "bg-[#EF4444]"
                    } text-white`} style={{ fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#EF4444] hover:bg-[#1F2937]" style={{ fontWeight: 500 }}
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </nav>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#D97706] py-2.5 text-[14px] text-white" style={{ fontWeight: 600 }}>
              <Crown className="h-4 w-4" /> Upgrade to Premium
            </button>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#E5E7EB] bg-white py-2 lg:hidden">
          {[
            { icon: BarChart3, label: "Dashboard", key: "dashboard" },
            { icon: Home, label: "Properties", key: "properties" },
            { icon: PlusCircle, label: "Add", key: "add" },
            { icon: Inbox, label: "Bookings", key: "bookings" },
            { icon: TrendingUp, label: "Analytics", key: "analytics" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeTab === item.key ? "text-[#2563EB]" : "text-[#6B7280]"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]" style={{ fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="flex-1 p-4 pb-20 lg:p-8 lg:pb-8" ref={ref}>
          {activeTab === "dashboard" && <OwnerOverview inView={inView} setActiveTab={setActiveTab} />}
          {activeTab === "properties" && <PropertiesView setActiveTab={setActiveTab} />}
          {activeTab === "bookings" && <BookingRequestsView />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "add" && <AddPropertyView onDone={() => setActiveTab("properties")} />}
          {!["dashboard", "properties", "bookings", "analytics", "add"].includes(activeTab) && (
            <div className="flex h-64 items-center justify-center text-[#6B7280]">
              <p className="text-[16px]">Coming soon</p>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}

function OwnerOverview({ inView, setActiveTab }: { inView: boolean; setActiveTab: (tab: string) => void }) {
  const ownerStats = [
    { label: "Total Properties", value: "8", sub: "6 Active, 2 Pending", trend: "↑ 2 from last month", color: "border-[#2563EB]", icon: Building2, iconColor: "text-[#2563EB] bg-[#EFF6FF]" },
    { label: "Active Bookings", value: "24", sub: "5 New this week", trend: "↑ 15% increase", color: "border-[#10B981]", icon: Calendar, iconColor: "text-[#10B981] bg-[#D1FAE5]" },
    { label: "Monthly Revenue", value: "₹1,92,000", sub: "From 24 bookings", trend: "↑ ₹24,000 vs last month", color: "border-[#F59E0B]", icon: IndianRupee, iconColor: "text-[#F59E0B] bg-[#FEF3C7]" },
    { label: "Total Views", value: "1,247", sub: "185 This week", trend: "↑ 12% increase", color: "border-[#8B5CF6]", icon: Eye, iconColor: "text-[#8B5CF6] bg-[#EDE9FE]" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ownerStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -8 }}
            className={`rounded-xl border-t-4 ${s.color} bg-white p-5 shadow-sm transition-shadow hover:shadow-lg`}
          >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${s.iconColor}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <div className="font-['Poppins'] text-[28px] text-[#111827]" style={{ fontWeight: 700 }}>{s.value}</div>
            <p className="text-[14px] text-[#6B7280]">{s.label}</p>
            <p className="text-[12px] text-[#6B7280]">{s.sub}</p>
            <p className="mt-1 text-[12px] text-[#10B981]" style={{ fontWeight: 500 }}>{s.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Revenue Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={13} />
              <YAxis stroke="#6B7280" fontSize={13} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Booking Requests */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>Recent Booking Requests</h2>
            <button onClick={() => setActiveTab("bookings")} className="text-[13px] text-[#2563EB]" style={{ fontWeight: 600 }}>View All</button>
          </div>
          <div className="space-y-3">
            {bookingRequests.map((req) => (
              <div key={req.id} className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-3">
                <ImageWithFallback src={req.avatar} alt={req.user} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{req.user}</p>
                  <p className="truncate text-[12px] text-[#6B7280]">{req.property} - {req.room}</p>
                  <p className="text-[12px] text-[#6B7280]">₹{req.amount.toLocaleString("en-IN")}/mo</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => toast.success(`Booking accepted for ${req.user}`)}
                    className="rounded-lg bg-[#10B981] px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-[#059669]"
                    style={{ fontWeight: 600 }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => toast.error(`Booking declined for ${req.user}`)}
                    className="rounded-lg border border-[#EF4444] px-3 py-1.5 text-[12px] text-[#EF4444] transition-colors hover:bg-[#FEE2E2]"
                    style={{ fontWeight: 600 }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>Top Performing Properties</h2>
          <div className="space-y-4">
            {topProperties.map((prop) => (
              <div key={prop.rank} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] text-white ${
                  prop.rank === 1 ? "bg-[#F59E0B]" : prop.rank === 2 ? "bg-[#9CA3AF]" : "bg-[#CD7F32]"
                }`} style={{ fontWeight: 700 }}>
                  #{prop.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{prop.name}</p>
                  <div className="flex gap-3 text-[12px] text-[#6B7280]">
                    <span>👁️ {prop.views}</span>
                    <span>📋 {prop.bookings}</span>
                    <span>💰 ₹{(prop.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${prop.occupancy}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#059669]"
                      />
                    </div>
                    <span className="text-[12px] text-[#10B981]" style={{ fontWeight: 600 }}>{prop.occupancy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Recent Activity</h2>
        <div className="space-y-3">
          {ownerActivities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-lg p-3 hover:bg-[#F9FAFB]"
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: PlusCircle, title: "Add New Property", gradient: "from-[#2563EB] to-[#1D4ED8]", action: () => setActiveTab("add") },
          { icon: Pencil, title: "Update Property", gradient: "from-[#10B981] to-[#059669]", action: () => setActiveTab("properties") },
          { icon: Calendar, title: "View Bookings", gradient: "from-[#8B5CF6] to-[#6D28D9]", action: () => setActiveTab("bookings") },
          { icon: Star, title: "Respond to Reviews", gradient: "from-[#F59E0B] to-[#D97706]", action: () => setActiveTab("reviews") },
          { icon: Download, title: "Download Reports", gradient: "from-[#EC4899] to-[#DB2777]", action: () => toast.success("Report download started! Your monthly report will be ready shortly.") },
          { icon: MessageCircle, title: "Contact Support", gradient: "from-[#374151] to-[#1F2937]", action: () => toast.info("Support chat initiated! Our team will respond within 2 hours.") },
        ].map((action) => (
          <motion.button
            key={action.title}
            onClick={action.action}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-4 rounded-xl bg-gradient-to-br ${action.gradient} p-5 text-left text-white shadow-md transition-shadow hover:shadow-xl`}
          >
            <action.icon className="h-10 w-10" />
            <span className="text-[16px]" style={{ fontWeight: 600 }}>{action.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function PropertiesView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = properties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>My Properties ({totalItems})</h1>
        <button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-[14px] text-white transition-all hover:brightness-110" style={{ fontWeight: 600 }}>
          <PlusCircle className="h-4 w-4" /> Add New Property
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              {["Property", "Status", "Type", "Availability", "Views", "Revenue", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[13px] text-[#6B7280]" style={{ fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedProperties.map((p, i) => {
              const globalIndex = startIndex + i;
              return (
                <tr key={p.id} className="border-b border-[#F3F4F6] transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback src={p.image} alt={p.name} className="h-12 w-16 rounded-lg object-cover" />
                      <div>
                        <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{p.name}</p>
                        <p className="text-[12px] text-[#6B7280]">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[12px] ${
                      globalIndex < 4 ? "bg-[#D1FAE5] text-[#047857]" : globalIndex < 6 ? "bg-[#FEF3C7] text-[#B45309]" : "bg-[#F3F4F6] text-[#6B7280]"
                    }`} style={{ fontWeight: 600 }}>
                      {globalIndex < 4 ? "Active" : globalIndex < 6 ? "Pending" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#374151]">{p.typeLabel}</td>
                  <td className="px-4 py-3 text-[14px] text-[#374151]">{p.roomTypes.filter(r => r.available).length}/{p.roomTypes.length} rooms</td>
                  <td className="px-4 py-3 text-[14px] text-[#374151]">{p.views}</td>
                  <td className="px-4 py-3 text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>₹{(p.price * 3).toLocaleString("en-IN")}/mo</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toast.success(`Editing ${p.name}...`)}
                        className="rounded p-1.5 text-[#6B7280] transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB]">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <Link to={`/property/${p.id}`} className="rounded p-1.5 text-[#6B7280] transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB]">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => toast.error(`${p.name} removed from listings`)}
                        className="rounded p-1.5 text-[#6B7280] transition-colors hover:bg-[#FEE2E2] hover:text-[#EF4444]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center gap-3">
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

function BookingRequestsView() {
  return (
    <div>
      <h1 className="mb-6 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Booking Requests (5)</h1>
      <div className="space-y-4">
        {bookingRequests.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <ImageWithFallback src={req.avatar} alt={req.user} className="h-14 w-14 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="text-[16px] text-[#111827]" style={{ fontWeight: 600 }}>{req.user}</h3>
              <p className="text-[14px] text-[#6B7280]">{req.property} - {req.room}</p>
              <div className="mt-1 flex gap-4 text-[13px] text-[#6B7280]">
                <span>Move-in: {req.date}</span>
                <span>₹{req.amount.toLocaleString("en-IN")}/mo</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toast.success(`Accepted booking from ${req.user}`)}
                className="rounded-lg bg-[#10B981] px-5 py-2 text-[14px] text-white transition-all hover:bg-[#059669]"
                style={{ fontWeight: 600 }}
              >
                Accept
              </button>
              <button
                onClick={() => toast.error(`Declined booking from ${req.user}`)}
                className="rounded-lg border border-[#EF4444] px-5 py-2 text-[14px] text-[#EF4444] transition-all hover:bg-[#FEE2E2]"
                style={{ fontWeight: 600 }}
              >
                Decline
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Analytics & Insights</h1>

      {/* Views Over Time */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>Views Over Time</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData.map(d => ({ ...d, views: Math.floor(d.revenue / 100) }))}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={13} />
              <YAxis stroke="#6B7280" fontSize={13} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={3} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bookings by Property */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>Bookings by Property</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByProperty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Room Type */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>Revenue by Room Type</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByType} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {revenueByType.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Avg. Occupancy Rate", value: "87%", color: "text-[#10B981]" },
          { label: "Avg. Booking Duration", value: "6 months", color: "text-[#2563EB]" },
          { label: "Response Time", value: "< 2 hours", color: "text-[#F59E0B]" },
          { label: "Customer Satisfaction", value: "4.5/5", color: "text-[#8B5CF6]" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-[#E5E7EB] bg-white p-5 text-center shadow-sm">
            <div className={`font-['Poppins'] text-[28px] ${m.color}`} style={{ fontWeight: 700 }}>{m.value}</div>
            <p className="mt-1 text-[13px] text-[#6B7280]">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddPropertyView({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const stepLabels = ["Basic Info", "Room Details", "Amenities", "Photos", "House Rules", "Review"];

  return (
    <div>
      <h1 className="mb-6 text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Add New Property</h1>

      {/* Progress */}
      <div className="mb-8 flex items-center justify-between">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] ${
                i + 1 < step ? "bg-[#10B981] text-white" : i + 1 === step ? "bg-[#2563EB] text-white" : "bg-[#E5E7EB] text-[#6B7280]"
              }`} style={{ fontWeight: 600 }}>
                {i + 1 < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </div>
              <span className="mt-1 hidden text-[11px] text-[#6B7280] sm:block" style={{ fontWeight: 500 }}>{label}</span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${i + 1 < step ? "bg-[#10B981]" : "bg-[#E5E7EB]"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Basic Information</h2>
            {[
              { label: "Property Name", placeholder: "Enter property name", full: true },
              { label: "Property Type", type: "select" },
              { label: "Gender Preference", type: "radio" },
              { label: "Total Rooms", placeholder: "Number of rooms" },
              { label: "Address", placeholder: "Full property address", full: true },
              { label: "City", placeholder: "City" },
              { label: "Pincode", placeholder: "Pincode" },
            ].map((field) => (
              <div key={field.label} className={field.full ? "col-span-2" : ""}>
                <label className="mb-1 block text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>{field.label}</label>
                {field.type === "select" ? (
                  <select className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]">
                    <option>Select type</option>
                    <option>Hostel</option>
                    <option>Bachelor Flat</option>
                    <option>Shared Apartment</option>
                  </select>
                ) : field.type === "radio" ? (
                  <div className="flex gap-4">
                    {["Boys Only", "Girls Only", "Co-ed"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-[14px] text-[#374151]">
                        <input type="radio" name="gender" className="accent-[#2563EB]" /> {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Room Details</h2>
            <p className="text-[14px] text-[#6B7280]">Add the different room types available in your property.</p>
            <div className="rounded-xl border-2 border-dashed border-[#D1D5DB] p-8 text-center">
              <PlusCircle className="mx-auto h-12 w-12 text-[#D1D5DB]" />
              <p className="mt-2 text-[16px] text-[#6B7280]" style={{ fontWeight: 500 }}>Add Room Type</p>
              <p className="text-[14px] text-[#9CA3AF]">Define room type, pricing, and amenities</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Amenities & Facilities</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {["WiFi", "AC", "Food Included", "Parking", "Attached Bathroom", "Balcony", "Laundry", "Security", "Power Backup", "Gym", "TV Lounge", "Refrigerator"].map((a) => (
                <label key={a} className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] p-3 transition-colors hover:bg-[#EFF6FF]">
                  <input type="checkbox" className="accent-[#2563EB]" />
                  <span className="text-[14px] text-[#374151]">{a}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Photos</h2>
            <div className="rounded-xl border-2 border-dashed border-[#93C5FD] bg-[#EFF6FF] p-12 text-center">
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#DBEAFE]">
                <PlusCircle className="h-10 w-10 text-[#2563EB]" />
              </div>
              <p className="text-[16px] text-[#374151]" style={{ fontWeight: 500 }}>Drag & drop photos here or click to browse</p>
              <p className="mt-1 text-[14px] text-[#6B7280]">Upload up to 20 photos. Max 5MB each. JPG, PNG</p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>House Rules</h2>
            {[
              { label: "Gate Closing Time", type: "time" },
              { label: "Smoking Policy", options: ["Allowed", "Not Allowed"] },
              { label: "Alcohol Policy", options: ["Allowed", "Not Allowed"] },
              { label: "Pet Policy", options: ["Allowed", "Not Allowed"] },
              { label: "Notice Period", options: ["1 Month", "2 Months", "3 Months"] },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1 block text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>{field.label}</label>
                {field.type === "time" ? (
                  <input type="time" className="rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none focus:border-[#2563EB]" />
                ) : (
                  <div className="flex gap-3">
                    {field.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-[14px] text-[#374151]">
                        <input type="radio" name={field.label} className="accent-[#2563EB]" /> {opt}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#10B981]" />
            <h2 className="text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>Review & Submit</h2>
            <p className="text-[16px] text-[#6B7280]">
              Please review all the information and submit your property for verification.
            </p>
            <label className="inline-flex items-center gap-2 text-[14px] text-[#374151]">
              <input type="checkbox" className="accent-[#2563EB]" /> I agree to the terms and conditions
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-[#E5E7EB] pt-6">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            className={`rounded-lg border border-[#D1D5DB] px-6 py-2.5 text-[14px] text-[#374151] transition-all hover:bg-[#F3F4F6] ${step === 1 ? "opacity-50" : ""}`}
            style={{ fontWeight: 600 }}
            disabled={step === 1}
          >
            Back
          </button>
          <div className="flex gap-3">
            <button className="rounded-lg border border-[#2563EB] px-6 py-2.5 text-[14px] text-[#2563EB] transition-all hover:bg-[#EFF6FF]" style={{ fontWeight: 600 }}>
              Save Draft
            </button>
            <button
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  toast.success("Property submitted for verification!");
                  onDone();
                }
              }}
              className="rounded-lg bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 py-2.5 text-[14px] text-white shadow-md transition-all hover:brightness-110"
              style={{ fontWeight: 600 }}
            >
              {step < totalSteps ? "Next Step →" : "Submit for Verification"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}