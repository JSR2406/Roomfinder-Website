export interface Property {
  id: string;
  name: string;
  type: "boys-hostel" | "girls-hostel" | "bachelor-flat";
  typeLabel: string;
  location: string;
  address: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  verified: boolean;
  featured: boolean;
  available: boolean;
  gender: "boys" | "girls" | "co-ed";
  views: number;
  postedDate: string;
  owner: {
    name: string;
    avatar: string;
    responseTime: string;
    verified: boolean;
  };
  roomTypes: {
    type: string;
    price: number;
    deposit: number;
    available: boolean;
    capacity: number;
    amenities: string[];
  }[];
  description: string;
  highlights: string[];
  rules: { label: string; value: string; allowed: boolean | null }[];
  nearbyPlaces: {
    category: string;
    places: { name: string; distance: string }[];
  }[];
}

export const PROPERTY_IMAGES = {
  hero: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzE0MDE4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hostel1: "https://images.unsplash.com/photo-1688724740479-082da10d0bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwSW5kaWF8ZW58MXx8fHwxNzcxNDMzMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  room1: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGhvc3RlbCUyMHJvb20lMjBpbnRlcmlvciUyMGJlZHxlbnwxfHx8fDE3NzE0MzMzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  apartment1: "https://images.unsplash.com/photo-1758523669073-edfbea249144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaGFyZWQlMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTQzMzMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  dorm1: "https://images.unsplash.com/photo-1767800766055-1cdbd2e351b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwcm9vbSUyMGZ1cm5pc2hlZHxlbnwxfHx8fDE3NzE0MzMzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bedroom1: "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yJTIwbW9kZXJuJTIwZnVybml0dXJlfGVufDF8fHx8MTc3MTQzMzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  kitchen1: "https://images.unsplash.com/photo-1758555226274-7b9f5c220b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwY2xlYW4lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzcxNDMzMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  building1: "https://images.unsplash.com/photo-1771337744364-e7dd00c2921c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZmFjYWRlJTIwdXJiYW58ZW58MXx8fHwxNzcxNDMzMzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const AVATARS = {
  woman1: "https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEluZGlhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDMzMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  man1: "https://images.unsplash.com/photo-1615724320397-9d4db10ec2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEluZGlhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQzMzMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  man2: "https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc3MTQ3NjY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  woman2: "https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBidXNpbmVzc3dvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90JTIwb2ZmaWNlfGVufDF8fHx8MTc3MTQ5NTkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const properties: Property[] = [
  {
    id: "1",
    name: "Sunshine PG for Boys",
    type: "boys-hostel",
    typeLabel: "Boys Hostel",
    location: "Pimpri, Near PCMC",
    address: "Shop No. 5, Ganesh Plaza, Pimpri, Pune - 411018",
    price: 8000,
    rating: 4.8,
    reviews: 142,
    image: PROPERTY_IMAGES.hostel1,
    images: [PROPERTY_IMAGES.hostel1, PROPERTY_IMAGES.room1, PROPERTY_IMAGES.bedroom1, PROPERTY_IMAGES.kitchen1, PROPERTY_IMAGES.apartment1, PROPERTY_IMAGES.dorm1],
    amenities: ["WiFi", "Food", "AC", "Parking"],
    verified: true,
    featured: true,
    available: true,
    gender: "boys",
    views: 324,
    postedDate: "2 weeks ago",
    owner: { name: "Rajesh Kumar", avatar: AVATARS.man2, responseTime: "2 hours", verified: true },
    roomTypes: [
      { type: "Single Room", price: 8000, deposit: 8000, available: true, capacity: 1, amenities: ["Attached Bathroom", "AC", "Balcony"] },
      { type: "Double Sharing", price: 6000, deposit: 6000, available: true, capacity: 2, amenities: ["Attached Bathroom", "AC"] },
      { type: "Triple Sharing", price: 5000, deposit: 5000, available: true, capacity: 3, amenities: ["Common Bathroom"] },
    ],
    description: "Welcome to Sunshine PG, a premium paying guest accommodation located in the heart of Pimpri. Our facility offers well-furnished rooms with modern amenities, home-cooked meals, and a friendly community atmosphere. Perfect for students and working professionals looking for a comfortable and affordable living space.",
    highlights: ["5 minutes from PCMC", "24/7 Security & CCTV", "Home-cooked Meals (3 times)", "High-speed WiFi", "Power Backup", "Parking Available"],
    rules: [
      { label: "Gate Timing", value: "11:00 PM", allowed: null },
      { label: "Smoking", value: "Not Allowed", allowed: false },
      { label: "Alcohol", value: "Not Allowed", allowed: false },
      { label: "Pets", value: "Not Allowed", allowed: false },
      { label: "Visitors", value: "Allowed till 9:00 PM", allowed: true },
      { label: "Notice Period", value: "1 Month", allowed: null },
      { label: "Lock-in Period", value: "3 Months", allowed: null },
    ],
    nearbyPlaces: [
      { category: "Educational", places: [{ name: "MIT College", distance: "2 km" }, { name: "PCCOE", distance: "1.5 km" }] },
      { category: "IT Parks", places: [{ name: "Tata Technologies", distance: "3 km" }, { name: "Infosys", distance: "4 km" }] },
      { category: "Transport", places: [{ name: "Pimpri Railway", distance: "2 km" }, { name: "PCMC Bus Stop", distance: "500m" }] },
      { category: "Healthcare", places: [{ name: "YCM Hospital", distance: "1 km" }, { name: "Ruby Hall Clinic", distance: "3 km" }] },
    ],
  },
  {
    id: "2",
    name: "Royal Girls Hostel",
    type: "girls-hostel",
    typeLabel: "Girls Hostel",
    location: "Chinchwad, Near Station",
    address: "Building No. 12, Chinchwad Station Road, Pune - 411019",
    price: 7500,
    rating: 4.6,
    reviews: 98,
    image: PROPERTY_IMAGES.room1,
    images: [PROPERTY_IMAGES.room1, PROPERTY_IMAGES.bedroom1, PROPERTY_IMAGES.kitchen1],
    amenities: ["WiFi", "Food", "Security", "Laundry"],
    verified: true,
    featured: true,
    available: true,
    gender: "girls",
    views: 267,
    postedDate: "1 week ago",
    owner: { name: "Sunita Patil", avatar: AVATARS.woman2, responseTime: "1 hour", verified: true },
    roomTypes: [
      { type: "Single Room", price: 9000, deposit: 9000, available: true, capacity: 1, amenities: ["Attached Bathroom", "AC"] },
      { type: "Double Sharing", price: 7500, deposit: 7500, available: true, capacity: 2, amenities: ["Attached Bathroom"] },
    ],
    description: "Royal Girls Hostel is a secure and comfortable accommodation exclusively for women. Located near Chinchwad station with 24/7 security, CCTV surveillance, and a warm homelike atmosphere.",
    highlights: ["Women-only facility", "24/7 CCTV Security", "Near Railway Station", "Nutritious Meals"],
    rules: [
      { label: "Gate Timing", value: "10:00 PM", allowed: null },
      { label: "Smoking", value: "Not Allowed", allowed: false },
      { label: "Visitors", value: "Allowed till 7:00 PM (women only)", allowed: true },
    ],
    nearbyPlaces: [
      { category: "Transport", places: [{ name: "Chinchwad Station", distance: "500m" }] },
    ],
  },
  {
    id: "3",
    name: "Urban Living Bachelor Flat",
    type: "bachelor-flat",
    typeLabel: "Bachelor Flat",
    location: "Nigdi, Near IT Park",
    address: "Sector 27, Pradhikaran, Nigdi, Pune - 411044",
    price: 12000,
    rating: 4.5,
    reviews: 76,
    image: PROPERTY_IMAGES.apartment1,
    images: [PROPERTY_IMAGES.apartment1, PROPERTY_IMAGES.bedroom1, PROPERTY_IMAGES.kitchen1],
    amenities: ["WiFi", "AC", "Parking", "Gym"],
    verified: true,
    featured: false,
    available: true,
    gender: "co-ed",
    views: 189,
    postedDate: "3 days ago",
    owner: { name: "Amit Deshmukh", avatar: AVATARS.man1, responseTime: "3 hours", verified: true },
    roomTypes: [
      { type: "1 BHK", price: 12000, deposit: 24000, available: true, capacity: 2, amenities: ["Kitchen", "Attached Bathroom", "AC", "Balcony"] },
      { type: "2 BHK", price: 18000, deposit: 36000, available: false, capacity: 4, amenities: ["Kitchen", "2 Bathrooms", "AC", "Balcony"] },
    ],
    description: "Modern bachelor flat in the heart of Nigdi IT hub. Fully furnished with contemporary design, modular kitchen, and all modern amenities. Ideal for young professionals.",
    highlights: ["Fully Furnished", "Modular Kitchen", "Near IT Parks", "Gym Access", "Covered Parking"],
    rules: [
      { label: "Gate Timing", value: "No Restriction", allowed: true },
      { label: "Smoking", value: "Not Allowed Inside", allowed: false },
      { label: "Pets", value: "Allowed (Small)", allowed: true },
    ],
    nearbyPlaces: [
      { category: "IT Parks", places: [{ name: "Hinjewadi IT Park", distance: "8 km" }, { name: "Blue Ridge SEZ", distance: "5 km" }] },
    ],
  },
  {
    id: "4",
    name: "Green Valley PG",
    type: "boys-hostel",
    typeLabel: "Boys Hostel",
    location: "Akurdi, College Road",
    address: "Plot No. 8, College Road, Akurdi, Pune - 411035",
    price: 6500,
    rating: 4.3,
    reviews: 64,
    image: PROPERTY_IMAGES.dorm1,
    images: [PROPERTY_IMAGES.dorm1, PROPERTY_IMAGES.room1],
    amenities: ["WiFi", "Food", "Laundry", "Power Backup"],
    verified: true,
    featured: false,
    available: true,
    gender: "boys",
    views: 156,
    postedDate: "5 days ago",
    owner: { name: "Vinod Jadhav", avatar: AVATARS.man2, responseTime: "4 hours", verified: false },
    roomTypes: [
      { type: "Double Sharing", price: 6500, deposit: 6500, available: true, capacity: 2, amenities: ["Common Bathroom", "Study Table"] },
      { type: "Triple Sharing", price: 5000, deposit: 5000, available: true, capacity: 3, amenities: ["Common Bathroom"] },
    ],
    description: "Affordable and comfortable PG accommodation near major colleges in Akurdi. Perfect for budget-conscious students seeking quality living.",
    highlights: ["Budget Friendly", "Near Colleges", "Homely Food", "Study-friendly Environment"],
    rules: [
      { label: "Gate Timing", value: "10:30 PM", allowed: null },
      { label: "Smoking", value: "Not Allowed", allowed: false },
    ],
    nearbyPlaces: [
      { category: "Educational", places: [{ name: "D.Y. Patil College", distance: "1 km" }] },
    ],
  },
  {
    id: "5",
    name: "Comfort Zone Ladies PG",
    type: "girls-hostel",
    typeLabel: "Girls Hostel",
    location: "Bhosari, MIDC Area",
    address: "Building 5, MIDC Road, Bhosari, Pune - 411026",
    price: 7000,
    rating: 4.7,
    reviews: 113,
    image: PROPERTY_IMAGES.bedroom1,
    images: [PROPERTY_IMAGES.bedroom1, PROPERTY_IMAGES.kitchen1],
    amenities: ["WiFi", "Food", "AC", "Security"],
    verified: true,
    featured: true,
    available: true,
    gender: "girls",
    views: 298,
    postedDate: "1 week ago",
    owner: { name: "Meera Shah", avatar: AVATARS.woman1, responseTime: "30 mins", verified: true },
    roomTypes: [
      { type: "Single Room", price: 8500, deposit: 8500, available: true, capacity: 1, amenities: ["Attached Bathroom", "AC", "Wardrobe"] },
      { type: "Double Sharing", price: 7000, deposit: 7000, available: true, capacity: 2, amenities: ["Attached Bathroom", "Fan"] },
    ],
    description: "A safe haven for working women and students. Comfort Zone offers excellent amenities, nutritious food, and a supportive community in a prime location.",
    highlights: ["Women Safety Priority", "Healthy Meals", "Excellent Community", "Near MIDC"],
    rules: [
      { label: "Gate Timing", value: "10:00 PM", allowed: null },
      { label: "Visitors", value: "Women only, till 8 PM", allowed: true },
    ],
    nearbyPlaces: [
      { category: "IT Parks", places: [{ name: "MIDC Bhosari", distance: "500m" }] },
    ],
  },
  {
    id: "6",
    name: "Metro Heights Studio",
    type: "bachelor-flat",
    typeLabel: "Bachelor Flat",
    location: "Pimpri, Metro Station",
    address: "Metro Heights, Near Pimpri Metro, Pune - 411018",
    price: 15000,
    rating: 4.9,
    reviews: 52,
    image: PROPERTY_IMAGES.kitchen1,
    images: [PROPERTY_IMAGES.kitchen1, PROPERTY_IMAGES.apartment1, PROPERTY_IMAGES.bedroom1],
    amenities: ["WiFi", "AC", "Gym", "Swimming Pool"],
    verified: true,
    featured: true,
    available: true,
    gender: "co-ed",
    views: 412,
    postedDate: "2 days ago",
    owner: { name: "Prashant More", avatar: AVATARS.man1, responseTime: "1 hour", verified: true },
    roomTypes: [
      { type: "Studio", price: 15000, deposit: 30000, available: true, capacity: 1, amenities: ["Kitchen", "AC", "Attached Bathroom", "Balcony", "Furnished"] },
    ],
    description: "Premium studio apartments right next to Pimpri Metro Station. Fully furnished with modern amenities including gym and swimming pool access.",
    highlights: ["Metro Adjacent", "Fully Furnished Studio", "Gym & Pool", "24/7 Security", "Premium Interiors"],
    rules: [
      { label: "Gate Timing", value: "No Restriction", allowed: true },
      { label: "Pets", value: "Not Allowed", allowed: false },
    ],
    nearbyPlaces: [
      { category: "Transport", places: [{ name: "Pimpri Metro", distance: "100m" }] },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    avatar: AVATARS.woman1,
    rating: 5,
    text: "Amazing experience! Found my perfect PG within a week. The no-brokerage policy saved me a lot of money. Highly recommended for anyone moving to PCMC area!",
  },
  {
    id: 2,
    name: "Rahul Deshmukh",
    role: "MBA Student",
    avatar: AVATARS.man1,
    rating: 5,
    text: "RoomFinder made my hostel search so easy. All properties are verified and the photos match reality. The direct owner contact feature is a game-changer.",
  },
  {
    id: 3,
    name: "Ananya Patil",
    role: "IT Professional",
    avatar: AVATARS.woman2,
    rating: 4,
    text: "Great platform with genuine listings. I found a comfortable bachelor flat near my office in just 3 days. The filter options are very helpful.",
  },
  {
    id: 4,
    name: "Vikram Joshi",
    role: "Engineering Student",
    avatar: AVATARS.man2,
    rating: 5,
    text: "Best platform for finding PG accommodations in Pimpri-Chinchwad. The customer support team helped me throughout the process. Five stars!",
  },
];