import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, FileText } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using RoomFinder, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any of these terms, you are prohibited from using or accessing this platform.",
        "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance.",
      ],
    },
    {
      title: "2. User Accounts",
      content: [
        "You must provide accurate and complete information when creating an account.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must be at least 18 years old to create an account and use our services.",
        "You agree to notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      title: "3. Property Listings",
      content: [
        "Property owners are responsible for the accuracy of their listing information, including pricing, amenities, and availability.",
        "RoomFinder reserves the right to remove any listing that violates our guidelines or is found to contain misleading information.",
        "All properties must undergo our verification process before appearing on the platform.",
        "Photos and descriptions must accurately represent the property. Stock photos or misleading images are not permitted.",
      ],
    },
    {
      title: "4. Booking & Payments",
      content: [
        "RoomFinder facilitates connections between tenants and property owners. We are not a party to any rental agreements.",
        "All rental agreements are directly between the tenant and the property owner.",
        "RoomFinder does not collect rent or deposits on behalf of owners. All financial transactions are between tenants and owners.",
        "Our zero-brokerage policy means we do not charge any commission or brokerage fees to tenants or owners.",
      ],
    },
    {
      title: "5. User Conduct",
      content: [
        "You must not use the platform for any unlawful purpose or to solicit others to perform unlawful acts.",
        "You must not harass, abuse, or harm other users of the platform.",
        "You must not post false, misleading, or defamatory content.",
        "You must not attempt to gain unauthorized access to other user accounts or our systems.",
        "Spam, phishing, or any form of unsolicited communication through our platform is prohibited.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "The RoomFinder platform, including its design, logos, and content, is protected by intellectual property laws.",
        "You may not reproduce, distribute, or create derivative works from our platform without express permission.",
        "User-generated content (reviews, photos) remains the property of the user but grants RoomFinder a license to display it.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "RoomFinder provides a platform for connecting tenants and property owners. We do not guarantee the quality, safety, or legality of any listed property.",
        "We are not liable for any disputes arising between tenants and property owners.",
        "We recommend that users independently verify property details before entering into any agreements.",
        "Our total liability shall not exceed the amount you have paid to RoomFinder in the preceding 12 months.",
      ],
    },
    {
      title: "8. Dispute Resolution",
      content: [
        "Any disputes arising from the use of RoomFinder shall be governed by the laws of India.",
        "Disputes shall first be attempted to be resolved through mediation.",
        "If mediation fails, disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.",
      ],
    },
    {
      title: "9. Contact",
      content: [
        "For questions about these Terms of Service, please contact us at legal@roomfinder.com or call +91 98765 43210.",
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
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Terms of Service</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <FileText className="mx-auto h-10 w-10 text-[#FCD34D]" />
          <h1 className="mt-4 font-['Poppins'] text-[36px]" style={{ fontWeight: 700 }}>Terms of Service</h1>
          <p className="mt-2 text-[15px] text-blue-200">Last updated: February 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-[15px] text-[#4B5563]" style={{ lineHeight: 1.8 }}>
            Welcome to RoomFinder. These Terms of Service govern your use of our platform and services.
            By using RoomFinder, you agree to comply with and be bound by these terms.
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
