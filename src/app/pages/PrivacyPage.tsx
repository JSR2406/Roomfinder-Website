import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Shield } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We collect personal information you voluntarily provide when registering, listing a property, or contacting us. This includes your name, email address, phone number, and property details.",
        "We automatically collect certain technical information when you visit our platform, including IP address, browser type, device information, and pages visited.",
        "We may collect location data when you use our search features to provide relevant property results near you.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "To provide and maintain our platform services, including property listings and search functionality.",
        "To connect tenants with property owners and facilitate communication between parties.",
        "To send you relevant notifications about property updates, booking confirmations, and service announcements.",
        "To improve our platform, analyze usage patterns, and develop new features.",
        "To verify property listings and maintain the quality of our platform.",
      ],
    },
    {
      title: "3. Information Sharing",
      content: [
        "We share your contact information with property owners/tenants only when you initiate a booking or inquiry.",
        "We do not sell your personal information to third parties.",
        "We may share anonymized, aggregated data with partners for analytics and market research.",
        "We may disclose information when required by law or to protect our legal rights.",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data transmission is encrypted using SSL/TLS technology.",
        "We regularly review and update our security practices to address new threats.",
        "Despite our efforts, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "5. Your Rights",
      content: [
        "You can access, update, or delete your personal information through your account settings.",
        "You can opt out of marketing communications at any time.",
        "You can request a copy of all personal data we hold about you.",
        "You can request deletion of your account and associated data.",
      ],
    },
    {
      title: "6. Cookies",
      content: [
        "We use cookies and similar technologies to enhance your browsing experience.",
        "Essential cookies are required for the platform to function properly.",
        "Analytics cookies help us understand how you use our platform.",
        "You can manage cookie preferences through your browser settings. See our Cookie Policy for more details.",
      ],
    },
    {
      title: "7. Contact Us",
      content: [
        "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@roomfinder.com or call +91 98765 43210.",
        "Our office is located at Pimpri-Chinchwad, Pune, Maharashtra 411018.",
      ],
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Privacy Policy</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <Shield className="mx-auto h-10 w-10 text-[#FCD34D]" />
          <h1 className="mt-4 font-['Poppins'] text-[36px]" style={{ fontWeight: 700 }}>Privacy Policy</h1>
          <p className="mt-2 text-[15px] text-blue-200">Last updated: February 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
            At RoomFinder, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-['Poppins'] text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
