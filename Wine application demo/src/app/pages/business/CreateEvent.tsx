import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, Calendar as CalendarIcon } from "lucide-react";

export function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "Weinkultur, Schwabing, Munich",
    description: "",
    eventType: "registration",
    maxParticipants: "",
    ticketPrice: "",
  });

  const handleSubmit = (e: React.FormEvent, action: "draft" | "next") => {
    e.preventDefault();
    if (action === "draft") {
      alert("Event saved as draft!");
      navigate("/business");
    } else {
      navigate("/business/events/new-event/wines");
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/business")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-sm text-gray-600">Fill in the details for your tasting event</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <form className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          {/* Event Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g., Summer Rosé Tasting"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                />
                <CalendarIcon
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => updateField("time", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Join us for an evening exploring premium Rosé wines from Provence..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
            />
          </div>

          {/* Event Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Event Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="eventType"
                  value="open"
                  checked={formData.eventType === "open"}
                  onChange={(e) => updateField("eventType", e.target.value)}
                  className="w-4 h-4 text-[var(--wine-red)] focus:ring-[var(--wine-red-50)]0"
                />
                <span className="text-gray-700">Open to all</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="eventType"
                  value="registration"
                  checked={formData.eventType === "registration"}
                  onChange={(e) => updateField("eventType", e.target.value)}
                  className="w-4 h-4 text-[var(--wine-red)] focus:ring-[var(--wine-red-50)]0"
                />
                <span className="text-gray-700">Registration required</span>
              </label>
            </div>
          </div>

          {/* Max Participants & Ticket Price */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => updateField("maxParticipants", e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Ticket Price (€)
              </label>
              <input
                type="number"
                value={formData.ticketPrice}
                onChange={(e) => updateField("ticketPrice", e.target.value)}
                placeholder="15"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--wine-red-50)]0 transition-colors cursor-pointer">
              <Upload size={40} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "next")}
              className="flex-1 px-6 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
            >
              Next: Add Wines →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
