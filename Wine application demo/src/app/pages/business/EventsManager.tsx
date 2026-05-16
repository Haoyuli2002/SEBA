import { Link } from "react-router";
import { Plus, Calendar, Clock, MapPin, Search, Filter } from "lucide-react";
import { useUser } from "../../context/UserContext";

const events = [
  {
    id: "summer-rose",
    name: "Summer Rosé Tasting",
    date: "June 14, 2026",
    time: "18:00",
    location: "Weinkultur, Schwabing",
    registered: 12,
    capacity: 20,
    status: "Published",
    revenue: 180,
  },
  {
    id: "natural-wine",
    name: "Autumn Tasting",
    date: "September 20, 2026",
    time: "19:00",
    location: "Weinkultur, Schwabing",
    registered: 0,
    capacity: 25,
    status: "Draft",
    revenue: 0,
  },
  {
    id: "spring-whites",
    name: "Spring White Wine Evening",
    date: "March 15, 2026",
    time: "18:30",
    location: "Weinkultur, Schwabing",
    registered: 20,
    capacity: 20,
    status: "Completed",
    revenue: 300,
  },
];

export function EventsManager() {
  const { user } = useUser();
  const isNewUser = user?.isNewUser ?? false;
  const displayEvents = isNewUser ? [] : events;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600 mt-1">Manage and monitor your tasting events</p>
        </div>
        <Link
          to="/business/events/create"
          className="flex items-center gap-2 bg-[var(--wine-red)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm"
        >
          <Plus size={20} />
          Create Event
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)] bg-white"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700 text-sm font-medium">
            <Filter size={18} />
            Filter
          </button>
          <select className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700 text-sm font-medium">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {displayEvents.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events yet</h3>
            <p className="text-gray-500 mb-6">Create your first tasting event to get started.</p>
            <Link
              to="/business/events/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
            >
              <Plus size={20} />
              Create Event
            </Link>
          </div>
        ) : (
        <div className="divide-y divide-gray-100">
          {displayEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : event.status === "Draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mt-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Registration</p>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--wine-red)] rounded-full" 
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }} 
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {event.registered}/{event.capacity}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Revenue</p>
                      <span className="text-sm font-semibold text-gray-900">€{event.revenue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {event.status === "Draft" && (
                    <Link
                      to={`/business/events/${event.id}/wines`}
                      className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors bg-white"
                    >
                      Edit Wines
                    </Link>
                  )}
                  {event.status === "Completed" && (
                    <Link
                      to={`/business/events/${event.id}/analytics`}
                      className="px-4 py-2 bg-[var(--wine-red)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm"
                    >
                      View Analytics
                    </Link>
                  )}
                  {event.status === "Published" && (
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors bg-white">
                      Manage Attendees
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
