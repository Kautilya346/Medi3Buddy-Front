import { useState } from "react";

function PatientRegister() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      age: form.age ? Number(form.age) : undefined,
      medicalHistory: form.medicalHistory
        ? form.medicalHistory.split(",").map((item) => item.trim())
        : [],
    };
    // submit to API here when ready
    console.log("Patient register", payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Register as Patient
        </h2>
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

          <div>
            <label
              htmlFor="medicalHistory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Medical History (comma separated)
            </label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={form.medicalHistory}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#93BDF7] text-gray-800"
            />
          </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold py-2 rounded-lg hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition"
        >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientRegister;


