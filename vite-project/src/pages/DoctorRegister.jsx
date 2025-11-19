import { useState } from "react";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    specialty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit to API here when ready
    console.log("Doctor register", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Register as Doctor
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
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Specialty
            </label>
            <input
              id="specialty"
              name="specialty"
              type="text"
              value={form.specialty}
              onChange={handleChange}
              required
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

export default DoctorRegister;


