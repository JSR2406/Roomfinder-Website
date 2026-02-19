import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Map,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Star,
  MapPin,
  Building2,
  Filter,
} from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

/* ======================== FILTER SIDEBAR ======================== */
function FilterSidebar({
  filters,
  setFilters,
  onClose,
  isMobile = false,
}: {
  filters: any;
  setFilters: (f: any) => void;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: true,
    price: true,
    type: true,
    amenities: false,
    rating: false,
  });

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const locations = [
    { name: "Pimpri", count: 124 },
    { name: "Chinchwad", count: 98 },
    { name: "Nigdi", count: 76 },
    { name: "Akurdi", count: 54 },
    { name: "Bhosari", count: 42 },
  ];

  const types = [
    { key: "all", label: "All Properties" },
    { key: "boys-hostel", label: "Boys Hostel" },
    { key: "girls-hostel", label: "Girls Hostel" },
    { key: "bachelor-flat", label: "Bachelor Flat" },
  ];

  const amenities = [
    "WiFi", "AC", "Food", "Parking", "Attached Bathroom",
    "Balcony", "Laundry", "Security", "Power Backup", "Gym",
  ];

  return (
    <div className={`${isMobile ? "" : "sticky top-24 rounded-xl border border-[#E5E7EB] bg-white shadow-sm"} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
        <h3 className="text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>
          <SlidersHorizontal className="mr-2 inline h-5 w-5" /> Filters
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setFilters({ type: "all", locations: [], priceRange: [5000, 50000], amenities: [], rating: 0 })}
            className="text-[13px] text-[#2563EB]"
            style={{ fontWeight: 600 }}
          >
            Clear All
          </button>
          {isMobile && onClose && (
            <button onClick={onClose}>
              <X className="h-5 w-5 text-[#6B7280]" />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-5">
        {/* Location */}
        <div className="mb-5">
          <button onClick={() => toggleSection("location")} className="flex w-full items-center justify-between py-2">
            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>Location</span>
            {openSections.location ? <ChevronUp className="h-4 w-4 text-[#6B7280]" /> : <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
          </button>
          <AnimatePresence>
            {openSections.location && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2">
                  {locations.map((loc) => (
                    <label key={loc.name} className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#F9FAFB]">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={filters.locations.includes(loc.name)}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...filters.locations, loc.name]
                              : filters.locations.filter((l: string) => l !== loc.name);
                            setFilters({ ...filters, locations: next });
                          }}
                          className="h-4.5 w-4.5 rounded border-[#D1D5DB] text-[#2563EB] accent-[#2563EB]"
                        />
                        <span className="text-[14px] text-[#374151]">{loc.name}</span>
                      </div>
                      <span className="text-[12px] text-[#9CA3AF]">({loc.count})</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-5 border-t border-[#E5E7EB]" />

        {/* Price Range */}
        <div className="mb-5">
          <button onClick={() => toggleSection("price")} className="flex w-full items-center justify-between py-2">
            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>Price Range</span>
            {openSections.price ? <ChevronUp className="h-4 w-4 text-[#6B7280]" /> : <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
          </button>
          <AnimatePresence>
            {openSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <div className="mb-3 flex items-center justify-between text-[14px] text-[#2563EB]" style={{ fontWeight: 600 }}>
                    <span>&#8377;{filters.priceRange[0].toLocaleString("en-IN")}</span>
                    <span>&#8377;{filters.priceRange[1].toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={3000}
                    max={50000}
                    step={1000}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })
                    }
                    className="w-full accent-[#2563EB]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-5 border-t border-[#E5E7EB]" />

        {/* Property Type */}
        <div className="mb-5">
          <button onClick={() => toggleSection("type")} className="flex w-full items-center justify-between py-2">
            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>Property Type</span>
            {openSections.type ? <ChevronUp className="h-4 w-4 text-[#6B7280]" /> : <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
          </button>
          <AnimatePresence>
            {openSections.type && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2">
                  {types.map((t) => (
                    <label key={t.key} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#F9FAFB]">
                      <input
                        type="radio"
                        name="type"
                        checked={filters.type === t.key}
                        onChange={() => setFilters({ ...filters, type: t.key })}
                        className="accent-[#2563EB]"
                      />
                      <span className="text-[14px] text-[#374151]">{t.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-5 border-t border-[#E5E7EB]" />

        {/* Amenities */}
        <div className="mb-5">
          <button onClick={() => toggleSection("amenities")} className="flex w-full items-center justify-between py-2">
            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>Amenities</span>
            {openSections.amenities ? <ChevronUp className="h-4 w-4 text-[#6B7280]" /> : <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
          </button>
          <AnimatePresence>
            {openSections.amenities && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {amenities.map((a) => (
                    <label key={a} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#F9FAFB]">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(a)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...filters.amenities, a]
                            : filters.amenities.filter((x: string) => x !== a);
                          setFilters({ ...filters, amenities: next });
                        }}
                        className="accent-[#2563EB]"
                      />
                      <span className="text-[13px] text-[#374151]">{a}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-5 border-t border-[#E5E7EB]" />

        {/* Rating */}
        <div>
          <button onClick={() => toggleSection("rating")} className="flex w-full items-center justify-between py-2">
            <span className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>Rating</span>
            {openSections.rating ? <ChevronUp className="h-4 w-4 text-[#6B7280]" /> : <ChevronDown className="h-4 w-4 text-[#6B7280]" />}
          </button>
          <AnimatePresence>
            {openSections.rating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2">
                  {[4, 3, 2, 0].map((r) => (
                    <label key={r} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#F9FAFB]">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === r}
                        onChange={() => setFilters({ ...filters, rating: r })}
                        className="accent-[#2563EB]"
                      />
                      <div className="flex items-center gap-1">
                        {r > 0 ? (
                          <>
                            {Array.from({ length: r }).map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
                            ))}
                            <span className="ml-1 text-[13px] text-[#374151]">& up</span>
                          </>
                        ) : (
                          <span className="text-[13px] text-[#374151]">Any rating</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Apply Button (mobile) */}
      {isMobile && (
        <div className="border-t border-[#E5E7EB] p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] py-3 text-[15px] text-white shadow-md"
            style={{ fontWeight: 600 }}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

/* ======================== SEARCH PAGE ======================== */
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get("type");
  const validTypes = ["boys-hostel", "girls-hostel", "bachelor-flat"];

  const [filters, setFilters] = useState({
    type: typeFromUrl && validTypes.includes(typeFromUrl) ? typeFromUrl : "all",
    locations: [] as string[],
    priceRange: [5000, 50000],
    amenities: [] as string[],
    rating: 0,
  });

  // Sync filter with URL search params when they change
  useEffect(() => {
    const newType = searchParams.get("type");
    if (newType && validTypes.includes(newType)) {
      setFilters((prev) => ({ ...prev, type: newType }));
      setPage(1);
    } else if (!newType) {
      setFilters((prev) => ({ ...prev, type: "all" }));
      setPage(1);
    }
  }, [searchParams]);

  const [sort, setSort] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilter, setMobileFilter] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.type !== "all") {
      result = result.filter((p) => p.type === filters.type);
    }
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sort]);

  // Reset to page 1 when filters change
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  const handleSetFilters = (f: any) => {
    setFilters(f);
    setPage(1);
  };

  const activeFilterCount = [
    filters.type !== "all",
    filters.locations.length > 0,
    filters.priceRange[0] !== 5000 || filters.priceRange[1] !== 50000,
    filters.amenities.length > 0,
    filters.rating > 0,
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F9FAFB] pt-20"
    >
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[14px] text-[#6B7280] lg:px-8">
          <Link to="/" className="hover:text-[#2563EB]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#111827]" style={{ fontWeight: 500 }}>Search Results</span>
        </div>
      </div>

      {/* Compact Search Bar */}
      <div className="sticky top-16 z-30 border-b border-[#E5E7EB] bg-white shadow-sm lg:top-16">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[rgba(37,99,235,0.1)]">
            <Search className="h-5 w-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search location, property name..."
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
          <button
            onClick={() => setMobileFilter(true)}
            className="relative flex items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-[14px] text-[#374151] transition-colors hover:border-[#2563EB] hover:bg-[#EFF6FF] lg:hidden"
            style={{ fontWeight: 500 }}
          >
            <Filter className="h-4 w-4" /> Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-[11px] text-white" style={{ fontWeight: 700 }}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden w-[320px] shrink-0 lg:block">
            <FilterSidebar filters={filters} setFilters={handleSetFilters} />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-[20px] text-[#111827]" style={{ fontWeight: 600 }}>
                  {filtered.length} Properties Found
                </h1>
                <p className="text-[14px] text-[#6B7280]">in Pimpri-Chinchwad</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[14px] text-[#374151] outline-none"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="hidden items-center gap-1 rounded-lg border border-[#D1D5DB] p-1 sm:flex">
                  {[
                    { key: "grid" as const, icon: Grid3X3 },
                    { key: "list" as const, icon: List },
                  ].map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setViewMode(key)}
                      className={`rounded-md p-1.5 transition-colors ${
                        viewMode === key ? "bg-[#2563EB] text-white" : "text-[#6B7280] hover:bg-[#F3F4F6]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Grid */}
            {paginatedResults.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {paginatedResults.map((prop, i) => (
                  <PropertyCard key={prop.id} property={prop} index={i} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#F3F4F6]">
                  <Search className="h-16 w-16 text-[#D1D5DB]" />
                </div>
                <h3 className="text-[24px] text-[#111827]" style={{ fontWeight: 600 }}>
                  No properties found
                </h3>
                <p className="mt-2 text-[16px] text-[#6B7280]">
                  Try adjusting your filters or search in nearby areas
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setFilters({ type: "all", locations: [], priceRange: [5000, 50000], amenities: [], rating: 0 })}
                    className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-[14px] text-white"
                    style={{ fontWeight: 600 }}
                  >
                    Clear All Filters
                  </button>
                  <Link
                    to="/search"
                    className="rounded-lg border-2 border-[#D1D5DB] px-6 py-2.5 text-[14px] text-[#374151]"
                    style={{ fontWeight: 600 }}
                  >
                    Browse All Properties
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] transition-colors ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-[#F3F4F6]"}`}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] transition-colors ${
                        currentPage === p
                          ? "bg-[#2563EB] text-white shadow-md"
                          : "border border-[#D1D5DB] text-[#374151] hover:bg-[#F3F4F6]"
                      }`}
                      style={{ fontWeight: currentPage === p ? 600 : 400 }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#6B7280] transition-colors ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-[#F3F4F6]"}`}
                  >
                    &gt;
                  </button>
                </div>
                <p className="text-[14px] text-[#6B7280]">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} properties
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {mobileFilter && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilter(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-[#D1D5DB]" />
              <FilterSidebar
                filters={filters}
                setFilters={handleSetFilters}
                onClose={() => setMobileFilter(false)}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}