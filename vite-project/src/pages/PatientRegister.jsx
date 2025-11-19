import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientAPI } from "../services/api";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function PatientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      age: form.age ? Number(form.age) : undefined,
      gender: form.gender.trim(),
      medicalHistory: form.medicalHistory
        ? form.medicalHistory.split(",").map((item) => item.trim())
        : [],
    };

    try {
      const patient = await patientAPI.register(payload);
      console.log("Patient registered successfully:", patient);

      // Store patient data in localStorage
      localStorage.setItem("patientId", patient._id);
      localStorage.setItem(
        "patientData",
        JSON.stringify({
          patientId: patient._id,
          patientName: patient.name,
          age: patient.age,
          gender: patient.gender,
          medicalHistory: patient.medicalHistory || [],
        })
      );

      // Save credentials for display/copy
      setCredentials({
        id: patient._id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error registering patient:", err);
      setError(
        err.response?.data?.error || "Failed to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Register as Patient
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-sm font-semibold text-green-800">
                Registration Successful!
              </p>
            </div>
            <p className="text-xs text-green-600">
              Your account was created. Use the button below to go to the login
              page when you're ready.
            </p>

            {credentials && (
              <div className="w-full mt-2 border border-gray-200 rounded-lg p-3 bg-white">
                <p className="text-xs text-gray-600 mb-2">
                  Save this access code — you'll need it to identify your
                  account:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={credentials.id}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
                  />
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(credentials.id);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch (e) {
                        console.warn("Clipboard write failed", e);
                      }
                    }}
                    className="px-3 py-2 bg-gray-800 text-white rounded-md text-sm"
                  >
                    Copy
                  </button>
                  {copied && (
                    <span className="text-sm text-green-700 ml-2">Copied!</span>
                  )}
                </div>
              </div>
            )}

            <div className="w-full">
              <button
                onClick={() => navigate("/patient-login")}
                className="w-full mt-2 bg-[#93BDF7] text-white font-semibold py-2 rounded-lg hover:bg-[#7CB0F3] transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] text-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] text-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <input
              id="gender"
              name="gender"
              type="text"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-linear-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-2 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registering...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Registered!
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientRegister;
