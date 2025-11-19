import { X, UserPlus, UserMinus, Stethoscope, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { patientAPI } from "../services/api";

function ManageDoctorAccessModal({ isOpen, onClose, patientId }) {
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctorsWithAccess, setDoctorsWithAccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("grant"); // 'grant' or 'revoke'

  const fetchData = async () => {
    setLoading(true);
    try {
      const [doctors, doctorsAccess] = await Promise.all([
        patientAPI.getAllDoctors(),
        patientAPI.getDoctorsWithAccess(patientId),
      ]);
      setAllDoctors(doctors);
      setDoctorsWithAccess(doctorsAccess);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Failed to load doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && patientId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, patientId]);

  const handleGrantAccess = async (doctorId, doctorName) => {
    if (!confirm(`Grant access to Dr. ${doctorName}?`)) return;
    
    setActionLoading(doctorId);
    try {
      await patientAPI.grantDoctorAccess(patientId, doctorId);
      await fetchData(); // Refresh the lists
      alert(`Access granted to Dr. ${doctorName} successfully!`);
    } catch (error) {
      console.error("Error granting access:", error);
      alert("Failed to grant access. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevokeAccess = async (doctorId, doctorName) => {
    if (!confirm(`Revoke access from Dr. ${doctorName}?`)) return;
    
    setActionLoading(doctorId);
    try {
      await patientAPI.revokeDoctorAccess(patientId, doctorId);
      await fetchData(); // Refresh the lists
      alert(`Access revoked from Dr. ${doctorName} successfully!`);
    } catch (error) {
      console.error("Error revoking access:", error);
      alert("Failed to revoke access. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Filter doctors who don't have access (for grant tab)
  const doctorsWithoutAccess = allDoctors.filter(
    (doctor) => !doctorsWithAccess.some((d) => d._id === doctor._id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-white to-[#93BDF7]/40 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#93BDF7]/20 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#1B5A4F]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Manage Doctor Access
                </h2>
                <p className="text-sm text-gray-600">
                  Control who can view your medical records
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("grant")}
            className={`flex-1 px-6 py-3 text-sm font-semibold transition ${
              activeTab === "grant"
                ? "text-[#1B5A4F] border-b-2 border-[#1B5A4F] bg-[#F2FAF5]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Grant Access
            </div>
          </button>
          <button
            onClick={() => setActiveTab("revoke")}
            className={`flex-1 px-6 py-3 text-sm font-semibold transition ${
              activeTab === "revoke"
                ? "text-[#1B5A4F] border-b-2 border-[#1B5A4F] bg-[#F2FAF5]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserMinus className="w-4 h-4" />
              Revoke Access
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#93BDF7] mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading doctors...</p>
            </div>
          ) : (
            <>
              {activeTab === "grant" && (
                <div className="space-y-3">
                  {doctorsWithoutAccess.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 mb-4">
                        Select doctors to grant access to your medical records:
                      </p>
                      {doctorsWithoutAccess.map((doctor) => (
                        <div
                          key={doctor._id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#93BDF7] hover:bg-[#F8FBFF] transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#93BDF7]/20 flex items-center justify-center">
                              <Stethoscope className="w-6 h-6 text-[#1B5A4F]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                Dr. {doctor.name}
                              </h3>
                              {doctor.specialty && (
                                <p className="text-sm text-gray-600">
                                  {doctor.specialty}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleGrantAccess(doctor._id, doctor.name)
                            }
                            disabled={actionLoading === doctor._id}
                            className="px-4 py-2 bg-[#1B5A4F] text-white text-sm font-semibold rounded-lg hover:bg-[#15473F] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {actionLoading === doctor._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Granting...
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4" />
                                Grant Access
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-semibold">
                        All doctors have been granted access!
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        You can revoke access from the "Revoke Access" tab
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "revoke" && (
                <div className="space-y-3">
                  {doctorsWithAccess.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 mb-4">
                        Doctors who currently have access to your medical
                        records:
                      </p>
                      {doctorsWithAccess.map((doctor) => (
                        <div
                          key={doctor._id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                Dr. {doctor.name}
                              </h3>
                              {doctor.specialty && (
                                <p className="text-sm text-gray-600">
                                  {doctor.specialty}
                                </p>
                              )}
                              <p className="text-xs text-green-600 font-medium mt-1">
                                Has access to your records
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleRevokeAccess(doctor._id, doctor.name)
                            }
                            disabled={actionLoading === doctor._id}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {actionLoading === doctor._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Revoking...
                              </>
                            ) : (
                              <>
                                <UserMinus className="w-4 h-4" />
                                Revoke Access
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <UserMinus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-semibold">
                        No doctors have access yet
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Grant access from the "Grant Access" tab
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageDoctorAccessModal;
