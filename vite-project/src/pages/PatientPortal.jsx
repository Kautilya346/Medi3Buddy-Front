import { Plus, Heart, FileText, Trash2, Edit2, Calendar } from "lucide-react";
import { useState } from "react";

function PatientPortal({ onBackHome }) {
  const [records, setRecords] = useState([
    {
      id: 1,
      date: "2024-11-15",
      type: "Blood Pressure",
      value: "120/80",
      notes: "Normal reading",
    },
    {
      id: 2,
      date: "2024-11-10",
      type: "Blood Sugar",
      value: "95 mg/dL",
      notes: "Fasting measurement",
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

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (editingId) {
      setRecords(
        records.map((r) =>
          r.id === editingId ? { ...formData, id: r.id } : r
        )
      );
      setEditingId(null);
    } else {
      setRecords([
        ...records,
        { ...formData, id: Date.now() },
      ]);
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

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Patient Portal</h1>
            <p className="text-gray-600 mt-2">Manage your medical records</p>
          </div>
          <div className="flex gap-3">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Record
              </button>
            )}
            <button
              onClick={onBackHome}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Medical Records</h2>
          {records.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {record.type}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {record.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-3xl font-bold text-green-600">
                      {record.value}
                    </div>
                  </div>

                  {record.notes && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Notes:</span> {record.notes}
                    </p>
                  )}
                </div>
              ))}
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
        <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 Health Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Track your vital signs regularly for better health monitoring</li>
            <li>✓ Keep detailed notes about your symptoms and activities</li>
            <li>✓ Share your records with your doctor for better diagnosis</li>
            <li>✓ Monitor trends to identify patterns in your health</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PatientPortal;
