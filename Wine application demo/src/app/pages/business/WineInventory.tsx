import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from "lucide-react";

const globalWines = [
  {
    id: "1",
    name: "Château d'Esclans Whispering Angel",
    type: "Rosé",
    region: "Provence, France",
    stock: 24,
    price: 22.5,
  },
  {
    id: "2",
    name: "Domaines Ott By.Ott",
    type: "Rosé",
    region: "Provence, France",
    stock: 18,
    price: 25.0,
  },
  {
    id: "3",
    name: "Miraval Studio",
    type: "Rosé",
    region: "Provence, France",
    stock: 12,
    price: 19.0,
  },
  {
    id: "4",
    name: "Minuty Prestige",
    type: "Rosé",
    region: "Côtes de Provence, France",
    stock: 30,
    price: 28.5,
  },
  {
    id: "5",
    name: "Cloudy Bay Sauvignon Blanc",
    type: "White",
    region: "Marlborough, NZ",
    stock: 15,
    price: 32.0,
  },
  {
    id: "6",
    name: "Antinori Tignanello",
    type: "Red",
    region: "Tuscany, Italy",
    stock: 6,
    price: 145.0,
  },
];

export function WineInventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWines = globalWines.filter(wine => 
    wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Wine Inventory</h2>
          <p className="text-gray-600 mt-1">Manage your business's master wine collection</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--wine-red)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm">
          <Plus size={20} />
          Add New Wine
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, region or variety..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white text-gray-700 text-sm font-medium">
            <Filter size={18} />
            Category
          </button>
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
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{wine.region}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      wine.type === 'Rosé' ? 'bg-pink-100 text-pink-700' :
                      wine.type === 'White' ? 'bg-blue-100 text-blue-700' :
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
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
    </div>
  );
}
