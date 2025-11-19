import { useState } from "react";
import { Heart, Activity, Droplets, Thermometer, Moon, TrendingUp } from "lucide-react";

function AddVitalsModal({ isOpen, onClose, onSubmit, isUploading }) {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    bloodSugarFasting: "",
    bloodSugarPostMeal: "",
    oxygenSaturation: "",
    temperature: "",
    sleepHours: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    // Validate at least one field is filled
    const hasData = Object.values(formData).some((value) => value !== "");
    if (!hasData) {
      setError("Please enter at least one vital sign");
      return;
    }

    // Build the healthDataJson object
    const healthDataJson = {
      isVitals: true,
    };

    if (formData.heartRate) {
      healthDataJson.heartRate = parseInt(formData.heartRate);
    }

    if (formData.bloodPressureSystolic && formData.bloodPressureDiastolic) {
      healthDataJson.bloodPressure = {
        systolic: parseInt(formData.bloodPressureSystolic),
        diastolic: parseInt(formData.bloodPressureDiastolic),
      };
    }

    if (formData.bloodSugarFasting || formData.bloodSugarPostMeal) {
      healthDataJson.bloodSugar = {};
      if (formData.bloodSugarFasting) {
        healthDataJson.bloodSugar.fasting = parseInt(formData.bloodSugarFasting);
      }
      if (formData.bloodSugarPostMeal) {
        healthDataJson.bloodSugar.postMeal = parseInt(formData.bloodSugarPostMeal);
      }
    }

    if (formData.oxygenSaturation) {
      healthDataJson.oxygenSaturation = parseInt(formData.oxygenSaturation);
    }

    if (formData.temperature) {
      healthDataJson.temperature = parseFloat(formData.temperature);
    }

    if (formData.sleepHours) {
      healthDataJson.sleepHours = parseFloat(formData.sleepHours);
    }

    try {
      await onSubmit(healthDataJson);
      // Reset form
      setFormData({
        heartRate: "",
        bloodPressureSystolic: "",
        bloodPressureDiastolic: "",
        bloodSugarFasting: "",
        bloodSugarPostMeal: "",
        oxygenSaturation: "",
        temperature: "",
        sleepHours: "",
      });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to submit vitals");
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isUploading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#1B5A4F]">
            Add Vitals
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            Record Health Vitals
          </h2>
          <p className="text-sm text-gray-500">
            Enter your current health measurements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Heart Rate */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Heart className="w-4 h-4 text-red-500" />
              Heart Rate (bpm)
            </label>
            <input
              type="number"
              placeholder="e.g., 72"
              value={formData.heartRate}
              onChange={(e) => handleChange("heartRate", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Activity className="w-4 h-4 text-blue-500" />
              Blood Pressure (mmHg)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Systolic"
                value={formData.bloodPressureSystolic}
                onChange={(e) => handleChange("bloodPressureSystolic", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
              />
              <span className="text-gray-400 self-center">/</span>
              <input
                type="number"
                placeholder="Diastolic"
                value={formData.bloodPressureDiastolic}
                onChange={(e) => handleChange("bloodPressureDiastolic", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
              />
            </div>
          </div>

          {/* Blood Sugar Fasting */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Droplets className="w-4 h-4 text-purple-500" />
              Blood Sugar - Fasting (mg/dL)
            </label>
            <input
              type="number"
              placeholder="e.g., 92"
              value={formData.bloodSugarFasting}
              onChange={(e) => handleChange("bloodSugarFasting", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>

          {/* Blood Sugar Post-Meal */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Droplets className="w-4 h-4 text-purple-500" />
              Blood Sugar - Post-Meal (mg/dL)
            </label>
            <input
              type="number"
              placeholder="e.g., 118"
              value={formData.bloodSugarPostMeal}
              onChange={(e) => handleChange("bloodSugarPostMeal", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>

          {/* Oxygen Saturation */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Oxygen Saturation (%)
            </label>
            <input
              type="number"
              placeholder="e.g., 97"
              value={formData.oxygenSaturation}
              onChange={(e) => handleChange("oxygenSaturation", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Thermometer className="w-4 h-4 text-orange-500" />
              Temperature (°F)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 98.4"
              value={formData.temperature}
              onChange={(e) => handleChange("temperature", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>

          {/* Sleep Hours */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Moon className="w-4 h-4 text-indigo-500" />
              Sleep Hours
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 7.1"
              value={formData.sleepHours}
              onChange={(e) => handleChange("sleepHours", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="flex-1 py-3 rounded-lg font-semibold bg-[#1B5A4F] text-white hover:bg-[#15473F] transition disabled:opacity-50"
          >
            {isUploading ? "Submitting..." : "Submit Vitals"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVitalsModal;
