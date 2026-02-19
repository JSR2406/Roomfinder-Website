import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  MessageSquare,
  HelpCircle,
  Building2,
  CheckCircle2,
} from "lucide-react";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  const contactInfo = [
    { icon: Phone, title: "Phone", value: "+91 98765 43210", subtitle: "Mon-Sat, 9AM - 8PM", href: "tel:+919876543210" },
    { icon: Mail, title: "Email", value: "support@roomfinder.com", subtitle: "We reply within 24 hours", href: "mailto:support@roomfinder.com" },
    { icon: MapPin, title: "Office", value: "Pimpri-Chinchwad, Pune", subtitle: "Maharashtra 411018", href: "#" },
    { icon: Clock, title: "Hours", value: "Mon - Sat: 9AM - 8PM", subtitle: "Sunday: 10AM - 4PM", href: "#" },
  ];

  const faqs = [
    { q: "How do I list my property?", a: "Simply create an owner account, go to your Owner Dashboard, and click 'Add New Property'. Follow the step-by-step wizard to list your property for free." },
    { q: "Is RoomFinder really zero brokerage?", a: "Yes! We never charge any brokerage or hidden fees to tenants or owners. Our platform is completely free to use." },
    { q: "How are properties verified?", a: "Our team physically visits and verifies every property before it appears on the platform, ensuring accuracy and quality." },
    { q: "Can I schedule a property visit?", a: "Absolutely. You can request a visit directly from the property details page, and the owner will coordinate a convenient time." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Contact Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Poppins'] text-[36px] sm:text-[44px]"
            style={{ fontWeight: 700 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-[17px] text-blue-100"
            style={{ lineHeight: 1.7 }}
          >
            Have questions about a property or need help? We're here to assist you every step of the way.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((c, i) => (
              <AnimatedSection key={c.title}>
                <a
                  href={c.href}
                  className="block rounded-xl border border-[#E5E7EB] p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#EFF6FF]">
                    <c.icon className="h-7 w-7 text-[#2563EB]" />
                  </div>
                  <h3 className="mt-4 text-[16px] text-[#111827]" style={{ fontWeight: 600 }}>{c.title}</h3>
                  <p className="mt-1 text-[14px] text-[#2563EB]" style={{ fontWeight: 500 }}>{c.value}</p>
                  <p className="mt-0.5 text-[13px] text-[#9CA3AF]">{c.subtitle}</p>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <AnimatedSection>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="font-['Poppins'] text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>Send us a Message</h2>
                <p className="mt-2 text-[14px] text-[#6B7280]">Fill out the form and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 flex flex-col items-center rounded-xl bg-[#ECFDF5] py-12 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-[#22C55E]" />
                    <h3 className="mt-4 text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Message Sent!</h3>
                    <p className="mt-2 text-[14px] text-[#6B7280]">We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Phone (optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="property">Property Question</option>
                          <option value="listing">List My Property</option>
                          <option value="complaint">Complaint</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#2563EB] focus:ring-4 focus:ring-[rgba(37,99,235,0.1)]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] py-3 text-[15px] text-white shadow-lg transition-transform hover:scale-[1.02]"
                      style={{ fontWeight: 600 }}
                    >
                      <Send className="h-4 w-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* FAQ */}
            <AnimatedSection>
              <div>
                <h2 className="font-['Poppins'] text-[24px] text-[#111827]" style={{ fontWeight: 700 }}>
                  <HelpCircle className="mr-2 inline h-6 w-6 text-[#F97316]" />
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                      <h3 className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{faq.q}</h3>
                      <p className="mt-2 text-[14px] text-[#6B7280]" style={{ lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-xl bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] p-6">
                  <h3 className="text-[16px] text-[#111827]" style={{ fontWeight: 600 }}>
                    <MessageSquare className="mr-2 inline h-5 w-5 text-[#F97316]" />
                    Need Immediate Help?
                  </h3>
                  <p className="mt-2 text-[14px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
                    Our support team is available Monday to Saturday, 9 AM to 8 PM. Call us at
                    <a href="tel:+919876543210" className="ml-1 text-[#F97316]" style={{ fontWeight: 600 }}>+91 98765 43210</a>
                    {" "}for quick assistance.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
