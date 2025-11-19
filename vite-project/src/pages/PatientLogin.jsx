import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { patientAPI } from "../services/api";

function PatientLogin() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!patientId.trim()) {
      setError("Please enter your Patient ID");
      return;
    }

    if (patientId.trim().length < 3) {
      setError("Patient ID must be at least 3 characters");
      return;
    }

    try {
      // Fetch medical history for this patient
      console.log("=== PATIENT LOGIN: Fetching medical history ===");
      console.log("Patient ID:", patientId.trim());
      
      const medicalHistory = await patientAPI.getMedicalHistory(patientId.trim());
      
      console.log("=== API RESPONSE RECEIVED ===");
      console.log("Full response:", medicalHistory);
      console.log("Patient Name:", medicalHistory.patientName);
      console.log("Number of medical history records:", medicalHistory.medicalHistory?.length);
      console.log("Medical history array:", medicalHistory.medicalHistory);
      
      // Log each medical history record
      medicalHistory.medicalHistory?.forEach((record, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log("CID:", record.cid);
        console.log("Has data:", !!record.data);
        console.log("Full record:", JSON.stringify(record, null, 2));
      });
      
      // Store patient ID and medical history in localStorage
      localStorage.setItem("patientId", patientId.trim());
      localStorage.setItem("patientData", JSON.stringify(medicalHistory));
      
      console.log("=== Data stored in localStorage ===");
      
      // Navigate to patient portal
      navigate("/patient");
    } catch (error) {
      console.error("=== ERROR FETCHING MEDICAL HISTORY ===");
      console.error("Error:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError("Failed to fetch medical history. Please check your Patient ID.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-white to-[#93BDF7]">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Medi3Buddy</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Patient Login
          </h2>
          <p className="text-gray-600">
            Enter your Patient ID to manage your medical records
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient ID Input */}
            <div>
              <label
                htmlFor="patientId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Patient ID
              </label>
              <input
                type="text"
                id="patientId"
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  setError("");
                }}
                placeholder="Enter your patient ID"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#93BDF7] transition text-gray-800"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-3 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition flex items-center justify-center gap-2"
            >
              Access Your Medical Records
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Back to Home */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-[#E9F4F1] rounded-lg border border-[#B8D8CF]">
          <p className="text-sm text-[#0F3A33]">
            <strong>Demo:</strong> Try any Patient ID (e.g., "PAT001", "PAT123")
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
