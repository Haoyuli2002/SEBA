import { useState } from "react";
import { Search, MapPin, Calendar, Star } from "lucide-react";
import { Link } from "react-router";

const events = [
  {
    id: "summer-rose",
    title: "Summer Rosé Tasting",
    date: "Jun 14, 2026",
    time: "18:00",
    venue: "Weinkultur, Schwabing",
    price: "€15",
    registered: 12,
    capacity: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
    description: "Join us for an evening exploring premium Rosé wines from Provence.",
  },
  {
    id: "natural-wine",
    title: "Natural Wine Wednesday",
    date: "Jun 11, 2026",
    time: "19:00",
    venue: "Vinothek Maxvorstadt",
    price: "Free",
    registered: 8,
    capacity: 15,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
    description: "Discover the world of natural and organic wines.",
  },
  {
    id: "blind-tasting",
    title: "Blind Tasting Challenge",
    date: "Jun 18, 2026",
    time: "20:00",
    venue: "Cork & Barrel",
    price: "€25",
    registered: 5,
    capacity: 12,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop",
    description: "Test your palate in this exciting blind tasting competition.",
  },
  {
    id: "italian-reds",
    title: "Italian Red Wine Journey",
    date: "Jun 22, 2026",
    time: "19:30",
    venue: "Vino Italiano",
    price: "€20",
    registered: 15,
    capacity: 20,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
    description: "Explore the diverse regions of Italian red wines.",
  },
  {
    id: "champagne-evening",
    title: "Champagne & Sparkling Wines",
    date: "Jun 25, 2026",
    time: "18:30",
    venue: "Bubbles Bar",
    price: "€30",
    registered: 10,
    capacity: 16,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
    description: "Celebrate with premium champagnes and sparkling wines.",
  },
];

const filters = ["This Week", "Nearby", "Rosé", "Red", "White", "Free", "Under €20"];

export function DiscoverEvents() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["This Week", "Nearby"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Wine Events</h1>
          <p className="text-gray-600">Find and join wine tasting events near you</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, venues, wine types..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilters.includes(filter)
                    ? "bg-[var(--wine-red)] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="lg:sticky lg:top-0 h-[500px]">
              <div className="bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl h-full border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin size={64} className="text-[var(--wine-red-light)] mx-auto mb-3" />
                  <p className="text-lg font-semibold text-gray-700">Map View</p>
                  <p className="text-sm text-gray-600">Showing {events.length} events near Munich</p>
                </div>
                {events.map((event, idx) => (
                  <div
                    key={event.id}
                    className="absolute bg-[var(--wine-red)] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      left: `${20 + (idx % 3) * 30}%`,
                      top: `${20 + Math.floor(idx / 3) * 30}%`,
                    }}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {events.length} Events Found
              </h2>
              {events.map((event) => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200 group"
                >
                  <div className="flex gap-6 p-6">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-48 h-32 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[var(--wine-red-dark)] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[var(--wine-red)]" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[var(--wine-red)]" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[var(--wine-red-dark)]">{event.price}</span>
                          <span className="text-sm text-gray-500">
                            {event.registered}/{event.capacity} registered
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={18} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{event.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
