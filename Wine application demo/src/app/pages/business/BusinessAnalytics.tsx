import { BarChart3, TrendingUp, Users, Wine, Download, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { name: "Jan", attendance: 120, revenue: 1500 },
  { name: "Feb", attendance: 150, revenue: 2100 },
  { name: "Mar", attendance: 200, revenue: 3200 },
  { name: "Apr", attendance: 180, revenue: 2800 },
  { name: "May", attendance: 250, revenue: 4100 },
  { name: "Jun", attendance: 300, revenue: 5200 },
];

const wineTypeData = [
  { name: "Rosé", value: 45 },
  { name: "White", value: 30 },
  { name: "Red", value: 20 },
  { name: "Sparkling", value: 5 },
];

const COLORS = ["var(--wine-red)", "#3b82f6", "#ef4444", "#f59e0b"];

export function BusinessAnalytics() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Business Analytics</h2>
          <p className="text-gray-600 mt-1">Deep dive into your business performance and customer trends</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors bg-white shadow-sm">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[var(--wine-red-50)] rounded-lg text-[var(--wine-red)]">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Customer Retention</p>
              <p className="text-2xl font-bold text-gray-900">64%</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--wine-red)] rounded-full" style={{ width: '64%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">New Enthusiasts</p>
              <p className="text-2xl font-bold text-gray-900">+124</p>
            </div>
          </div>
          <p className="text-xs text-green-600 font-medium">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
              <Wine size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Bottles Served</p>
              <p className="text-2xl font-bold text-gray-900">432</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Across all events this year</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Revenue vs Attendance</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} id="business-performance-chart">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="var(--wine-red)" strokeWidth={3} dot={{ fill: 'var(--wine-red)', r: 4 }} />
                <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--wine-red)] rounded-full" />
              <span className="text-xs text-gray-600 font-medium">Revenue (€)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs text-gray-600 font-medium">Attendance</span>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Popular Wine Types</h3>
          <div className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="wine-type-pie-chart">
                <Pie
                  data={wineTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wineTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {wineTypeData.map((type, index) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
