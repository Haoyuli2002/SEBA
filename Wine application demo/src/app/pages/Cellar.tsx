import { useState } from "react";
import { Wine, Star, Trash2, Search, Plus, MapPin, Compass } from "lucide-react";
import { Link } from "react-router";
import { useUser } from "../context/UserContext";

interface TastedWine {
  id: string;
  name: string;
  type: string;
  region: string;
  vintage: string;
  rating: number;
  notes: string;
  tastedAt: string;
  tastedDate: string;
  tags: string[];
}

interface OwnedWine {
  id: string;
  name: string;
  type: string;
  region: string;
  vintage: string;
  producer: string;
  quantity: number;
  purchasedFrom?: string;
  price?: string;
  notes?: string;
}

const tastedWines: TastedWine[] = [
  {
    id: "1",
    name: "Domaines Ott By.Ott 2022",
    type: "Rosé",
    region: "Provence, France",
    vintage: "2022",
    rating: 5,
    notes: "Very refreshing, perfect for summer. Light strawberry finish.",
    tastedAt: "Summer Rosé Tasting",
    tastedDate: "June 14, 2026",
    tags: ["Strawberry", "Crisp", "Light-bodied"],
  },
  {
    id: "2",
    name: "Minuty Prestige 2022",
    type: "Rosé",
    region: "Côtes de Provence, France",
    vintage: "2022",
    rating: 4,
    notes: "Lovely peach notes with a fruity character.",
    tastedAt: "Summer Rosé Tasting",
    tastedDate: "June 14, 2026",
    tags: ["Peach", "Fruity"],
  },
  {
    id: "3",
    name: "Château Margaux 2018",
    type: "Red",
    region: "Bordeaux, France",
    vintage: "2018",
    rating: 5,
    notes: "Incredible depth and complexity. Blackberry and oak.",
    tastedAt: "Winter Red Wine Collection",
    tastedDate: "January 20, 2026",
    tags: ["Blackberry", "Oak", "Full-bodied"],
  },
  {
    id: "4",
    name: "Cloudy Bay Sauvignon Blanc 2023",
    type: "White",
    region: "Marlborough, New Zealand",
    vintage: "2023",
    rating: 4,
    notes: "Crisp and clean with citrus notes.",
    tastedAt: "Spring White Wine Evening",
    tastedDate: "March 15, 2026",
    tags: ["Citrus", "Crisp", "Dry"],
  },
  {
    id: "5",
    name: "Whispering Angel",
    type: "Rosé",
    region: "Provence, France",
    vintage: "2025",
    rating: 4,
    notes: "Elegant and refined with subtle strawberry and floral notes.",
    tastedAt: "Summer Rosé Tasting",
    tastedDate: "June 14, 2026",
    tags: ["Floral", "Strawberry", "Medium-bodied"],
  },
];

const ownedWines: OwnedWine[] = [
  {
    id: "o1",
    name: "Château Margaux 2015",
    type: "Red",
    region: "Bordeaux, France",
    vintage: "2015",
    producer: "Château Margaux",
    quantity: 2,
    purchasedFrom: "Weinkultur, Munich",
    price: "€450",
    notes: "Saving for a special occasion. Birth year vintage.",
  },
  {
    id: "o2",
    name: "Dom Pérignon 2012",
    type: "Sparkling",
    region: "Champagne, France",
    vintage: "2012",
    producer: "Moët & Chandon",
    quantity: 1,
    purchasedFrom: "Jacques' Wein-Depot",
    price: "€180",
  },
  {
    id: "o3",
    name: "Penfolds Grange 2016",
    type: "Red",
    region: "South Australia",
    vintage: "2016",
    producer: "Penfolds",
    quantity: 1,
    purchasedFrom: "Online - The Wine Society",
    price: "€520",
    notes: "Investment piece. Aging nicely.",
  },
  {
    id: "o4",
    name: "Cloudy Bay Sauvignon Blanc 2024",
    type: "White",
    region: "Marlborough, New Zealand",
    vintage: "2024",
    producer: "Cloudy Bay",
    quantity: 3,
    purchasedFrom: "Vinothek Maxvorstadt",
    price: "€28",
    notes: "Great everyday white wine.",
  },
];

export function Cellar() {
  const { user, journeyWines } = useUser();
  const isNewUser = user?.isNewUser ?? false;

  const [activeTab, setActiveTab] = useState<"journal" | "cellar">("journal");
  // Journey tab uses context data; Cellar tab uses mock for existing users
  const [ownedWinesList, setOwnedWinesList] = useState(isNewUser ? [] : ownedWines);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Use journey wines from context (dynamically updated)
  const tastedWinesList = journeyWines;

  const wineTypes = ["all", "Rosé", "Red", "White", "Sparkling"];

  const filteredTastedWines = tastedWinesList.filter((wine) => {
    const matchesType = filterType === "all" || wine.type === filterType;
    const matchesSearch =
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredOwnedWines = ownedWinesList.filter((wine) => {
    const matchesType = filterType === "all" || wine.type === filterType;
    const matchesSearch =
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDeleteTasted = (id: string) => {
    // In a real app, this would remove from the backend
    // For now, deletion from context is not implemented (read-only journey)
    alert("Wine removed from journey");
  };

  const handleDeleteOwned = (id: string) => {
    if (confirm("Remove this wine from your cellar?")) {
      setOwnedWinesList(ownedWinesList.filter((wine) => wine.id !== id));
    }
  };

  const journeyStats = {
    total: tastedWinesList.length,
    avgRating: (tastedWinesList.reduce((sum, wine) => sum + wine.rating, 0) / tastedWinesList.length).toFixed(1),
    favorite: tastedWinesList.filter((wine) => wine.rating === 5).length,
  };

  const cellarStats = {
    total: ownedWinesList.length,
    totalBottles: ownedWinesList.reduce((sum, wine) => sum + wine.quantity, 0),
    types: new Set(ownedWinesList.map((wine) => wine.type)).size,
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wine Collection</h1>
          <p className="text-gray-600">Your tasting journey and personal cellar</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <button
              onClick={() => {
                setActiveTab("journal");
                setFilterType("all");
                setSearchQuery("");
              }}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "journal"
                  ? "text-[var(--wine-red-dark)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Journal
              {activeTab === "journal" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--wine-red-dark)]"></div>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("cellar");
                setFilterType("all");
                setSearchQuery("");
              }}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "cellar"
                  ? "text-[var(--wine-red-dark)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Cellar
              {activeTab === "cellar" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--wine-red-dark)]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === "journal" ? (
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{journeyStats.total}</p>
                <p className="text-sm text-gray-600">Wines Tasted</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{journeyStats.avgRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{journeyStats.favorite}</p>
                <p className="text-sm text-gray-600">5-Star Wines</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{cellarStats.total}</p>
                <p className="text-sm text-gray-600">Unique Wines</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{cellarStats.totalBottles}</p>
                <p className="text-sm text-gray-600">Total Bottles</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-[var(--wine-red-dark)] mb-1">{cellarStats.types}</p>
                <p className="text-sm text-gray-600">Wine Types</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wines by name, region, or notes..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {wineTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type
                    ? "bg-[var(--wine-red)] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "All Types" : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wine List */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {activeTab === "journal" ? (
            // Journal Section - Tasted Wines
            filteredTastedWines.length === 0 ? (
              <div className="text-center py-20">
                <Wine size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No wines found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTastedWines.map((wine) => (
                  <div
                    key={wine.id}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{wine.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                          <span className="font-medium">{wine.type}</span>
                          <span>•</span>
                          <span>{wine.region}</span>
                          <span>•</span>
                          <span>{wine.vintage}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={20}
                              className={
                                star <= wine.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">({wine.rating}/5)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTasted(wine.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from journey"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {wine.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[var(--wine-red-100)] text-[var(--wine-red-dark)] rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 mb-3 italic">"{wine.notes}"</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Tasted at: {wine.tastedAt}</span>
                      <span>{wine.tastedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Cellar Section - Owned Wines
            <>
              <div className="flex justify-end mb-6">
                <button className="flex items-center gap-2 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-md">
                  <Plus size={20} />
                  Add Wine to Cellar
                </button>
              </div>
              {filteredOwnedWines.length === 0 ? (
                <div className="text-center py-20">
                  <Wine size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No wines found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredOwnedWines.map((wine) => (
                    <div
                      key={wine.id}
                      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{wine.name}</h3>
                          <p className="text-gray-600 mb-3">{wine.producer}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                            <span className="font-medium">{wine.type}</span>
                            <span>•</span>
                            <span>{wine.region}</span>
                            <span>•</span>
                            <span>{wine.vintage}</span>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="px-3 py-1 bg-[var(--wine-red-100)] text-[var(--wine-red-dark)] rounded-full text-sm font-semibold">
                              {wine.quantity} {wine.quantity === 1 ? "bottle" : "bottles"}
                            </span>
                            {wine.price && (
                              <span className="text-sm text-gray-600 font-medium">{wine.price}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteOwned(wine.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from cellar"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {wine.purchasedFrom && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin size={16} className="text-[var(--wine-red)]" />
                          <span>Purchased from: {wine.purchasedFrom}</span>
                        </div>
                      )}

                      {wine.notes && (
                        <p className="text-gray-700 italic">"{wine.notes}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
