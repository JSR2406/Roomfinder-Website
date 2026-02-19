import { Link } from "react-router";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Clock, User, ArrowRight, Tag, TrendingUp, BookOpen } from "lucide-react";
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

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Localities in Pimpri-Chinchwad for Students",
    excerpt: "Discover the best neighborhoods for students near top colleges — with affordable hostels, great connectivity, and vibrant food scenes.",
    category: "Guide",
    author: "Rahul Sharma",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "How to Spot a Reliable Hostel: A Checklist for First-Timers",
    excerpt: "Moving to a new city? Use our 15-point checklist to evaluate any hostel or PG before signing the agreement.",
    category: "Tips",
    author: "Priya Kulkarni",
    date: "Feb 8, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Understanding Rental Agreements: What Every Tenant Should Know",
    excerpt: "Demystifying rental agreements — clauses to watch out for, your rights as a tenant, and common red flags.",
    category: "Legal",
    author: "Amit Deshmukh",
    date: "Feb 3, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "5 Ways to Make Your Hostel Room Feel Like Home",
    excerpt: "Simple, budget-friendly ideas to personalize and brighten up your shared living space without breaking any rules.",
    category: "Lifestyle",
    author: "Sneha Patil",
    date: "Jan 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "PCMC Infrastructure Update: New Metro Lines and What It Means for Renters",
    excerpt: "The upcoming Hinjawadi-Shivajinagar metro line will transform Pimpri-Chinchwad's rental landscape. Here's what to expect.",
    category: "News",
    author: "Rahul Sharma",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Property Owner's Guide: How to Get More Bookings on RoomFinder",
    excerpt: "Optimize your property listing with better photos, competitive pricing, and responsive communication for maximum occupancy.",
    category: "Owners",
    author: "Priya Kulkarni",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    featured: false,
  },
];

const categories = ["All", "Guide", "Tips", "Legal", "Lifestyle", "News", "Owners"];

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Blog</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <BookOpen className="mx-auto h-10 w-10 text-[#FCD34D]" />
            <h1 className="mt-4 font-['Poppins'] text-[36px] sm:text-[44px]" style={{ fontWeight: 700 }}>
              RoomFinder Blog
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[17px] text-blue-100" style={{ lineHeight: 1.7 }}>
              Tips, guides, and insights for tenants and property owners in Pimpri-Chinchwad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 rounded-full px-5 py-2 text-[14px] transition-colors ${
                  i === 0
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E5E7EB] text-[#6B7280] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
                style={{ fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <AnimatedSection>
              <div className="grid overflow-hidden rounded-2xl bg-[#F9FAFB] lg:grid-cols-2">
                <div className="aspect-video overflow-hidden lg:aspect-auto">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-[12px] text-[#F97316]" style={{ fontWeight: 600 }}>
                      Featured
                    </span>
                    <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] text-[#2563EB]" style={{ fontWeight: 500 }}>
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="mt-4 font-['Poppins'] text-[24px] text-[#111827] sm:text-[28px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-[15px] text-[#6B7280]" style={{ lineHeight: 1.7 }}>{featuredPost.excerpt}</p>
                  <div className="mt-5 flex items-center gap-4 text-[13px] text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {featuredPost.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <button className="mt-6 flex w-fit items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-[14px] text-white transition-transform hover:scale-105" style={{ fontWeight: 600 }}>
                    Read Article <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="bg-[#F9FAFB] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-['Poppins'] text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>
            <TrendingUp className="mr-2 inline h-6 w-6 text-[#F97316]" />
            Latest Articles
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <AnimatedSection key={post.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] text-[#2563EB]" style={{ fontWeight: 500 }}>
                        <Tag className="mr-1 inline h-3 w-3" />{post.category}
                      </span>
                      <span className="text-[12px] text-[#9CA3AF]">{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-[17px] text-[#111827]" style={{ fontWeight: 600, lineHeight: 1.4 }}>{post.title}</h3>
                    <p className="mt-2 text-[14px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-[#F3F4F6] pt-4">
                      <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                        <User className="h-3.5 w-3.5" /> {post.author}
                      </div>
                      <span className="text-[13px] text-[#9CA3AF]">{post.date}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <AnimatedSection>
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
            <h2 className="font-['Poppins'] text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>
              Stay Updated
            </h2>
            <p className="mt-3 text-[15px] text-[#6B7280]">
              Get the latest articles, tips, and property insights delivered to your inbox.
            </p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-[#D1D5DB] px-5 py-3 text-[14px] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
              />
              <button
                className="shrink-0 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-6 py-3 text-[14px] text-white transition-transform hover:scale-105"
                style={{ fontWeight: 600 }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </motion.div>
  );
}
