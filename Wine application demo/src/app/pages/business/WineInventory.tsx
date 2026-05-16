import { useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2, X, Wine } from "lucide-react";
import { useUser } from "../../context/UserContext";

interface InventoryWine {
  id: string;
  name: string;
  type: string;
  region: string;
  stock: number;
  price: number;
  grapeVariety: string;
}

const initialWines: InventoryWine[] = [
  { id: "1", name: "Château d'Esclans Whispering Angel", type: "Rosé", region: "Provence, France", stock: 24, price: 22.5, grapeVariety: "Grenache, Cinsault" },
  { id: "2", name: "Domaines Ott By.Ott", type: "Rosé", region: "Provence, France", stock: 18, price: 25.0, grapeVariety: "Grenache, Syrah" },
  { id: "3", name: "Miraval Studio", type: "Rosé", region: "Provence, France", stock: 12, price: 19.0, grapeVariety: "Grenache, Cinsault, Syrah" },
  { id: "4", name: "Minuty Prestige", type: "Rosé", region: "Côtes de Provence, France", stock: 30, price: 28.5, grapeVariety: "Grenache, Tibouren" },
  { id: "5", name: "Cloudy Bay Sauvignon Blanc", type: "White", region: "Marlborough, NZ", stock: 15, price: 32.0, grapeVariety: "Sauvignon Blanc" },
  { id: "6", name: "Antinori Tignanello", type: "Red", region: "Tuscany, Italy", stock: 6, price: 145.0, grapeVariety: "Sangiovese, Cabernet Sauvignon" },
];

export function WineInventory() {
  const { user } = useUser();
  const isNewUser = user?.isNewUser ?? false;
  const [wines, setWines] = useState<InventoryWine[]>(initialWines);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingWine, setEditingWine] = useState<InventoryWine | null>(null);
  const [formData, setFormData] = useState({ name: "", type: "Rosé", region: "", stock: "", price: "", grapeVariety: "" });

  const filteredWines = wines.filter(wine =>
    wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingWine(null);
    setFormData({ name: "", type: "Rosé", region: "", stock: "", price: "", grapeVariety: "" });
    setShowModal(true);
  };

  const handleEdit = (wine: InventoryWine) => {
    setEditingWine(wine);
    setFormData({
      name: wine.name,
      type: wine.type,
      region: wine.region,
      stock: wine.stock.toString(),
      price: wine.price.toString(),
      grapeVariety: wine.grapeVariety,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this wine from inventory?")) {
      setWines(wines.filter((w) => w.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWine) {
      setWines(wines.map((w) => w.id === editingWine.id ? { ...w, name: formData.name, type: formData.type, region: formData.region, stock: parseInt(formData.stock) || 0, price: parseFloat(formData.price) || 0, grapeVariety: formData.grapeVariety } : w));
    } else {
      const newWine: InventoryWine = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        region: formData.region,
        stock: parseInt(formData.stock) || 0,
        price: parseFloat(formData.price) || 0,
        grapeVariety: formData.grapeVariety,
      };
      setWines([...wines, newWine]);
    }
    setShowModal(false);
    setEditingWine(null);
  };

  if (wines.length === 0 && isNewUser) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Wine Inventory</h2>
            <p className="text-gray-600 mt-1">Manage your business's master wine collection</p>
          </div>
          <button onClick={handleAdd} className="flex items-center gap-2 bg-[var(--wine-red)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm">
            <Plus size={20} />
            Add New Wine
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
          <Wine size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No wines in inventory</h3>
          <p className="text-gray-500">Add wines to your inventory to use them in your tasting events.</p>
        </div>

        {/* Modal */}
        {showModal && renderModal()}
      </div>
    );
  }

  function renderModal() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingWine ? "Edit Wine" : "Add New Wine"}</h2>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={24} className="text-gray-500" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wine Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Château Margaux 2018" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]">
                  <option value="Rosé">Rosé</option>
                  <option value="Red">Red</option>
                  <option value="White">White</option>
                  <option value="Sparkling">Sparkling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <input type="text" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} placeholder="e.g. Bordeaux, France" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grape Variety</label>
              <input type="text" value={formData.grapeVariety} onChange={(e) => setFormData({ ...formData, grapeVariety: e.target.value })} placeholder="e.g. Cabernet Sauvignon, Merlot" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock (bottles)</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="24" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="22.50" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)]">{editingWine ? "Update Wine" : "Add Wine"}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Wine Inventory</h2>
          <p className="text-gray-600 mt-1">Manage your business's master wine collection</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-[var(--wine-red)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm">
          <Plus size={20} />
          Add New Wine
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, region..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)] bg-white" />
        </div>
      </div>

      {/* Wine Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Wine</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWines.map((wine) => (
                <tr key={wine.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{wine.name}</div>
                    <div className="text-xs text-gray-500">{wine.grapeVariety}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{wine.region}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      wine.type === 'Rosé' ? 'bg-pink-100 text-pink-700' :
                      wine.type === 'White' ? 'bg-blue-100 text-blue-700' :
                      wine.type === 'Sparkling' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {wine.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-medium ${wine.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {wine.stock} bottles
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">€{wine.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(wine)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(wine.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && renderModal()}
    </div>
  );
}
