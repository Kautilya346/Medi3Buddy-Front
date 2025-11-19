import { ArrowRight, Stethoscope, FileText, Plus, Search } from "lucide-react";
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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-2">Access and review patient medical records</p>
          </div>
          <button
            onClick={() => navigate('/')}
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
                        ? "bg-gradient-to-r from-white to-[#93BDF7]/60 border-2 border-[#93BDF7]"
                        : "bg-white border border-gray-200 hover:border-[#93BDF7]"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{patient.name}</div>
                    <div className="text-sm text-gray-600">{patient.gender}, {patient.age} years</div>
                    <div className="text-xs text-gray-500 mt-1">Updated: {new Date(patient.updatedAt).toLocaleDateString()}</div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No patients found</p>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Age</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedPatient.age}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Gender</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedPatient.gender}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Records</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedPatient.medicalHistory?.length || 0}
                    </div>
                  </div>
                </div>

                {/* Medical Records */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Medical History
                  </h3>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#93BDF7] mx-auto"></div>
                      <p className="text-gray-600 mt-4">Loading medical history...</p>
                    </div>
                  ) : medicalHistory?.medicalHistory ? (
                    <div className="space-y-4">
                      {medicalHistory.medicalHistory.map((record, index) => (
                        <div
                          key={index}
                          className="bg-[#E9F4F1] border border-[#B8D8CF] rounded-lg p-4"
                        >
                          <div className="mb-2">
                            <span className="text-xs font-mono text-gray-500">CID: {record.cid}</span>
                          </div>
                          {record.data?.data && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              <div>
                                <div className="text-sm text-gray-600">Heart Rate</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.heartRate} bpm
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Blood Pressure</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.bloodPressure.systolic}/{record.data.data.bloodPressure.diastolic}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Blood Sugar (Fasting)</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.bloodSugar.fasting} mg/dL
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">O2 Saturation</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.oxygenSaturation}%
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Temperature</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.temperature}°F
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Sleep Hours</div>
                                <div className="text-lg font-bold text-[#1B5A4F]">
                                  {record.data.data.sleepHours}h
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No medical history available</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    className="flex-1 bg-[#1B5A4F] text-white font-semibold py-3 rounded-lg hover:bg-[#15473F] transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Full History
                  </button>
                  <button
                    className="flex-1 bg-gradient-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-3 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition flex items-center justify-center gap-2"
                  >
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
