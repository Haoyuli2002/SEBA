import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, Heart, Check, TrendingUp } from "lucide-react";
import { useUser } from "../context/UserContext";

const wineResults = [
  {
    number: 1,
    name: "Château d'Esclans Whispering Angel 2023",
    rating: 4,
    tags: ["Citrus", "Dry", "Light"],
    isFavorite: false,
  },
  {
    number: 2,
    name: "Domaines Ott By.Ott 2022",
    rating: 5,
    tags: ["Strawberry", "Crisp"],
    isFavorite: true,
  },
  {
    number: 3,
    name: "Miraval Studio 2023",
    rating: 3,
    tags: ["Floral", "Smooth"],
    isFavorite: false,
  },
  {
    number: 4,
    name: "Minuty Prestige 2022",
    rating: 4,
    tags: ["Peach", "Fruity"],
    isFavorite: false,
  },
];

const preferences = ["Dry", "Fruity", "Light-bodied"];

export function EventSummary() {
  const navigate = useNavigate();
  const [showSaveBanner, setShowSaveBanner] = useState(true);
  const [savedToCellar, setSavedToCellar] = useState(false);

  const { addToJourney } = useUser();

  const handleSaveFavorites = () => {
    // Add all tasted wines to the journey
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    addToJourney(
      wineResults.map((wine) => ({
        id: `tasting-${Date.now()}-${wine.number}`,
        name: wine.name,
        type: "Rosé",
        region: "Provence, France",
        vintage: wine.name.match(/\d{4}/)?.[0] || "2023",
        rating: wine.rating,
        notes: `Tasted at Summer Rosé Tasting. Rating: ${wine.rating}/5.`,
        tastedAt: "Summer Rosé Tasting",
        tastedDate: today,
        tags: wine.tags,
      }))
    );
    setSavedToCellar(true);
    setTimeout(() => {
      setShowSaveBanner(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wine-red-50)] to-white pb-20">
      {/* Header */}
      <div className="bg-[var(--wine-red)] text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Your Tasting Summary</h1>
        <p className="text-[var(--wine-red-100)]">Summer Rosé Tasting at Weinkultur</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Taste Insights Card */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6 border-l-4 border-[var(--wine-red)]">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-[var(--wine-red-100)] rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-[var(--wine-red)]" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">Your Taste Profile</h2>
              <p className="text-sm text-gray-600">Based on your tastings, you prefer:</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.map((pref) => (
              <span
                key={pref}
                className="px-3 py-1 bg-[var(--wine-red-100)] text-[var(--wine-red-dark)] rounded-full text-sm font-medium"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Wine Results */}
        <h2 className="font-semibold text-gray-900 mb-4">Wines Revealed</h2>
        <div className="space-y-4">
          {wineResults.map((wine) => (
            <div
              key={wine.number}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[var(--wine-red)]">
                      Wine #{wine.number}
                    </span>
                    {wine.isFavorite && (
                      <Heart size={16} className="fill-red-500 text-red-500" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{wine.name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Your rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= wine.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {wine.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save to Cellar Banner */}
      {showSaveBanner && (
        <div className="fixed bottom-20 left-0 right-0 mx-4">
          <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-[var(--wine-red)]">
            {!savedToCellar ? (
              <>
                <p className="font-semibold text-gray-900 mb-3">
                  Save wines to your Cellar?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveFavorites}
                    className="flex-1 bg-[var(--wine-red)] text-white py-2 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
                  >
                    Add Favorites
                  </button>
                  <button
                    onClick={() => setShowSaveBanner(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Saved to your Cellar!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/explore")}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Events
          </button>
          <button
            onClick={() => alert("Share functionality coming soon!")}
            className="flex-1 bg-[var(--wine-red)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
          >
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}