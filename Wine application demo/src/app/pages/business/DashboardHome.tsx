import { useState } from "react";
import { Calendar, Users, Star, MessageSquare, Euro, ChevronRight, Wine } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router";
import { useUser } from "../../context/UserContext";

interface EventResult {
  id: string;
  name: string;
  date: string;
  attendees: number;
  capacity: number;
  revenue: number;
  avgRating: number;
  status: "Completed" | "Published" | "Draft";
  wineRatings: { name: string; rating: number }[];
  feedback: { id: number; user: string; text: string; rating: number; time: string }[];
}

const eventResults: EventResult[] = [
  {
    id: "summer-rose",
    name: "Summer Rosé Tasting",
    date: "June 14, 2026",
    attendees: 18,
    capacity: 20,
    revenue: 270,
    avgRating: 4.2,
    status: "Completed",
    wineRatings: [
      { name: "Whispering Angel", rating: 4.1 },
      { name: "Domaines Ott", rating: 4.6 },
      { name: "Miraval Studio", rating: 3.4 },
      { name: "Minuty Prestige", rating: 4.3 },
    ],
    feedback: [
      { id: 1, user: "Alex C.", text: "Very refreshing wines! The Domaines Ott was my absolute favorite. Perfect for summer.", rating: 5, time: "2 days ago" },
      { id: 2, user: "Sarah M.", text: "Great selection and atmosphere. Would love to see more Provence rosés next time.", rating: 4, time: "3 days ago" },
      { id: 3, user: "Michael R.", text: "The Miraval was a bit disappointing, but overall a wonderful experience.", rating: 4, time: "4 days ago" },
    ],
  },
  {
    id: "spring-whites",
    name: "Spring White Wine Evening",
    date: "March 15, 2026",
    attendees: 20,
    capacity: 20,
    revenue: 300,
    avgRating: 4.5,
    status: "Completed",
    wineRatings: [
      { name: "Cloudy Bay SB", rating: 4.7 },
      { name: "Chablis Premier Cru", rating: 4.5 },
      { name: "Grüner Veltliner", rating: 4.2 },
      { name: "Riesling Trocken", rating: 4.4 },
    ],
    feedback: [
      { id: 1, user: "Elena G.", text: "The Cloudy Bay was exceptional! Such crisp citrus notes.", rating: 5, time: "2 months ago" },
      { id: 2, user: "Tom K.", text: "Loved the variety. The Grüner Veltliner was a nice surprise.", rating: 4, time: "2 months ago" },
    ],
  },
  {
    id: "winter-reds",
    name: "Winter Red Wine Collection",
    date: "January 20, 2026",
    attendees: 15,
    capacity: 20,
    revenue: 300,
    avgRating: 4.0,
    status: "Completed",
    wineRatings: [
      { name: "Château Margaux", rating: 4.8 },
      { name: "Barolo Riserva", rating: 4.2 },
      { name: "Rioja Reserva", rating: 3.8 },
      { name: "Côtes du Rhône", rating: 3.5 },
      { name: "Chianti Classico", rating: 3.9 },
    ],
    feedback: [
      { id: 1, user: "James W.", text: "The Château Margaux was sublime. Worth every penny.", rating: 5, time: "5 months ago" },
      { id: 2, user: "Lisa P.", text: "Good selection but the Côtes du Rhône was underwhelming for the price.", rating: 3, time: "5 months ago" },
      { id: 3, user: "David S.", text: "Great evening! Learned a lot about Italian reds.", rating: 4, time: "5 months ago" },
    ],
  },
];

export function DashboardHome() {
  const { user } = useUser();
  const [selectedEventId, setSelectedEventId] = useState(eventResults[0].id);
  const selectedEvent = eventResults.find((e) => e.id === selectedEventId) || eventResults[0];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome back{user?.businessName ? `, ${user.businessName}` : ""}. Select an event to view its performance.
        </p>
      </div>

      {/* Event Selector - Dropdown */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Event</label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)] focus:border-transparent"
        >
          {eventResults.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} — {event.date} ({event.attendees} attendees, ⭐ {event.avgRating})
            </option>
          ))}
        </select>
      </div>

      {/* Selected Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Euro size={18} className="text-green-600" />
            <p className="text-sm text-gray-500">Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">€{selectedEvent.revenue}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Users size={18} className="text-blue-600" />
            <p className="text-sm text-gray-500">Attendees</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{selectedEvent.attendees}/{selectedEvent.capacity}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Star size={18} className="text-yellow-500" />
            <p className="text-sm text-gray-500">Avg Rating</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{selectedEvent.avgRating}/5</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare size={18} className="text-[var(--wine-red)]" />
            <p className="text-sm text-gray-500">Feedback</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{selectedEvent.feedback.length} reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Wine Satisfaction - Star Ratings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Wine Satisfaction Ratings</h3>
          <div className="space-y-4">
            {[...selectedEvent.wineRatings].sort((a, b) => b.rating - a.rating).map((wine) => (
              <div key={wine.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{wine.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={star <= Math.round(wine.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 ml-2">{wine.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Feedback */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">User Feedback</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {selectedEvent.feedback.map((fb) => (
              <div key={fb.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[var(--wine-red)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{fb.user[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{fb.user}</p>
                      <p className="text-xs text-gray-500">{fb.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className={star <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic ml-9">"{fb.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Link to full analytics */}
      <Link
        to={`/business/events/${selectedEvent.id}/analytics`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
      >
        View Full Event Analytics
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}