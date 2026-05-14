import { Link } from "react-router";
import { Calendar, MapPin, Clock, Star, ChevronRight, Wine, Compass } from "lucide-react";
import { useUser } from "../context/UserContext";

const pastEvents = [
  {
    id: "spring-whites",
    title: "Spring White Wine Evening",
    date: "March 15, 2026",
    time: "18:30",
    venue: "Weinkultur, Schwabing",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop",
    rating: 4.5,
    winesTasted: 4,
  },
  {
    id: "winter-reds",
    title: "Winter Red Wine Collection",
    date: "January 20, 2026",
    time: "19:00",
    venue: "Cork & Barrel",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
    rating: 4.2,
    winesTasted: 5,
  },
];

export function MyTastings() {
  const { user, registeredEvents } = useUser();
  const isNewUser = user?.isNewUser ?? false;

  // For existing users (login), also show past events
  const displayPast = isNewUser ? [] : pastEvents;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tastings</h1>
          <p className="text-gray-600">Track your wine tasting journey and experiences</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">

          {/* Empty State - no events at all */}
          {registeredEvents.length === 0 && displayPast.length === 0 && (
            <div className="text-center py-20">
              <Wine size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tastings yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't registered for any wine tasting events yet. Explore upcoming events to get started!
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
              >
                <Compass size={20} />
                Discover Events
              </Link>
            </div>
          )}

          {/* Upcoming / Registered Events */}
          {registeredEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registeredEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}/tasting`}
                    className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200 group"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[var(--wine-red-dark)] transition-colors">
                          {event.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold ml-2 flex-shrink-0">
                          Confirmed
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[var(--wine-red)]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[var(--wine-red)]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[var(--wine-red)]" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-2 text-[var(--wine-red-dark)] font-semibold">
                          <Wine size={18} />
                          <span>Start Tasting Experience</span>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {displayPast.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Past Events</h2>
              <div className="space-y-4">
                {displayPast.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}/summary`}
                    className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200 group"
                  >
                    <div className="flex gap-6 p-6">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-40 h-28 object-cover rounded-lg grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[var(--wine-red-dark)] transition-colors">
                            {event.title}
                          </h3>
                          <ChevronRight size={24} className="text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-[var(--wine-red)]" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-[var(--wine-red)]" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1">
                            <Star size={18} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-900">{event.rating}</span>
                            <span className="text-gray-500">your rating</span>
                          </div>
                          <span className="text-gray-600">{event.winesTasted} wines tasted</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}