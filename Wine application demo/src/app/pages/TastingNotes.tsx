import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const eventWines: Record<string, { id: number; name: string; producer: string; region: string; year: string }[]> = {
  "summer-rose": [
    { id: 1, name: "Côtes de Provence Rosé", producer: "Château d'Esclans", region: "Provence, France", year: "2025" },
    { id: 2, name: "Whispering Angel", producer: "Château d'Esclans", region: "Provence, France", year: "2025" },
    { id: 3, name: "Minuty Rosé", producer: "Château Minuty", region: "Provence, France", year: "2024" },
    { id: 4, name: "Miraval Rosé", producer: "Château Miraval", region: "Provence, France", year: "2025" },
  ],
  "natural-wine": [
    { id: 1, name: "Orange Wine", producer: "Weingut Brand", region: "Austria", year: "2024" },
    { id: 2, name: "Pet-Nat Rosé", producer: "Gut Oggau", region: "Burgenland, Austria", year: "2025" },
    { id: 3, name: "Skin Contact Riesling", producer: "Schmitt & Klank", region: "Rheinhessen, Germany", year: "2023" },
  ],
};

const colorOptions = [
  { value: "pale-pink", label: "Pale Pink", color: "#FFD4E5" },
  { value: "salmon", label: "Salmon", color: "#FFB3BA" },
  { value: "deep-rose", label: "Deep Rosé", color: "#FF8FA3" },
];

const aromaOptions = ["Citrus", "Strawberry", "Floral", "Peach", "Tropical", "Herbal", "Mineral"];

const palateOptions = [
  "Dry",
  "Crisp",
  "Fruity",
  "Smooth",
  "Light-bodied",
  "Medium-bodied",
  "Full-bodied",
];

interface TastingNote {
  color: string;
  aromas: string[];
  palate: string[];
  rating: number;
  notes: string;
}

export function TastingNotes() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [currentWine, setCurrentWine] = useState(0);

  const wines = useMemo(() => {
    return eventWines[eventId || ""] || eventWines["summer-rose"];
  }, [eventId]);

  const eventTitles: Record<string, string> = {
    "summer-rose": "Summer Rosé Tasting",
    "natural-wine": "Natural Wine Wednesday",
  };

  const eventTitle = eventTitles[eventId || ""] || "Wine Tasting";

  const [tastingNotes, setTastingNotes] = useState<TastingNote[]>(
    wines.map(() => ({
      color: "",
      aromas: [],
      palate: [],
      rating: 0,
      notes: "",
    }))
  );

  const currentNote = tastingNotes[currentWine];

  const updateNote = (field: keyof TastingNote, value: any) => {
    const updated = [...tastingNotes];
    updated[currentWine] = { ...updated[currentWine], [field]: value };
    setTastingNotes(updated);
  };

  const toggleTag = (field: "aromas" | "palate", tag: string) => {
    const current = currentNote[field];
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    updateNote(field, updated);
  };

  const handleNext = () => {
    if (currentWine < wines.length - 1) {
      setCurrentWine(currentWine + 1);
    } else {
      navigate(`/event/${eventId}/summary`);
    }
  };

  const handlePrevious = () => {
    if (currentWine > 0) {
      setCurrentWine(currentWine - 1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/tastings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{eventTitle}</h1>
              <p className="text-gray-600 text-sm mt-1">Rate each wine as you experience it</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-[var(--wine-red)] h-3 rounded-full transition-all"
                style={{ width: `${((currentWine + 1) / wines.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Wine {currentWine + 1} of {wines.length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{wines[currentWine].name}</h2>
              <p className="text-gray-700 text-lg">{wines[currentWine].producer}</p>
              <p className="text-gray-500">{wines[currentWine].region} • {wines[currentWine].year}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
              <div className="grid grid-cols-3 gap-4">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateNote("color", option.value)}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-md ${
                      currentNote.color === option.value
                        ? "border-[var(--wine-red)] bg-[var(--wine-red-50)] shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <p className="text-sm font-medium text-center">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nose (Aroma) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nose (Aroma)</h3>
              <div className="flex flex-wrap gap-3">
                {aromaOptions.map((aroma) => (
                  <button
                    key={aroma}
                    onClick={() => toggleTag("aromas", aroma)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      currentNote.aromas.includes(aroma)
                        ? "bg-[var(--wine-red)] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {aroma}
                  </button>
                ))}
              </div>
            </div>

            {/* Palate (Taste) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Palate (Taste)</h3>
              <div className="flex flex-wrap gap-3">
                {palateOptions.map((taste) => (
                  <button
                    key={taste}
                    onClick={() => toggleTag("palate", taste)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      currentNote.palate.includes(taste)
                        ? "bg-[var(--wine-red)] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {taste}
                  </button>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating</h3>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateNote("rating", star)}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star
                      size={40}
                      className={
                        star <= currentNote.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-gray-400"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Notes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Notes</h3>
              <textarea
                value={currentNote.notes}
                onChange={(e) => updateNote("notes", e.target.value)}
                placeholder="Add your personal thoughts about this wine..."
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 focus:border-transparent"
                rows={5}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentWine === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentWine === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ArrowLeft size={20} />
                Previous Wine
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--wine-red)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-md hover:shadow-lg"
              >
                {currentWine === wines.length - 1 ? "Finish Tasting Session" : "Save & Continue to Next Wine"}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
