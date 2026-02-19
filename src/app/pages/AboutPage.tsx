import { Link } from "react-router";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Users,
  Target,
  Heart,
  Building2,
  Star,
  ChevronRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const stats = [
    { value: "5,000+", label: "Properties Listed" },
    { value: "25,000+", label: "Happy Tenants" },
    { value: "500+", label: "Verified Owners" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const values = [
    { icon: Shield, title: "Trust & Safety", description: "Every property is physically verified by our team before listing. Your safety is our top priority." },
    { icon: Heart, title: "Zero Brokerage", description: "We believe in transparent dealings. No hidden charges, no brokerage — ever." },
    { icon: Users, title: "Community First", description: "We build communities, not just listings. Connecting like-minded individuals in shared spaces." },
    { icon: Target, title: "Quality Assurance", description: "Strict quality standards ensure every listed property meets our benchmarks for comfort and hygiene." },
  ];

  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", bio: "Former real estate professional with 10+ years of experience in Pune's housing market." },
    { name: "Priya Kulkarni", role: "Head of Operations", bio: "Ensures every property meets our quality standards across Pimpri-Chinchwad." },
    { name: "Amit Deshmukh", role: "Tech Lead", bio: "Building seamless digital experiences to simplify your room search journey." },
    { name: "Sneha Patil", role: "Community Manager", bio: "Bridging the gap between property owners and tenants with empathy and efficiency." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>About Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['Poppins'] text-[36px] sm:text-[48px]"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Making Room Search <br />
            <span className="text-[#FCD34D]">Simple & Trustworthy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-[18px] text-blue-100"
            style={{ lineHeight: 1.7 }}
          >
            RoomFinder is Pimpri-Chinchwad's most trusted platform for finding hostels, PGs,
            and bachelor flats — with zero brokerage and 100% verified listings.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#E5E7EB] bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label}>
              <div className="text-center">
                <p className="font-['Poppins'] text-[32px] text-[#2563EB]" style={{ fontWeight: 700 }}>{stat.value}</p>
                <p className="mt-1 text-[14px] text-[#6B7280]" style={{ fontWeight: 500 }}>{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <AnimatedSection>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1.5 text-[13px] text-[#2563EB]" style={{ fontWeight: 600 }}>Our Story</span>
                <h2 className="mt-4 font-['Poppins'] text-[28px] text-[#111827] sm:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                  Born from a Real Problem
                </h2>
                <p className="mt-6 text-[16px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                  When our founder Rahul moved to Pimpri-Chinchwad in 2018, he faced the same frustration
                  thousands of students and working professionals face — unreliable brokers, hidden charges,
                  and misleading property listings.
                </p>
                <p className="mt-4 text-[16px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                  That experience sparked the idea for RoomFinder. We started in 2020 with a simple mission:
                  create a transparent, zero-brokerage platform where tenants can find verified rooms and
                  owners can list properties for free. Today, we serve over 25,000 happy tenants across
                  Pimpri-Chinchwad and surrounding areas.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {["100% Verified Listings", "Zero Brokerage Promise", "24/7 Support"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                      <span className="text-[14px] text-[#374151]" style={{ fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="rounded-xl bg-white p-6 shadow-sm">
                        <Building2 className="h-8 w-8 text-[#2563EB]" />
                        <p className="mt-3 text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>5K+</p>
                        <p className="text-[13px] text-[#6B7280]">Listed Properties</p>
                      </div>
                      <div className="rounded-xl bg-white p-6 shadow-sm">
                        <Star className="h-8 w-8 text-[#FBBF24]" />
                        <p className="mt-3 text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>4.8</p>
                        <p className="text-[13px] text-[#6B7280]">Average Rating</p>
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <div className="rounded-xl bg-white p-6 shadow-sm">
                        <Users className="h-8 w-8 text-[#22C55E]" />
                        <p className="mt-3 text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>25K+</p>
                        <p className="text-[13px] text-[#6B7280]">Happy Tenants</p>
                      </div>
                      <div className="rounded-xl bg-white p-6 shadow-sm">
                        <MapPin className="h-8 w-8 text-[#F97316]" />
                        <p className="mt-3 text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>50+</p>
                        <p className="text-[13px] text-[#6B7280]">Localities Covered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Values */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection className="text-center">
            <span className="inline-block rounded-full bg-[#FFF7ED] px-4 py-1.5 text-[13px] text-[#F97316]" style={{ fontWeight: 600 }}>Our Values</span>
            <h2 className="mt-4 font-['Poppins'] text-[28px] text-[#111827] sm:text-[36px]" style={{ fontWeight: 700 }}>What We Stand For</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimatedSection key={v.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EFF6FF]">
                    <v.icon className="h-7 w-7 text-[#2563EB]" />
                  </div>
                  <h3 className="mt-5 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="mt-3 text-[14px] text-[#6B7280]" style={{ lineHeight: 1.7 }}>{v.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection className="text-center">
            <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1.5 text-[13px] text-[#2563EB]" style={{ fontWeight: 600 }}>Our Team</span>
            <h2 className="mt-4 font-['Poppins'] text-[28px] text-[#111827] sm:text-[36px]" style={{ fontWeight: 700 }}>Meet the People Behind RoomFinder</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <AnimatedSection key={member.name}>
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-[32px] text-white" style={{ fontWeight: 700 }}>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="mt-4 text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>{member.name}</h3>
                  <p className="text-[14px] text-[#2563EB]" style={{ fontWeight: 500 }}>{member.role}</p>
                  <p className="mt-2 text-[13px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <section className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-['Poppins'] text-[28px] text-white sm:text-[36px]" style={{ fontWeight: 700 }}>
              Ready to Find Your Perfect Room?
            </h2>
            <p className="mt-4 text-[16px] text-blue-100" style={{ lineHeight: 1.7 }}>
              Join thousands of happy tenants who found their ideal home through RoomFinder.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/search"
                className="rounded-xl bg-white px-8 py-3.5 text-[15px] text-[#2563EB] shadow-lg transition-transform hover:scale-105"
                style={{ fontWeight: 600 }}
              >
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border-2 border-white px-8 py-3.5 text-[15px] text-white transition-transform hover:scale-105"
                style={{ fontWeight: 600 }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </motion.div>
  );
}
