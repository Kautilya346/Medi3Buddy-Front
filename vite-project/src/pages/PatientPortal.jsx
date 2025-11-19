import { Plus, Heart, FileText, Trash2, Edit2, Calendar, ExternalLink, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddReportModal from "../components/AddReportModal";
import AddVitalsModal from "../components/AddVitalsModal";
import ManageDoctorAccessModal from "../components/ManageDoctorAccessModal";
import { patientAPI as api } from "../services/api";

function PatientPortal() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);

  // Load patient data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Parsed patient data:", parsedData);
        setPatientName(parsedData.patientName || "Patient");
        
        // Transform medical history to records format
        const transformedRecords = parsedData.medicalHistory?.map((record, index) => {
          console.log("Processing record:", record);
          console.log("Record structure:", JSON.stringify(record, null, 2));
          
          // Check if record has data and if it's a document or vitals
          if (record.data) {
            // The data from Pinata is in record.data.data
            const actualData = record.data.data;
            console.log("Actual data from Pinata:", actualData);
            console.log("isVitals attribute:", actualData?.isVitals);
            
            // Check if isVitals attribute exists
            const hasIsVitalsAttribute = actualData && 'isVitals' in actualData;
            console.log(`Record ${index + 1}: hasIsVitalsAttribute = ${hasIsVitalsAttribute}`);
            
            if (!hasIsVitalsAttribute) {
              // isVitals attribute is not present, treat as uploaded document
              console.log("Treating as DOCUMENT (no isVitals attribute)");
              return {
                id: index + 1,
                cid: record.cid,
                date: new Date().toISOString().split("T")[0],
                type: "Medical Report",
                notes: "Uploaded medical report",
                fileName: actualData?.fileName || "Medical Document",
                ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record.cid}`,
              };
            }
            
            const isVitals = actualData?.isVitals === true;
            console.log(`Record ${index + 1}: isVitals = ${isVitals}`);
            
            if (isVitals) {
              // It's vitals data (when isVitals is true)
              console.log("Treating as VITALS (isVitals=true)");
              return {
                id: index + 1,
                cid: record.cid,
                date: new Date().toISOString().split("T")[0],
                type: "Vitals Snapshot",
                notes: "Synced from blockchain",
                data: record.data,
              };
            } else {
              // It's an uploaded document (when isVitals is false or not true)
              console.log("Treating as DOCUMENT (isVitals=false)");
              return {
                id: index + 1,
                cid: record.cid,
                date: new Date().toISOString().split("T")[0],
                type: "Medical Report",
                notes: "Uploaded medical report",
                fileName: actualData?.fileName || "Medical Document",
                ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record.cid}`,
              };
            }
          } else if (typeof record === 'string') {
            // If it's just a CID string (uploaded file)
            return {
              id: index + 1,
              cid: record,
              date: new Date().toISOString().split("T")[0],
              type: "Medical Report",
              notes: "Uploaded medical report",
              fileName: "Medical Document",
              ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record}`,
            };
          } else {
            return {
              id: index + 1,
              cid: record.cid || record,
              date: new Date().toISOString().split("T")[0],
              type: "Medical Record",
              notes: "Synced from blockchain",
              data: record,
            };
          }
        }) || [];
        
        console.log("Transformed records:", transformedRecords);
        setRecords(transformedRecords.reverse());
      } catch (error) {
        console.error("Error parsing patient data:", error);
      }
    } else {
      // Redirect to login if no data found
      navigate("/patient-login");
    }
    setLoading(false);
  }, [navigate]);

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
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isVitalsSubmitting, setIsVitalsSubmitting] = useState(false);
  const [isManageAccessModalOpen, setIsManageAccessModalOpen] = useState(false);

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
    setIsReportUploading(true);
    try {
      // Get patientId from localStorage
      const patientId = localStorage.getItem("patientId");
      if (!patientId) {
        alert("Patient ID not found. Please log in again.");
        navigate("/patient-login");
        return;
      }

      const response = await api.uploadReport(file, patientId);
      const cid = response.upload?.IpfsHash || response.upload?.cid;
      
      if (cid) {
        // Create a new report record with IPFS link
        const newReport = {
          id: Date.now(),
          cid: cid,
          date: new Date().toISOString().split("T")[0],
          type: "Medical Report",
          notes: `Uploaded: ${file.name}`,
          fileName: file.name,
          ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${cid}`,
        };
        
        setRecords([newReport, ...records]);
        setIsReportModalOpen(false);
        
        // Update localStorage with new patient data if returned
        if (response.patient) {
          const storedData = JSON.parse(localStorage.getItem("patientData") || "{}");
          storedData.medicalHistory = response.patient.medicalHistory;
          localStorage.setItem("patientData", JSON.stringify(storedData));
        }
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Failed to upload report. Please try again.");
    } finally {
      setIsReportUploading(false);
    }
  };

  const handleVitalsSubmit = async (healthDataJson) => {
    setIsVitalsSubmitting(true);
    try {
      // Get patientId from localStorage
      const patientId = localStorage.getItem("patientId");
      if (!patientId) {
        alert("Patient ID not found. Please log in again.");
        navigate("/patient-login");
        return;
      }

      await api.submitVitals(healthDataJson, patientId);
      
      // Refresh medical history after submitting vitals
      const medicalHistory = await api.getMedicalHistory(patientId);
      localStorage.setItem("patientData", JSON.stringify(medicalHistory));
      
      // Update records state
      const transformedRecords = medicalHistory.medicalHistory?.map((record, index) => {
        if (record.data) {
          const actualData = record.data.data;
          const hasIsVitalsAttribute = actualData && 'isVitals' in actualData;
          
          if (!hasIsVitalsAttribute) {
            return {
              id: index + 1,
              cid: record.cid,
              date: new Date().toISOString().split("T")[0],
              type: "Medical Report",
              notes: "Uploaded medical report",
              fileName: actualData?.fileName || "Medical Document",
              ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record.cid}`,
            };
          }
          
          const isVitals = actualData?.isVitals === true;
          
          if (isVitals) {
            return {
              id: index + 1,
              cid: record.cid,
              date: new Date().toISOString().split("T")[0],
              type: "Vitals Snapshot",
              notes: "Synced from blockchain",
              data: record.data,
            };
          } else {
            return {
              id: index + 1,
              cid: record.cid,
              date: new Date().toISOString().split("T")[0],
              type: "Medical Report",
              notes: "Uploaded medical report",
              fileName: actualData?.fileName || "Medical Document",
              ipfsUrl: `https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record.cid}`,
            };
          }
        }
        return record;
      }) || [];
      
      setRecords(transformedRecords.reverse());
      setIsVitalsModalOpen(false);
      alert("Vitals submitted successfully!");
    } catch (error) {
      console.error("Error submitting vitals:", error);
      alert("Failed to submit vitals. Please try again.");
    } finally {
      setIsVitalsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-5 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Patient Portal</h1>
            <p className="text-sm text-gray-600 mt-1">
              {patientName ? `Welcome, ${patientName}` : "Manage your medical records"}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => setIsVitalsModalOpen(true)}
              className="px-4 py-1.5 text-sm bg-[#93BDF7] text-white font-semibold rounded-lg hover:bg-[#7CB0F3] transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Vitals
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-1.5 text-sm border border-[#93BDF7] text-[#1B5A4F] font-semibold rounded-lg hover:bg-[#F0F6FF] transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Report
            </button>
            <button
              onClick={() => setIsManageAccessModalOpen(true)}
              className="px-4 py-1.5 text-sm bg-[#1B5A4F] text-white font-semibold rounded-lg hover:bg-[#15473F] transition flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Manage Doctors
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? "Edit Record" : "Add New Medical Record"}
            </h2>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Record Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
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
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Notes
                </label>
                <textarea
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="3"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-white to-[#93BDF7] text-[#0F1F2E] text-sm font-semibold py-2 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition"
                >
                  {editingId ? "Update Record" : "Add Record"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-800 text-sm font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Records List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Medical Records
          </h2>
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#93BDF7] mx-auto"></div>
              <p className="text-sm text-gray-600 mt-3">Loading medical records...</p>
            </div>
          ) : records.length > 0 ? (
            <div className="space-y-4">
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
                    className="rounded-xl border border-[#C7E8DA] bg-[#F2FAF5] p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        {record.cid ? (
                          <>
                            <span className="text-[10px] font-mono tracking-wide text-[#1B5A4F]/70">
                              CID: {record.cid}
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {record.date}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-gray-500">
                              {record.date}
                            </p>
                            <h3 className="text-base font-bold text-gray-800">
                              {record.type}
                            </h3>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {record.cid && (
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#1B5A4F] bg-white/80 px-2 py-0.5 rounded-full border border-[#C7E8DA]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B5A4F]"></span>
                            Synced to Chain
                          </div>
                        )}
                      </div>
                    </div>

                    {record.ipfsUrl ? (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg border border-gray-200 p-3">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1.5">
                            UPLOADED FILE
                          </p>
                          <p className="text-sm font-bold text-[#1B5A4F] mb-2">
                            {record.fileName}
                          </p>
                          <a
                            href={record.ipfsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#1B5A4F] text-white rounded-lg hover:bg-[#15473F] transition font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Document
                          </a>
                        </div>
                        {record.notes && (
                          <p className="text-gray-600 text-xs">
                            <span className="font-semibold">Notes:</span> {record.notes}
                          </p>
                        )}
                      </div>
                    ) : metrics ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {metrics.map((item) => (
                          <div key={item.label}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1B5A4F]/60">
                              {item.label}
                            </p>
                            <p className="text-lg font-bold text-[#1B5A4F] mt-0.5">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg border border-gray-200 p-3">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                            VALUE
                          </p>
                          <p className="text-2xl font-bold text-[#1B5A4F]">
                            {record.value || "N/A"}
                          </p>
                        </div>
                        {record.notes && (
                          <p className="text-gray-600 text-xs">
                            <span className="font-semibold">Notes:</span>{" "}
                            {record.notes}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4 justify-end">
                      <button
                        onClick={() => handleEdit(record)}
                        className="px-3 py-1.5 text-xs text-[#1B5A4F] border border-[#C7E8DA] rounded-lg font-semibold hover:bg-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-base">
                No medical records yet. Add your first record to get started!
              </p>
            </div>
          )}
        </div>

        {/* Health Tips */}
        <div className="bg-linear-to-r from-white to-[#93BDF7] rounded-xl p-5 border border-[#93BDF7]">
          <h3 className="text-base font-bold text-gray-800 mb-3">
            💡 Health Tips
          </h3>
          <ul className="space-y-1.5 text-sm text-gray-700">
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
      <AddVitalsModal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        onSubmit={handleVitalsSubmit}
        isUploading={isVitalsSubmitting}
      />
      <ManageDoctorAccessModal
        isOpen={isManageAccessModalOpen}
        onClose={() => setIsManageAccessModalOpen(false)}
        patientId={localStorage.getItem("patientId")}
      />
    </section>
  );
}

export default PatientPortal;
