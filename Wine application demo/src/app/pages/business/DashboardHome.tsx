import { Calendar, BarChart3, Users, TrendingUp, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1800 },
  { name: "Mar", revenue: 2340 },
  { name: "Apr", revenue: 2100 },
  { name: "May", revenue: 2800 },
  { name: "Jun", revenue: 3200 },
];

const attendanceData = [
  { name: "Mon", count: 12 },
  { name: "Tue", count: 15 },
  { name: "Wed", count: 8 },
  { name: "Thu", count: 20 },
  { name: "Fri", count: 25 },
  { name: "Sat", count: 30 },
  { name: "Sun", count: 18 },
];

const recentActivity = [
  {
    id: 1,
    type: "registration",
    user: "Sarah Miller",
    event: "Summer Rosé Tasting",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "note",
    user: "Michael Ross",
    event: "Spring White Wine Evening",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "favorite",
    user: "Elena G.",
    event: "Summer Rosé Tasting",
    time: "Yesterday",
  },
];

export function DashboardHome() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, Weinkultur. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--wine-red-50)] rounded-lg">
              <BarChart3 className="text-[var(--wine-red)]" size={20} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              +12.5% <ArrowUpRight size={14} />
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">€4,320</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              +8.2% <ArrowUpRight size={14} />
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Attendees</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,248</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calendar className="text-green-600" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Target: 15</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Events Hosted</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <TrendingUp className="text-orange-600" size={20} />
            </div>
            <span className="text-green-600 text-sm font-medium">4.8/5.0</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Avg. Feedback</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">High</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Revenue Growth</h3>
            <select className="text-sm border-gray-200 rounded-md bg-gray-50 p-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} id="revenue-growth-chart">
                <defs>
                  <linearGradient id="colorRevenueDashboard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--wine-red)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--wine-red)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--wine-red)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenueDashboard)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === 'registration' ? 'bg-blue-500' : 
                  activity.type === 'note' ? 'bg-[var(--wine-red)]' : 'bg-orange-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.user}</span> 
                    {activity.type === 'registration' ? ' registered for ' : 
                     activity.type === 'note' ? ' added a note to ' : ' favorited '}
                    <span className="font-medium text-[var(--wine-red)]">{activity.event}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-medium text-[var(--wine-red)] hover:text-[var(--wine-red-dark)] transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Upcoming Event Preview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Next Scheduled Event</h3>
          <button className="text-sm text-[var(--wine-red)] font-medium">Manage Event</button>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-48 h-32 bg-[var(--wine-red-100)] rounded-lg flex items-center justify-center">
            <Calendar className="text-[var(--wine-red)]" size={40} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900">Summer Rosé Tasting</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} className="text-gray-400" />
                <span>June 14, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span>18:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>Weinkultur, Schwabing</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--wine-red)] rounded-full" style={{ width: '60%' }} />
              </div>
              <span className="text-sm font-medium text-gray-700">12 / 20 registered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
