import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Users, Star, FileText, Heart, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ratingData = [
  { name: "Domaines Ott By.Ott", rating: 4.6 },
  { name: "Minuty Prestige", rating: 4.3 },
  { name: "Whispering Angel", rating: 4.1 },
  { name: "Miraval Studio", rating: 3.4 },
];

const flavorTags = [
  { tag: "Strawberry", count: 45, size: "text-3xl" },
  { tag: "Citrus", count: 38, size: "text-2xl" },
  { tag: "Dry", count: 35, size: "text-2xl" },
  { tag: "Crisp", count: 32, size: "text-xl" },
  { tag: "Floral", count: 22, size: "text-lg" },
  { tag: "Peach", count: 20, size: "text-lg" },
  { tag: "Fruity", count: 18, size: "text-base" },
  { tag: "Smooth", count: 15, size: "text-base" },
];

const wineRanking = [
  {
    rank: 1,
    name: "Domaines Ott By.Ott",
    rating: 4.6,
    favorites: 8,
    tags: "Strawberry, Crisp",
  },
  {
    rank: 2,
    name: "Minuty Prestige",
    rating: 4.3,
    favorites: 6,
    tags: "Peach, Fruity",
  },
  {
    rank: 3,
    name: "Château d'Esclans Whispering Angel",
    rating: 4.1,
    favorites: 5,
    tags: "Citrus, Light",
  },
  {
    rank: 4,
    name: "Miraval Studio",
    rating: 3.4,
    favorites: 2,
    tags: "Floral, Smooth",
  },
];

export function Analytics() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/business")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Event Analytics — Summer Rosé Tasting
                  </h1>
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600">Performance insights and feedback</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Participants</p>
              <Users size={20} className="text-[var(--wine-red)]" />
            </div>
            <p className="text-3xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-500 mt-1">out of 20 capacity</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Avg Rating</p>
              <Star size={20} className="text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4.2/5</p>
            <p className="text-sm text-green-600 mt-1">Excellent feedback</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Notes Recorded</p>
              <FileText size={20} className="text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">72</p>
            <p className="text-sm text-gray-500 mt-1">4 per participant</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Favorites</p>
              <Heart size={20} className="text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-500 mt-1">Wines saved to cellar</p>
          </div>
        </div>

        {/* Insights Banner */}
        <div className="bg-gradient-to-r from-[var(--wine-red)] to-pink-600 text-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Insight</h3>
              <p className="text-[var(--wine-red-100)]">
                Guests predominantly preferred <strong>dry, fruity, and light-bodied</strong> wines.
                Consider featuring similar profiles in your next event for higher satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Average Rating by Wine */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Average Rating by Wine
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData} layout="vertical" id="event-rating-chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="rating" fill="var(--wine-red)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Mentioned Flavors */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Most Mentioned Flavors
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {flavorTags.map((item) => (
                <span
                  key={item.tag}
                  className={`${item.size} font-semibold text-[var(--wine-red)] hover:text-[var(--wine-red-dark)] transition-colors cursor-default`}
                  style={{ opacity: 0.5 + (item.count / 50) * 0.5 }}
                >
                  {item.tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wine Ranking Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Wine Performance Ranking</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Wine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Avg Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Times Favorited
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Top Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wineRanking.map((wine) => (
                  <tr key={wine.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          wine.rank === 1
                            ? "bg-yellow-500"
                            : wine.rank === 2
                            ? "bg-gray-400"
                            : wine.rank === 3
                            ? "bg-orange-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {wine.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {wine.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {wine.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Heart size={16} className="text-red-500" />
                        <span className="text-sm text-gray-900">{wine.favorites}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{wine.tags}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Apply Insights Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors">
            Apply Insights to Next Event →
          </button>
        </div>
      </div>
    </div>
  );
}
