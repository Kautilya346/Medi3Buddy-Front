import { Eye, FileText, Plus, Heart, Stethoscope, Lock } from "lucide-react";
import { User } from "lucide-react";
function RoleSelector({ onSelectRole }) {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-[#1B5A4F]">Medi3Buddy</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Your trusted platform for managing and accessing medical records.
            Choose your role to get started.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Doctor Card */}
          <div
            onClick={() => onSelectRole("doctor")}
            className="cursor-pointer group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#93BDF7] hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="w-16 h-16 bg-[#E3F2EE] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#C6E3DA] transition">
              <Stethoscope className="w-8 h-8 text-[#1B5A4F]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              I'm a Doctor
            </h2>

            <p className="text-gray-600 mb-6">
              Access and review patient medical records securely. Read and
              analyze patient data to provide better care.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E3F2EE] flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#1B5A4F]" />
                </div>
                <span className="text-gray-700">View patient records</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E3F2EE] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#1B5A4F]" />
                </div>
                <span className="text-gray-700">Access medical history</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E3F2EE] flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-[#1B5A4F]" />
                </div>
                <span className="text-gray-700">Analyze patient data</span>
              </div>
            </div>

            <button className="w-full bg-[#1B5A4F] text-white font-semibold py-3 rounded-lg hover:bg-[#15473F] transition flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Login as Doctor
            </button>
          </div>

          {/* Patient Card */}
          <div
            onClick={() => onSelectRole("patient")}
            className="cursor-pointer group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#93BDF7] hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-linear-to-br from-white to-[#93BDF7]/60 group-hover:to-[#93BDF7] transition">
              <User className="w-8 h-8 text-[#93BDF7]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              I'm a Patient
            </h2>

            <p className="text-gray-600 mb-6">
              Add and manage your medical records. Keep your health information
              organized in one secure place.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-white to-[#93BDF7]/50 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#93BDF7]" />
                </div>
                <span className="text-gray-700">Add new records</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-white to-[#93BDF7]/50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#93BDF7]" />
                </div>
                <span className="text-gray-700">Store medical history</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-white to-[#93BDF7]/50 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#93BDF7]" />
                </div>
                <span className="text-gray-700">Track your health</span>
              </div>
            </div>

            <button className="w-full bg-[#93BDF7] text-black font-semibold py-3 rounded-lg hover:bg-[#7CB0F3] transition flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Login as Patient
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center space-y-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Why Choose Medi3Buddy?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto bg-linear-to-br from-white to-[#93BDF7]/60">
                <Lock className="w-6 h-6 text-[#93BDF7]" />
              </div>
              <h4 className="font-semibold text-gray-800">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Your medical data is encrypted and protected
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto bg-linear-to-br from-white to-[#93BDF7]/60">
                <Heart className="w-6 h-6 text-[#93BDF7]" />
              </div>
              <h4 className="font-semibold text-gray-800">Easy to Use</h4>
              <p className="text-gray-600 text-sm">
                Simple and intuitive interface for all users
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto bg-linear-to-br from-white to-[#93BDF7]/60">
                <Stethoscope className="w-6 h-6 text-[#93BDF7]" />
              </div>
              <h4 className="font-semibold text-gray-800">Professional Care</h4>
              <p className="text-gray-600 text-sm">
                Built for healthcare professionals and patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoleSelector;
