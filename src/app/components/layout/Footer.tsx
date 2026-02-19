import { Link } from "react-router";
import { Home, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Browse Hostels", to: "/search" },
  { label: "Bachelor Flats", to: "/search?type=bachelor-flat" },
  { label: "List Property", to: "/owner-dashboard" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Blog", to: "/blog" },
];

const categoryLinks = [
  { label: "Boys Hostels", to: "/search?type=boys-hostel" },
  { label: "Girls Hostels", to: "/search?type=girls-hostel" },
  { label: "Bachelor Flats", to: "/search?type=bachelor-flat" },
  { label: "Shared Apartments", to: "/search" },
  { label: "Studio Apartments", to: "/search" },
];

const bottomLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <Home className="h-6 w-6 text-[#3B82F6]" />
              <span className="font-['Poppins'] text-[20px] text-white" style={{ fontWeight: 700 }}>RoomFinder</span>
            </Link>
            <p className="mb-6 text-[15px] text-[#9CA3AF]" style={{ lineHeight: 1.6 }}>
              Find your perfect home with zero brokerage in Pimpri-Chinchwad and surrounding areas.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] transition-all duration-200 hover:-translate-y-1 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[16px] text-white" style={{ fontWeight: 600 }}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[14px] text-[#9CA3AF] transition-all duration-200 hover:translate-x-1 hover:text-[#93C5FD]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-[16px] text-white" style={{ fontWeight: 600 }}>Categories</h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[14px] text-[#9CA3AF] transition-all duration-200 hover:translate-x-1 hover:text-[#93C5FD]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[16px] text-white" style={{ fontWeight: 600 }}>Get in Touch</h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: Mail, text: "support@roomfinder.com", href: "mailto:support@roomfinder.com" },
                { icon: MapPin, text: "Pimpri-Chinchwad, Pune, MH 411018" },
                { icon: Clock, text: "Mon-Sat: 9AM - 8PM" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#93C5FD]" />
                  {href ? (
                    <a href={href} className="text-[14px] text-[#9CA3AF] transition-colors hover:text-[#93C5FD]">{text}</a>
                  ) : (
                    <span className="text-[14px] text-[#9CA3AF]">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1F2937] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[14px] text-[#6B7280]">&copy; 2026 RoomFinder. All rights reserved.</p>
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[14px] text-[#6B7280] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
