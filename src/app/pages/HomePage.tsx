import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Search,
  MapPin,
  Building2,
  IndianRupee,
  ArrowRight,
  Shield,
  HeadphonesIcon,
  Lock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Eye,
  Building,
  Banknote,
  Globe,
  Sparkles,
} from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { properties, testimonials, PROPERTY_IMAGES, AVATARS } from "../data/properties";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ======================== HERO ======================== */
function HeroSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden pt-20 lg:min-h-[700px]">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <ImageWithFallback
          src={PROPERTY_IMAGES.hero}
          alt="Modern city"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-[800px] font-['Poppins'] text-[36px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:text-[48px] lg:text-[60px]"
          style={{ fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Find Your Perfect Home in Pimpri-Chinchwad
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-4 max-w-lg text-[18px] text-white/90 sm:text-[20px]"
        >
          Verified hostels &amp; bachelor flats with no brokerage
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-6 text-white"
        >
          {[
            { icon: Building2, label: "2,500+ Properties" },
            { icon: Shield, label: "Verified Listings" },
            { icon: HeadphonesIcon, label: "24/7 Support" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[14px] sm:text-[15px]" style={{ fontWeight: 500 }}>
              <Icon className="h-5 w-5" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6 lg:p-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
            {/* Location */}
            <div className="flex-1">
              <label className="mb-1 block text-left text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                Location
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-3 py-3 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[rgba(37,99,235,0.1)]">
                <MapPin className="h-5 w-5 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="Enter location or landmark"
                  className="w-full bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="w-full lg:w-[200px]">
              <label className="mb-1 block text-left text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                Property Type
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-3 py-3 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[rgba(37,99,235,0.1)]">
                <Building2 className="h-5 w-5 text-[#6B7280]" />
                <select
                  className="w-full bg-transparent text-[15px] text-[#111827] outline-none"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="boys-hostel">Boys Hostel</option>
                  <option value="girls-hostel">Girls Hostel</option>
                  <option value="bachelor-flat">Bachelor Flat</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="w-full lg:w-[180px]">
              <label className="mb-1 block text-left text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                Budget Range
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-3 py-3">
                <IndianRupee className="h-5 w-5 text-[#6B7280]" />
                <span className="text-[15px] text-[#111827]">&#8377;5K - &#8377;20K</span>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => navigate("/search")}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 py-3.5 text-[16px] text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] lg:px-8"
              style={{ fontWeight: 600 }}
            >
              <Search className="h-5 w-5" />
              <span className="whitespace-nowrap">Search</span>
            </button>
          </div>

          {/* Quick Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Near PCMC", "IT Parks", "Colleges", "Under ₹10K", "Girls Hostel", "With Food"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate("/search")}
                className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-[13px] text-[#4B5563] transition-all hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                style={{ fontWeight: 500 }}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ======================== CATEGORIES ======================== */
function CategoriesSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const cats = [
    {
      title: "Boys Hostels",
      count: "1,234",
      gradient: "from-[#EFF6FF] to-[#DBEAFE]",
      border: "border-[#BFDBFE]",
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
      icon: "👨",
    },
    {
      title: "Girls Hostels",
      count: "987",
      gradient: "from-[#FDF2F8] to-[#FCE7F3]",
      border: "border-[#FBCFE8]",
      iconBg: "bg-[#FCE7F3]",
      iconColor: "text-[#EC4899]",
      icon: "👩",
    },
    {
      title: "Bachelor Flats",
      count: "756",
      gradient: "from-[#F5F3FF] to-[#EDE9FE]",
      border: "border-[#DDD6FE]",
      iconBg: "bg-[#EDE9FE]",
      iconColor: "text-[#8B5CF6]",
      icon: "🏢",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center font-['Poppins'] text-[28px] text-[#111827] sm:text-[32px]"
          style={{ fontWeight: 700 }}
        >
          What are you looking for?
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              whileHover={{ y: -8 }}
            >
              <Link
                to="/search"
                className={`flex items-center gap-5 rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} p-6 shadow-md transition-shadow hover:shadow-lg lg:p-8`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cat.iconBg} text-[32px]`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>
                    {cat.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7280]">{cat.count} Properties</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#9CA3AF]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== HOW IT WORKS ======================== */
function HowItWorksSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const steps = [
    { icon: Search, title: "Search Location", desc: "Enter your preferred area and budget range to find properties", color: "bg-[#2563EB]" },
    { icon: Building2, title: "Browse Properties", desc: "Explore verified listings with detailed photos and amenities", color: "bg-[#2563EB]" },
    { icon: Users, title: "Connect with Owner", desc: "Chat directly with property owners or schedule a visit", color: "bg-[#2563EB]" },
    { icon: CheckCircle2, title: "Book Your Room", desc: "Secure your room with zero brokerage and instant confirmation", color: "bg-[#10B981]" },
  ];

  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <span className="mb-2 inline-block text-[13px] tracking-[1px] text-[#2563EB]" style={{ fontWeight: 600 }}>
            SIMPLE PROCESS
          </span>
          <h2 className="font-['Poppins'] text-[28px] text-[#111827] sm:text-[40px]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            How RoomFinder Works
          </h2>
          <p className="mt-3 text-[16px] text-[#6B7280] sm:text-[18px]">Find your perfect accommodation in 4 easy steps</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.2, duration: 0.5, type: "spring" }}
              className="relative text-center"
            >
              {/* Connecting line for desktop */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+48px)] top-10 hidden h-[2px] w-[calc(100%-96px)] border-t-2 border-dashed border-[#D1D5DB] lg:block" />
              )}

              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${step.color} shadow-lg`}
              >
                <step.icon className="h-10 w-10 text-white" />
              </motion.div>
              <span className="mb-1 inline-block rounded-full bg-[#EFF6FF] px-3 py-0.5 text-[12px] text-[#2563EB]" style={{ fontWeight: 600 }}>
                0{i + 1}
              </span>
              <h3 className="mt-2 text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 text-center"
        >
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] px-8 py-4 text-[16px] text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all hover:scale-[1.02] hover:brightness-110"
            style={{ fontWeight: 600 }}
          >
            Start Your Search <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ======================== FEATURED PROPERTIES ======================== */
function FeaturedSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "All Properties" },
    { key: "boys-hostel", label: "Boys Hostels" },
    { key: "girls-hostel", label: "Girls Hostels" },
    { key: "bachelor-flat", label: "Bachelor Flats" },
  ];

  const filtered = filter === "all" ? properties : properties.filter((p) => p.type === filter);

  return (
    <section className="bg-white py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-['Poppins'] text-[28px] text-[#111827] sm:text-[40px]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
              Featured Properties
            </h2>
            <p className="mt-2 text-[16px] text-[#6B7280] sm:text-[18px]">Hand-picked properties with excellent ratings</p>
          </div>
          <Link to="/search" className="text-[15px] text-[#2563EB] transition-colors hover:text-[#1D4ED8]" style={{ fontWeight: 600 }}>
            View All &rarr;
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2 text-[14px] transition-all ${
                filter === f.key
                  ? "bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)]"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
              }`}
              style={{ fontWeight: 500 }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prop, i) => (
            <PropertyCard key={prop.id} property={prop} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#D1D5DB] px-8 py-3 text-[15px] text-[#374151] transition-all hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            style={{ fontWeight: 600 }}
          >
            Show More Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ======================== WHY CHOOSE US ======================== */
function WhyChooseSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const features = [
    { icon: Shield, title: "100% Verified", desc: "Every property is personally verified by our team" },
    { icon: Banknote, title: "No Brokerage", desc: "Connect directly with owners and save on brokerage fees" },
    { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our customer support team is always here to help you" },
    { icon: Lock, title: "Secure Payments", desc: "Your transactions are protected with bank-level security" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1E40AF] py-16 lg:py-24" ref={ref}>
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block text-[13px] tracking-[1px] text-white/80" style={{ fontWeight: 600 }}>
            WHY ROOMFINDER
          </span>
          <h2 className="font-['Poppins'] text-[28px] text-white sm:text-[40px]" style={{ fontWeight: 700 }}>
            Why Choose RoomFinder?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
            >
              <motion.div whileHover={{ rotate: 5, scale: 1.1 }}>
                <f.icon className="mb-5 h-12 w-12 text-white" />
              </motion.div>
              <h3 className="mb-2 text-[20px] text-white" style={{ fontWeight: 600 }}>
                {f.title}
              </h3>
              <p className="text-[15px] text-white/80" style={{ lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== TESTIMONIALS ======================== */
function TestimonialsSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <h2 className="font-['Poppins'] text-[28px] text-[#111827] sm:text-[40px]" style={{ fontWeight: 700 }}>
            What Our Users Say
          </h2>
          <p className="mt-3 text-[16px] text-[#6B7280] sm:text-[18px]">Real experiences from our community</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 text-[40px] text-[#DBEAFE]" style={{ fontWeight: 700, lineHeight: 1 }}>&ldquo;</div>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <p className="mb-6 text-[16px] text-[#374151] sm:text-[18px]" style={{ lineHeight: 1.6 }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-[16px] text-[#111827]" style={{ fontWeight: 600 }}>{t.name}</div>
                    <div className="text-[14px] text-[#6B7280]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.slice(0, 3).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  current % 3 === i ? "w-8 bg-[#2563EB]" : "w-2.5 bg-[#D1D5DB]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================== STATS COUNTER ======================== */
function StatsSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = [
    { value: 2500, suffix: "+", label: "Verified Properties" },
    { value: 10000, suffix: "+", label: "Happy Tenants" },
    { value: 500, suffix: "+", label: "Property Owners" },
    { value: 15, suffix: "+", label: "Cities Covered" },
  ];

  return (
    <section className="bg-white py-16 lg:py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-[#E5E7EB] lg:block" />
              )}
              <CountUp target={s.value} inView={inView} suffix={s.suffix} />
              <p className="mt-2 text-[16px] text-[#6B7280] sm:text-[18px]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, inView, suffix }: { target: number; inView: boolean; suffix: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div className="font-['Poppins'] text-[36px] text-[#2563EB] sm:text-[48px]" style={{ fontWeight: 700 }}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </div>
  );
}

/* ======================== CTA ======================== */
function CTASection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="bg-gradient-to-br from-[#F97316] to-[#EA580C] py-16 lg:py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="mb-4 h-16 w-16 text-white" />
            <h2 className="font-['Poppins'] text-[28px] text-white sm:text-[32px]" style={{ fontWeight: 600 }}>
              Are you a property owner?
            </h2>
            <p className="mt-3 text-[16px] text-white/90 sm:text-[18px]" style={{ lineHeight: 1.6 }}>
              List your property for free and reach thousands of potential tenants
            </p>
            <Link
              to="/owner-dashboard"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[16px] text-[#EA580C] shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl"
              style={{ fontWeight: 600 }}
            >
              List Your Property <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:border-l lg:border-white/20 lg:pl-10"
          >
            <Search className="mb-4 h-16 w-16 text-white" />
            <h2 className="font-['Poppins'] text-[28px] text-white sm:text-[32px]" style={{ fontWeight: 600 }}>
              Looking for accommodation?
            </h2>
            <p className="mt-3 text-[16px] text-white/90 sm:text-[18px]" style={{ lineHeight: 1.6 }}>
              Browse verified properties with zero brokerage and find your perfect home
            </p>
            <Link
              to="/search"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[16px] text-[#EA580C] shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl"
              style={{ fontWeight: 600 }}
            >
              Browse Properties <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================== HOME PAGE ======================== */
export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </motion.div>
  );
}
