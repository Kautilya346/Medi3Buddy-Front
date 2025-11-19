import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, ArrowRight } from "lucide-react";
import { doctorAPI } from "../services/api";

function DoctorLogin() {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!doctorId.trim()) {
      setError("Please enter your Doctor ID");
      return;
    }

    if (doctorId.trim().length < 3) {
      setError("Doctor ID must be at least 3 characters");
      return;
    }

    try {
      // Fetch patients for this doctor
      const patients = await doctorAPI.getAllPatients(doctorId.trim());
      
      // Store doctor ID and patients in localStorage
      localStorage.setItem("doctorId", doctorId.trim());
      localStorage.setItem("patients", JSON.stringify(patients));
      
      // Navigate to doctor dashboard
      navigate("/doctor");
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patient data. Please check your Doctor ID.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-white to-[#93BDF7]">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Medi3Buddy</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Doctor Login
          </h2>
          <p className="text-gray-600">
            Enter your Doctor ID to access patient records
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor ID Input */}
            <div>
              <label
                htmlFor="doctorId"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorId"
                value={doctorId}
                onChange={(e) => {
                  setDoctorId(e.target.value);
                  setError("");
                }}
                placeholder="Enter your doctor ID"
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
              Access Patient Records
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
            <strong>Demo:</strong> Try any Doctor ID (e.g., "DOC001", "DOC123")
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
