import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Cookie } from "lucide-react";

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      required: true,
      description: "These cookies are necessary for the platform to function properly. They enable core features like user authentication, session management, and security.",
      examples: ["Session ID", "Authentication token", "CSRF protection", "Load balancing"],
    },
    {
      name: "Analytics Cookies",
      required: false,
      description: "These cookies help us understand how visitors interact with our platform by collecting and reporting information anonymously.",
      examples: ["Page views and navigation paths", "Time spent on pages", "Device and browser information", "Search queries"],
    },
    {
      name: "Functional Cookies",
      required: false,
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: ["Language preference", "Search filters", "View mode preference (grid/list)", "Recently viewed properties"],
    },
    {
      name: "Marketing Cookies",
      required: false,
      description: "These cookies are used to track visitors across pages. The intention is to display relevant content and advertisements.",
      examples: ["Ad targeting", "Social media sharing", "Campaign tracking", "Referral source"],
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Cookie Policy</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <Cookie className="mx-auto h-10 w-10 text-[#FCD34D]" />
          <h1 className="mt-4 font-['Poppins'] text-[36px]" style={{ fontWeight: 700 }}>Cookie Policy</h1>
          <p className="mt-2 text-[15px] text-blue-200">Last updated: February 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-['Poppins'] text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>What Are Cookies?</h2>
              <p className="mt-3 text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to
                make websites work more efficiently and to provide information to the owners of the site. RoomFinder uses cookies
                to enhance your experience and improve our services.
              </p>
            </div>

            <div>
              <h2 className="font-['Poppins'] text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Types of Cookies We Use</h2>
              <div className="mt-6 space-y-6">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.name} className="rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] text-[#111827]" style={{ fontWeight: 600 }}>{cookie.name}</h3>
                      {cookie.required ? (
                        <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] text-[#22C55E]" style={{ fontWeight: 600 }}>Required</span>
                      ) : (
                        <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] text-[#2563EB]" style={{ fontWeight: 600 }}>Optional</span>
                      )}
                    </div>
                    <p className="mt-3 text-[14px] text-[#6B7280]" style={{ lineHeight: 1.7 }}>{cookie.description}</p>
                    <div className="mt-4">
                      <p className="text-[13px] text-[#374151]" style={{ fontWeight: 500 }}>Examples:</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cookie.examples.map((ex) => (
                          <span key={ex} className="rounded-lg bg-[#F3F4F6] px-3 py-1 text-[13px] text-[#6B7280]">{ex}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-['Poppins'] text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Managing Cookies</h2>
              <p className="mt-3 text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability
                of websites to set cookies, you may worsen your overall user experience, as some features may no longer function properly.
              </p>
              <p className="mt-3 text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                To manage cookies in your browser:
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Chrome: Settings > Privacy and Security > Cookies",
                  "Firefox: Options > Privacy & Security > Cookies",
                  "Safari: Preferences > Privacy > Cookies",
                  "Edge: Settings > Cookies and Site Permissions",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-[#4B5563]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Poppins'] text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>Contact Us</h2>
              <p className="mt-3 text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                If you have any questions about our use of cookies, please contact us at{" "}
                <a href="mailto:privacy@roomfinder.com" className="text-[#2563EB] hover:underline">privacy@roomfinder.com</a>
                {" "}or visit our <Link to="/contact" className="text-[#2563EB] hover:underline">Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
