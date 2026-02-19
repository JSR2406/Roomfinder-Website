import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  ChevronRight, ChevronLeft, MapPin, Star, Eye, Clock, Hash, Calendar, Bed, Users,
  IndianRupee, Shield, BadgeCheck, Share2, Flag, Heart, Phone, MessageCircle,
  Wifi, UtensilsCrossed, Snowflake, Car, Tv, WashingMachine, Lock, Zap, Droplets,
  CheckCircle2, XCircle, AlertCircle, GraduationCap, Briefcase, Train, Hospital,
  ShoppingBag, ArrowRight, ThumbsUp, ThumbsDown, X, ChevronDown, Building2,
} from "lucide-react";
import { properties, AVATARS } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useAuth } from "../data/auth";
import { useMessaging } from "../data/messaging";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, Food: UtensilsCrossed, AC: Snowflake, Parking: Car, Security: Shield,
  "TV Lounge": Tv, Laundry: WashingMachine, "Power Backup": Zap, "Water Supply": Droplets,
  Gym: Users, "Attached Bathroom": Droplets, Balcony: Eye, Cupboard: Lock,
  "Study Table": GraduationCap, "Bed with Mattress": Bed, Refrigerator: Snowflake,
};

const categoryIcons: Record<string, React.ElementType> = {
  Educational: GraduationCap, "IT Parks": Briefcase, Transport: Train, Healthcare: Hospital, Shopping: ShoppingBag,
};

// Map property owner names to their messaging user IDs
const OWNER_ID_MAP: Record<string, string> = {
  "Rajesh Kumar": "owner-1",
  "Sunita Patil": "user-sunita",
  "Amit Deshmukh": "user-amit",
  "Vinod Jadhav": "owner-vinod",
  "Meera Shah": "owner-meera",
  "Prashant More": "owner-prashant",
};

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id) || properties[0];
  const [currentImage, setCurrentImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [activeNearbyTab, setActiveNearbyTab] = useState(property.nearbyPlaces[0]?.category || "");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const { getOrCreateConversation } = useMessaging();

  const handleChatNow = () => {
    if (!isLoggedIn || !currentUser) {
      toast.error("Please sign in to chat with the owner");
      navigate("/login");
      return;
    }
    const ownerId = OWNER_ID_MAP[property.owner.name] || "owner-unknown";
    const convId = getOrCreateConversation(currentUser.id, ownerId, property.name);
    // Navigate to dashboard messages with the conversation pre-selected
    navigate("/dashboard", { state: { tab: "messages", chatId: convId } });
    toast.success(`Opening chat with ${property.owner.name}`);
  };

  const similar = properties.filter((p) => p.id !== property.id).slice(0, 3);

  const allAmenities = [
    "WiFi", "AC", "Attached Bathroom", "Balcony", "Cupboard", "Study Table",
    "Bed with Mattress", "TV Lounge", "Laundry", "Refrigerator", "Power Backup",
    "Water Supply", "Food", "Security", "Parking", "Gym",
  ];

  const reviews = [
    { id: 1, name: "Rahul Sharma", avatar: AVATARS.man1, rating: 5, date: "2 months ago", text: "Great place to stay! The food is amazing and the staff is very cooperative. The room was exactly as shown in the photos. Highly recommended for students and working professionals.", helpful: 24, verified: true },
    { id: 2, name: "Priya Patil", avatar: AVATARS.woman1, rating: 4, date: "1 month ago", text: "Good hostel with nice amenities. The location is convenient and the WiFi is reliable. Only minor issue is the hot water timing in winter.", helpful: 12, verified: true },
    { id: 3, name: "Amit Deshmukh", avatar: AVATARS.man2, rating: 5, date: "3 weeks ago", text: "Best PG in Pimpri area! Clean rooms, tasty food, and very helpful staff. I have been staying here for 6 months and never had any complaints.", helpful: 18, verified: false },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/search" className="hover:text-[#2563EB]">{property.typeLabel}s</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>{property.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[16/9] max-h-[500px] w-full cursor-pointer overflow-hidden sm:aspect-[2/1]"
              onClick={() => setLightbox(true)}
            >
              <ImageWithFallback
                src={property.images[currentImage]}
                alt={property.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Controls */}
            <div className="absolute right-4 top-4 flex gap-2">
              {[
                { icon: Share2, label: "Share", action: () => toast.success("Link copied!") },
                { icon: Heart, label: liked ? "Saved" : "Save", action: () => { setLiked(!liked); toast.success(liked ? "Removed from saved" : "Saved to favorites!"); } },
                { icon: Flag, label: "Report", action: () => toast("Report submitted") },
              ].map(({ icon: Icon, label, action }) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.9 }}
                  onClick={action}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white"
                >
                  <Icon className={`h-5 w-5 ${label === "Saved" ? "fill-red-500 text-red-500" : "text-[#374151]"}`} />
                </motion.button>
              ))}
            </div>

            {/* Nav */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((c) => (c - 1 + property.images.length) % property.images.length)}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentImage((c) => (c + 1) % property.images.length)}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-4 py-2 text-[13px] text-[#111827] backdrop-blur-md transition-colors hover:bg-white"
              style={{ fontWeight: 600 }}
            >
              View All {property.images.length} Photos
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`shrink-0 overflow-hidden rounded-lg transition-all ${
                  currentImage === i ? "ring-2 ring-[#2563EB] ring-offset-2" : "opacity-70 hover:opacity-100"
                }`}
              >
                <ImageWithFallback src={img} alt="" className="h-20 w-28 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Property Header */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start gap-2">
                <h1 className="mr-auto font-['Poppins'] text-[28px] text-[#111827] sm:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {property.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {property.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-[#D1FAE5] px-3 py-1 text-[12px] text-[#047857]" style={{ fontWeight: 600 }}>
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                  <span className={`rounded-full px-3 py-1 text-[12px] text-white ${property.type === "boys-hostel" ? "bg-[#2563EB]" : property.type === "girls-hostel" ? "bg-[#EC4899]" : "bg-[#8B5CF6]"}`} style={{ fontWeight: 600 }}>
                    {property.typeLabel}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[16px] text-[#4B5563]">
                <MapPin className="h-5 w-5 text-[#2563EB]" />
                {property.address}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-[14px] text-[#6B7280] sm:gap-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
                  <span className="text-[#111827]" style={{ fontWeight: 600 }}>{property.rating}</span>
                  ({property.reviews} reviews)
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {property.views} views this week
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Posted {property.postedDate}
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-4 w-4" /> RF{property.id.padStart(5, "0")}
                </div>
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:grid-cols-4 sm:p-6">
              {[
                { icon: IndianRupee, label: "Starting from", value: `₹${property.price.toLocaleString("en-IN")}/mo`, color: "text-[#2563EB]" },
                { icon: Calendar, label: "Available from", value: "Mar 1, 2026", color: "text-[#10B981]" },
                { icon: Bed, label: "Room Types", value: property.roomTypes.map((r) => r.type).join(", "), color: "text-[#8B5CF6]" },
                { icon: Users, label: "Gender", value: property.gender === "boys" ? "Boys Only" : property.gender === "girls" ? "Girls Only" : "Co-ed", color: "text-[#2563EB]" },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <div key={i} className="text-center sm:text-left">
                  <Icon className={`mx-auto mb-1 h-7 w-7 sm:mx-0 ${color}`} />
                  <p className="text-[12px] text-[#6B7280]">{label}</p>
                  <p className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <ContentCard title="About This Property" icon={<Eye className="h-5 w-5" />}>
              <p className={`text-[16px] text-[#374151] ${!showFullDesc ? "line-clamp-4" : ""}`} style={{ lineHeight: 1.6 }}>
                {property.description}
              </p>
              <button onClick={() => setShowFullDesc(!showFullDesc)} className="mt-2 text-[14px] text-[#2563EB]" style={{ fontWeight: 600 }}>
                {showFullDesc ? "Show Less" : "Read More"}
              </button>

              <h4 className="mt-6 mb-3 text-[17px] text-[#111827]" style={{ fontWeight: 600 }}>Key Highlights</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {property.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-[15px] text-[#374151]">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10B981]" /> {h}
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Room Types */}
            <ContentCard title="Available Room Types" icon={<Bed className="h-5 w-5" />}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {property.roomTypes.map((room) => (
                  <motion.div
                    key={room.type}
                    whileHover={{ y: -6 }}
                    className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <ImageWithFallback
                        src={property.images[1] || property.image}
                        alt={room.type}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[#2563EB] px-3 py-1 text-[12px] text-white" style={{ fontWeight: 600 }}>
                        {room.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[20px] text-[#111827]" style={{ fontWeight: 700 }}>
                        &#8377;{room.price.toLocaleString("en-IN")}<span className="text-[14px] text-[#6B7280]" style={{ fontWeight: 400 }}>/month</span>
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[13px] text-[#6B7280]">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {room.capacity} Person</span>
                        <span className={`flex items-center gap-1 ${room.available ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                          <Calendar className="h-3.5 w-3.5" /> {room.available ? "Available" : "Full"}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-[#6B7280]">Deposit: &#8377;{room.deposit.toLocaleString("en-IN")}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {room.amenities.map((a) => (
                          <span key={a} className="rounded-full bg-white px-2 py-0.5 text-[11px] text-[#4B5563] border border-[#E5E7EB]">
                            {a}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => { setSelectedRoom(room.type); toast.success(`Selected ${room.type}`); }}
                        className={`mt-4 w-full rounded-lg py-2.5 text-[14px] transition-all ${
                          room.available
                            ? "bg-[#F97316] text-white hover:brightness-110"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                        }`}
                        style={{ fontWeight: 600 }}
                        disabled={!room.available}
                      >
                        {room.available ? "Book Now" : "Not Available"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ContentCard>

            {/* Amenities */}
            <ContentCard title="Amenities & Facilities" icon={<Wifi className="h-5 w-5" />}>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {allAmenities.map((a, i) => {
                  const Icon = amenityIcons[a] || CheckCircle2;
                  const isAvailable = property.amenities.some(pa => a.toLowerCase().includes(pa.toLowerCase()) || pa.toLowerCase().includes(a.toLowerCase()));
                  return (
                    <motion.div
                      key={a}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className={`flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors ${
                        isAvailable ? "bg-[#EFF6FF]" : "bg-[#F3F4F6] opacity-50"
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isAvailable ? "bg-[#DBEAFE] text-[#2563EB]" : "bg-[#E5E7EB] text-[#9CA3AF]"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[12px] text-[#374151]" style={{ fontWeight: 500 }}>{a}</span>
                    </motion.div>
                  );
                })}
              </div>
            </ContentCard>

            {/* House Rules */}
            <ContentCard title="House Rules" icon={<Shield className="h-5 w-5" />}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.rules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-3 rounded-lg bg-[#F9FAFB] p-3">
                    {rule.allowed === true ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10B981]" />
                    ) : rule.allowed === false ? (
                      <XCircle className="h-5 w-5 shrink-0 text-[#EF4444]" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                    )}
                    <div>
                      <p className="text-[14px] text-[#6B7280]">{rule.label}</p>
                      <p className={`text-[15px] ${rule.allowed === false ? "text-[#EF4444]" : "text-[#111827]"}`} style={{ fontWeight: 600 }}>
                        {rule.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentCard>

            {/* Nearby Places */}
            <ContentCard title="Location & Nearby" icon={<MapPin className="h-5 w-5" />}>
              <div className="mb-4 h-64 overflow-hidden rounded-xl bg-[#E5E7EB]">
                <div className="flex h-full items-center justify-center text-[#6B7280]">
                  <MapPin className="mr-2 h-6 w-6" />
                  <span>Map view - {property.address}</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {property.nearbyPlaces.map((cat) => {
                  const Icon = categoryIcons[cat.category] || MapPin;
                  return (
                    <button
                      key={cat.category}
                      onClick={() => setActiveNearbyTab(cat.category)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-all ${
                        activeNearbyTab === cat.category
                          ? "bg-[#2563EB] text-white"
                          : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      <Icon className="h-4 w-4" /> {cat.category}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                {property.nearbyPlaces
                  .find((c) => c.category === activeNearbyTab)
                  ?.places.map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-lg bg-[#F9FAFB] px-4 py-3">
                      <span className="text-[15px] text-[#374151]">{p.name}</span>
                      <span className="rounded-full bg-[#E5E7EB] px-3 py-1 text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                        {p.distance}
                      </span>
                    </div>
                  ))}
              </div>
            </ContentCard>

            {/* Reviews */}
            <ContentCard title="Reviews & Ratings" icon={<Star className="h-5 w-5" />}>
              {/* Rating Summary */}
              <div className="mb-6 flex flex-col gap-6 rounded-xl bg-[#F9FAFB] p-6 sm:flex-row sm:items-center">
                <div className="text-center sm:pr-8 sm:border-r sm:border-[#E5E7EB]">
                  <div className="font-['Poppins'] text-[48px] text-[#111827]" style={{ fontWeight: 700 }}>
                    {property.rating}
                  </div>
                  <div className="flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < Math.floor(property.rating) ? "fill-[#FBBF24] text-[#FBBF24]" : "text-[#D1D5DB]"}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-[14px] text-[#6B7280]">Based on {property.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { stars: 5, pct: 60 },
                    { stars: 4, pct: 30 },
                    { stars: 3, pct: 8 },
                    { stars: 2, pct: 1.5 },
                    { stars: 1, pct: 0.5 },
                  ].map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-8 text-right text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>{stars} <Star className="inline h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" /></span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-[#FBBF24]"
                        />
                      </div>
                      <span className="w-10 text-right text-[12px] text-[#6B7280]">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{review.name}</span>
                            {review.verified && (
                              <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[11px] text-[#047857]" style={{ fontWeight: 600 }}>
                                Verified
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] text-[#6B7280]">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-[15px] text-[#374151]" style={{ lineHeight: 1.6 }}>{review.text}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-[13px] text-[#6B7280] transition-colors hover:text-[#10B981]">
                        <ThumbsUp className="h-4 w-4" /> Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-[13px] text-[#6B7280] transition-colors hover:text-[#EF4444]">
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ContentCard>

            {/* Similar Properties */}
            <ContentCard title="Similar Properties You Might Like" icon={<Building2 className="h-5 w-5" />}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </ContentCard>
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden w-[380px] shrink-0 lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Booking Card */}
              <div className="rounded-xl border-2 border-[#E5E7EB] bg-white p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Poppins'] text-[36px] text-[#111827]" style={{ fontWeight: 700 }}>
                      &#8377;{property.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[16px] text-[#6B7280]">/month</span>
                  </div>
                  <p className="text-[13px] text-[#6B7280]">Starting from</p>
                  <span className="mt-2 inline-block rounded-full bg-[#D1FAE5] px-3 py-1 text-[12px] text-[#047857]" style={{ fontWeight: 600 }}>
                    Available Now
                  </span>
                </div>

                <div className="mb-4 border-t border-[#E5E7EB]" />

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>Move-in Date</label>
                    <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-3 py-2.5 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[rgba(37,99,235,0.1)]">
                      <Calendar className="h-4 w-4 text-[#6B7280]" />
                      <input type="date" className="w-full bg-transparent text-[14px] outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>Room Type</label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                    >
                      <option value="">Select room type</option>
                      {property.roomTypes.map((r) => (
                        <option key={r.type} value={r.type}>
                          {r.type} - ₹{r.price.toLocaleString("en-IN")}/mo
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="my-4 border-t border-[#E5E7EB]" />

                <div className="space-y-3">
                  <button
                    onClick={() => toast.success("Booking request sent!")}
                    className="w-full rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] py-3.5 text-[16px] text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ fontWeight: 600 }}
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => toast("Visit scheduled!")}
                    className="w-full rounded-xl border-2 border-[#2563EB] py-3.5 text-[16px] text-[#2563EB] transition-all hover:bg-[#EFF6FF]"
                    style={{ fontWeight: 600 }}
                  >
                    Schedule a Visit
                  </button>
                </div>

                <div className="my-4 border-t border-[#E5E7EB]" />

                <div className="space-y-2">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFF6FF] py-3 text-[15px] text-[#2563EB] transition-colors hover:bg-[#DBEAFE]" style={{ fontWeight: 600 }}>
                    <Phone className="h-5 w-5" /> Call Owner
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D1FAE5] py-3 text-[15px] text-[#047857] transition-colors hover:bg-[#A7F3D0]" style={{ fontWeight: 600 }} onClick={handleChatNow}>
                    <MessageCircle className="h-5 w-5" /> Chat Now
                  </button>
                </div>

                <div className="my-4 border-t border-[#E5E7EB]" />

                {/* Owner Info */}
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={property.owner.avatar}
                    alt={property.owner.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{property.owner.name}</span>
                      {property.owner.verified && <BadgeCheck className="h-4 w-4 text-[#2563EB]" />}
                    </div>
                    <p className="text-[12px] text-[#6B7280]">Property Owner</p>
                    <p className="text-[12px] text-[#6B7280]">Responds within {property.owner.responseTime}</p>
                  </div>
                </div>

                {/* Safety Notice */}
                <div className="mt-4 rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                    <p className="text-[13px] text-[#374151]" style={{ lineHeight: 1.5 }}>
                      Never pay advance without visiting the property. Verify all documents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] lg:hidden">
          <div>
            <span className="text-[20px] text-[#111827]" style={{ fontWeight: 700 }}>
              &#8377;{property.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[14px] text-[#6B7280]">/month</span>
          </div>
          <button
            onClick={() => toast.success("Booking request sent!")}
            className="rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-3 text-[15px] text-white"
            style={{ fontWeight: 600 }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute right-4 top-4 text-white" onClick={() => setLightbox(false)}>
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2"
              onClick={(e) => { e.stopPropagation(); setCurrentImage((c) => (c - 1 + property.images.length) % property.images.length); }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={property.images[currentImage]}
              alt=""
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2"
              onClick={(e) => { e.stopPropagation(); setCurrentImage((c) => (c + 1) % property.images.length); }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
            <div className="absolute bottom-6 text-[14px] text-white/80">
              {currentImage + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContentCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
      <h2 className="mb-5 flex items-center gap-2 text-[22px] text-[#111827]" style={{ fontWeight: 600 }}>
        {icon} {title}
      </h2>
      {children}
    </div>
  );
}