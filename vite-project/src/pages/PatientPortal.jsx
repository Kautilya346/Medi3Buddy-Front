import { Plus, Heart, FileText, Trash2, Edit2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddReportModal from "../components/AddReportModal";
import api from "../services/api";

function PatientPortal() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([
    {
      id: 1,
      cid: "bafkreigzipdevdvodzchzwtcoxfbsxi5w76hk4j3uxm3xh4vynanl3b4fe",
      date: "2024-11-15",
      type: "Vitals Snapshot",
      notes: "Synced from wearable",
      data: {
        data: {
          heartRate: 120,
          bloodPressure: { systolic: 78, diastolic: 80 },
          bloodSugar: { fasting: 92, postMeal: 118 },
          oxygenSaturation: 97,
          temperature: 98.4,
          sleepHours: 7.1,
          stepsToday: 6432,
        },
      },
    },
    {
      id: 2,
      cid: "bafkreico2ihkq2yf3nust3tzsnvjzy6kl7iwj5gqbebvqyevwhihxcz2fq",
      date: "2024-11-08",
      type: "Vitals Snapshot",
      notes: "Shared during consultation",
      data: {
        data: {
          heartRate: 105,
          bloodPressure: { systolic: 80, diastolic: 82 },
          bloodSugar: { fasting: 96, postMeal: 122 },
          oxygenSaturation: 98,
          temperature: 98.1,
          sleepHours: 6.8,
          stepsToday: 5820,
        },
      },
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "Blood Pressure",
    value: "",
    notes: "",
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportUploading, setIsReportUploading] = useState(false);

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (editingId) {
      setRecords(
        records.map((r) => (r.id === editingId ? { ...formData, id: r.id } : r))
      );
      setEditingId(null);
    } else {
      setRecords([...records, { ...formData, id: Date.now() }]);
    }
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "Blood Pressure",
      value: "",
      notes: "",
    });
    setShowForm(false);
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "Blood Pressure",
      value: "",
      notes: "",
    });
  };

  const handleReportUpload = async (file) => {
    const formData = new FormData();
    formData.append("report", file);

    setIsReportUploading(true);
    try {
      await api.post("/patient/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } finally {
      setIsReportUploading(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Patient Portal</h1>
            <p className="text-gray-600 mt-2">Manage your medical records</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-end">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-2 border border-[#93BDF7] text-[#1B5A4F] font-semibold rounded-lg hover:bg-[#F0F6FF] transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Report
            </button>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-linear-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Record
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? "Edit Record" : "Add New Medical Record"}
            </h2>
            <form onSubmit={handleAddRecord} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Record Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                  >
                    <option>Blood Pressure</option>
                    <option>Blood Sugar</option>
                    <option>Heart Rate</option>
                    <option>Weight</option>
                    <option>Temperature</option>
                    <option>Oxygen Level</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Value
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 120/80, 95 mg/dL"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-3 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition"
                >
                  {editingId ? "Update Record" : "Add Record"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Records List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Medical Records
          </h2>
          {records.length > 0 ? (
            <div className="space-y-6">
              {records.map((record) => {
                const metricsSource = record.data?.data;
                const metrics = metricsSource
                  ? [
                      metricsSource.heartRate && {
                        label: "Heart Rate",
                        value: `${metricsSource.heartRate} bpm`,
                      },
                      metricsSource.bloodPressure && {
                        label: "Blood Pressure",
                        value: `${metricsSource.bloodPressure.systolic}/${metricsSource.bloodPressure.diastolic}`,
                      },
                      metricsSource.bloodSugar?.fasting && {
                        label: "Blood Sugar (Fasting)",
                        value: `${metricsSource.bloodSugar.fasting} mg/dL`,
                      },
                      metricsSource.bloodSugar?.postMeal && {
                        label: "Blood Sugar (Post-Meal)",
                        value: `${metricsSource.bloodSugar.postMeal} mg/dL`,
                      },
                      metricsSource.oxygenSaturation && {
                        label: "O2 Saturation",
                        value: `${metricsSource.oxygenSaturation}%`,
                      },
                      metricsSource.temperature && {
                        label: "Temperature",
                        value: `${metricsSource.temperature}°F`,
                      },
                      metricsSource.sleepHours && {
                        label: "Sleep Hours",
                        value: `${metricsSource.sleepHours}h`,
                      },
                      metricsSource.stepsToday && {
                        label: "Steps Today",
                        value: metricsSource.stepsToday.toLocaleString(),
                      },
                    ].filter(Boolean)
                  : null;

                return (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-[#C7E8DA] bg-[#F2FAF5] p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-5">
                      <div>
                        {record.cid ? (
                          <>
                            <span className="text-xs font-mono tracking-wide text-[#1B5A4F]/70">
                              CID: {record.cid}
                            </span>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {record.date}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-gray-500">
                              {record.date}
                            </p>
                            <h3 className="text-lg font-bold text-gray-800">
                              {record.type}
                            </h3>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {record.cid && (
                          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B5A4F] bg-white/80 px-3 py-1 rounded-full border border-[#C7E8DA]">
                            <span className="w-2 h-2 rounded-full bg-[#1B5A4F]"></span>
                            Synced to Chain
                          </div>
                        )}
                      </div>
                    </div>

                    {metrics ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {metrics.map((item) => (
                          <div key={item.label}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#1B5A4F]/60">
                              {item.label}
                            </p>
                            <p className="text-2xl font-bold text-[#1B5A4F] mt-1">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                            VALUE
                          </p>
                          <p className="text-3xl font-bold text-[#1B5A4F]">
                            {record.value || "N/A"}
                          </p>
                        </div>
                        {record.notes && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">Notes:</span>{" "}
                            {record.notes}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-6 justify-end">
                      <button
                        onClick={() => handleEdit(record)}
                        className="px-4 py-2 text-[#1B5A4F] border border-[#C7E8DA] rounded-lg font-semibold hover:bg-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="px-4 py-2 text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No medical records yet. Add your first record to get started!
              </p>
            </div>
          )}
        </div>

        {/* Health Tips */}
        <div className="bg-linear-to-r from-white to-[#93BDF7] rounded-xl p-8 border border-[#93BDF7]">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 Health Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✓ Track your vital signs regularly for better health monitoring
            </li>
            <li>✓ Keep detailed notes about your symptoms and activities</li>
            <li>✓ Share your records with your doctor for better diagnosis</li>
            <li>✓ Monitor trends to identify patterns in your health</li>
          </ul>
        </div>
      </div>
      <AddReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportUpload}
        isUploading={isReportUploading}
      />
    </section>
  );
}

export default PatientPortal;
