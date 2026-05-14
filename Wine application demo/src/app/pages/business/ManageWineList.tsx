import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Plus, Edit2, Trash2, X } from "lucide-react";

interface Wine {
  id: string;
  name: string;
  type: string;
  region: string;
  vintage: string;
  grapeVariety: string;
  order: number;
}

const initialWines: Wine[] = [
  {
    id: "1",
    name: "Château d'Esclans Whispering Angel 2023",
    type: "Rosé",
    region: "Provence",
    vintage: "2023",
    grapeVariety: "Grenache, Cinsault",
    order: 1,
  },
  {
    id: "2",
    name: "Domaines Ott By.Ott 2022",
    type: "Rosé",
    region: "Provence",
    vintage: "2022",
    grapeVariety: "Grenache, Syrah",
    order: 2,
  },
  {
    id: "3",
    name: "Miraval Studio 2023",
    type: "Rosé",
    region: "Provence",
    vintage: "2023",
    grapeVariety: "Grenache, Cinsault, Syrah",
    order: 3,
  },
  {
    id: "4",
    name: "Minuty Prestige 2022",
    type: "Rosé",
    region: "Côtes de Provence",
    vintage: "2022",
    grapeVariety: "Grenache, Tibouren",
    order: 4,
  },
];

export function ManageWineList() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [wines, setWines] = useState<Wine[]>(initialWines);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Rosé",
    region: "",
    vintage: "",
    grapeVariety: "",
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this wine?")) {
      setWines(wines.filter((wine) => wine.id !== id));
    }
  };

  const handleEdit = (wine: Wine) => {
    setEditingWine(wine);
    setFormData({
      name: wine.name,
      type: wine.type,
      region: wine.region,
      vintage: wine.vintage,
      grapeVariety: wine.grapeVariety,
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWine) {
      setWines(
        wines.map((wine) =>
          wine.id === editingWine.id ? { ...wine, ...formData } : wine
        )
      );
    } else {
      const newWine: Wine = {
        id: Date.now().toString(),
        ...formData,
        order: wines.length + 1,
      };
      setWines([...wines, newWine]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Rosé",
      region: "",
      vintage: "",
      grapeVariety: "",
    });
    setEditingWine(null);
    setShowAddModal(false);
  };

  const handlePublish = () => {
    alert("Event published successfully!");
    navigate("/business");
  };

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
                    Summer Rosé Tasting — Wine List
                  </h1>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Draft
                  </span>
                </div>
                <p className="text-sm text-gray-600">Manage wines for this event</p>
              </div>
            </div>
            <button
              onClick={handlePublish}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Publish Event
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Wines ({wines.length})
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--wine-red)] text-white rounded-lg font-medium hover:bg-[var(--wine-red-dark)] transition-colors"
            >
              <Plus size={20} />
              Add Wine
            </button>
          </div>

          {/* Wine List Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Wine Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Vintage
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wines.map((wine) => (
                  <tr key={wine.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {wine.order}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{wine.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {wine.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {wine.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {wine.vintage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(wine)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(wine.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Wine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingWine ? "Edit Wine" : "Add Wine"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Wine Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Château d'Esclans Whispering Angel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                    >
                      <option value="Rosé">Rosé</option>
                      <option value="Red">Red</option>
                      <option value="White">White</option>
                      <option value="Sparkling">Sparkling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Vintage
                    </label>
                    <input
                      type="text"
                      value={formData.vintage}
                      onChange={(e) =>
                        setFormData({ ...formData, vintage: e.target.value })
                      }
                      placeholder="2023"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    placeholder="e.g., Provence"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Grape Variety
                  </label>
                  <input
                    type="text"
                    value={formData.grapeVariety}
                    onChange={(e) =>
                      setFormData({ ...formData, grapeVariety: e.target.value })
                    }
                    placeholder="e.g., Grenache, Cinsault"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
                >
                  {editingWine ? "Update Wine" : "Add Wine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
