import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, MapPin, Star, Wifi, UtensilsCrossed, Snowflake, Car, ShieldCheck, BadgeCheck } from "lucide-react";
import type { Property } from "../data/properties";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Food: UtensilsCrossed,
  AC: Snowflake,
  Parking: Car,
  Security: ShieldCheck,
};

const typeColors: Record<string, string> = {
  "boys-hostel": "bg-[#2563EB]",
  "girls-hostel": "bg-[#EC4899]",
  "bachelor-flat": "bg-[#8B5CF6]",
};

interface Props {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:border-[#DBEAFE]"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden sm:h-[260px]">
        <ImageWithFallback
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {property.verified && (
            <span className="flex items-center gap-1 rounded-full bg-[#10B981] px-2.5 py-1 text-[11px] text-white" style={{ fontWeight: 600 }}>
              <BadgeCheck className="h-3 w-3" /> VERIFIED
            </span>
          )}
          <span className={`rounded-full ${typeColors[property.type]} px-2.5 py-1 text-[11px] text-white`} style={{ fontWeight: 600 }}>
            {property.typeLabel}
          </span>
        </div>

        {/* Favorite */}
        <motion.button
          whileTap={{ scale: 1.3 }}
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/40"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-white"}`}
          />
        </motion.button>

        {/* Availability */}
        {property.available && (
          <span className="absolute bottom-3 right-3 rounded-full bg-[#10B981] px-2.5 py-1 text-[11px] text-white" style={{ fontWeight: 600 }}>
            Available Now
          </span>
        )}

        {property.featured && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#F97316] px-2.5 py-1 text-[11px] text-white" style={{ fontWeight: 600 }}>
            FEATURED
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="mb-1 truncate text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>
          {property.name}
        </h3>

        <div className="mb-2 flex items-center gap-1.5 text-[14px] text-[#4B5563]">
          <MapPin className="h-4 w-4 text-[#2563EB]" />
          {property.location}
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(property.rating) ? "fill-[#FBBF24] text-[#FBBF24]" : "text-[#D1D5DB]"}`}
              />
            ))}
          </div>
          <span className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{property.rating}</span>
          <span className="text-[13px] text-[#6B7280]">({property.reviews} reviews)</span>
        </div>

        {/* Amenities */}
        <div className="mb-4 flex flex-wrap gap-3">
          {property.amenities.slice(0, 4).map((a) => {
            const Icon = amenityIcons[a] || Wifi;
            return (
              <div key={a} className="flex items-center gap-1 text-[12px] text-[#4B5563]">
                <Icon className="h-4 w-4" />
                {a}
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#E5E7EB] pt-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[20px] text-[#111827]" style={{ fontWeight: 700 }}>
                &#8377;{property.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[14px] text-[#6B7280]">/month</span>
            </div>
            <Link
              to={`/property/${property.id}`}
              className="rounded-lg border-2 border-[#2563EB] px-4 py-2 text-[14px] text-[#2563EB] transition-all hover:bg-[#2563EB] hover:text-white"
              style={{ fontWeight: 600 }}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
