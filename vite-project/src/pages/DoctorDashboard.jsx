import {
  ArrowRight,
  Stethoscope,
  FileText,
  Plus,
  Search,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doctorAPI } from "../services/api";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load patients from localStorage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    } else {
      // Redirect to login if no patients found
      navigate("/doctor-login");
    }
  }, [navigate]);

  // Fetch medical history when a patient is selected
  useEffect(() => {
    if (selectedPatient) {
      fetchMedicalHistory(selectedPatient._id);
    }
  }, [selectedPatient]);

  const fetchMedicalHistory = async (patientId) => {
    setLoading(true);
    try {
      const history = await doctorAPI.getMedicalHistory(patientId);
      setMedicalHistory(history);
    } catch (error) {
      console.error("Error fetching medical history:", error);
      setMedicalHistory(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Doctor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Access and review patient medical records
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Back to Home
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] focus:ring-1 focus:ring-[#93BDF7]/40"
          />
        </div>

        {/* Patient List & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-1 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Patients</h2>
            <div className="space-y-2">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <button
                    key={patient._id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-4 rounded-lg transition ${
                      selectedPatient?._id === patient._id
                        ? "bg-linear-to-r from-white to-[#93BDF7]/60 border-2 border-[#93BDF7]"
                        : "bg-white border border-gray-200 hover:border-[#93BDF7]"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {patient.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {patient.gender}, {patient.age} years
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Updated:{" "}
                      {new Date(patient.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No patients found
                </p>
              )}
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {selectedPatient.name}
                </h2>

                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Age", value: selectedPatient.age },
                    { label: "Gender", value: selectedPatient.gender },
                    {
                      label: "Records",
                      value: selectedPatient.medicalHistory?.length || 0,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[#D7EDE4] bg-[#F6FBF8] p-5 shadow-sm"
                    >
                      <p className="text-sm font-semibold uppercase tracking-wide text-[#1B5A4F]/60">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-[#1B5A4F] mt-1">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Medical Records */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Medical History
                  </h3>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#93BDF7] mx-auto"></div>
                      <p className="text-gray-600 mt-4">
                        Loading medical history...
                      </p>
                    </div>
                  ) : medicalHistory?.medicalHistory ? (
                    <div className="space-y-6">
                      {[...medicalHistory.medicalHistory].reverse().map((record, index) => {
                        // Check if record has data
                        const actualData = record.data?.data;
                        const hasIsVitalsAttribute =
                          actualData && "isVitals" in actualData;
                        const isVitals = actualData?.isVitals === true;
                        const contentType = record.data?.contentType;

                        // Determine if this is a media file (document/image)
                        const isMediaFile =
                          !hasIsVitalsAttribute ||
                          (contentType && contentType !== "application/json");

                        return (
                          <div
                            key={index}
                            className="rounded-2xl border border-[#C7E8DA] bg-[#F2FAF5] p-6 shadow-sm"
                          >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                              <div>
                                <span className="text-xs font-mono tracking-wide text-[#1B5A4F]/70">
                                  CID: {record.cid}
                                </span>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date().toLocaleDateString()}
                                </p>
                              </div>
                              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B5A4F] bg-white/80 px-3 py-1 rounded-full border border-[#C7E8DA]">
                                <span className="w-2 h-2 rounded-full bg-[#1B5A4F]"></span>
                                Synced to Chain
                              </div>
                            </div>

                            {isMediaFile ? (
                              // Display media file with link to view
                              <div className="space-y-3">
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                                        UPLOADED DOCUMENT
                                      </p>
                                      <p className="text-sm font-bold text-[#1B5A4F] mb-1">
                                        {contentType === "image/jpeg"
                                          ? "Medical Image"
                                          : contentType === "image/png"
                                          ? "Medical Image"
                                          : contentType === "application/pdf"
                                          ? "Medical Document (PDF)"
                                          : "Medical Document"}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Type: {contentType || "Unknown"}
                                      </p>
                                    </div>
                                    <FileText className="w-8 h-8 text-[#1B5A4F]/40" />
                                  </div>
                                  <a
                                    href={`https://indigo-payable-narwhal-178.mypinata.cloud/ipfs/${record.cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm bg-[#1B5A4F] text-white rounded-lg hover:bg-[#15473F] transition font-semibold"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    View Document
                                  </a>
                                </div>
                              </div>
                            ) : isVitals && actualData ? (
                              // Display vitals data
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[
                                  actualData.heartRate && {
                                    label: "Heart Rate",
                                    value: `${actualData.heartRate} bpm`,
                                  },
                                  actualData.bloodPressure && {
                                    label: "Blood Pressure",
                                    value: `${actualData.bloodPressure.systolic}/${actualData.bloodPressure.diastolic}`,
                                  },
                                  actualData.bloodSugar?.fasting && {
                                    label: "Blood Sugar (Fasting)",
                                    value: `${actualData.bloodSugar.fasting} mg/dL`,
                                  },
                                  actualData.bloodSugar?.postMeal && {
                                    label: "Blood Sugar (Post-Meal)",
                                    value: `${actualData.bloodSugar.postMeal} mg/dL`,
                                  },
                                  actualData.oxygenSaturation && {
                                    label: "O2 Saturation",
                                    value: `${actualData.oxygenSaturation}%`,
                                  },
                                  actualData.temperature && {
                                    label: "Temperature",
                                    value: `${actualData.temperature}°F`,
                                  },
                                  actualData.sleepHours && {
                                    label: "Sleep Hours",
                                    value: `${actualData.sleepHours}h`,
                                  },
                                  actualData.stepsToday && {
                                    label: "Steps Today",
                                    value:
                                      actualData.stepsToday.toLocaleString(),
                                  },
                                ]
                                  .filter(Boolean)
                                  .map((item) => (
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
                              // Fallback for unknown format
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <p className="text-sm text-gray-600">
                                  Unable to display this record format
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        No medical history available
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-[#1B5A4F] text-white font-semibold py-3 rounded-lg hover:bg-[#15473F] transition flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    View Full History
                  </button>
                  <button className="flex-1 bg-linear-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-3 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Select a patient to view their medical records
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDashboard;
