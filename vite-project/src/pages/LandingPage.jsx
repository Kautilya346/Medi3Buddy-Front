import { useNavigate } from 'react-router-dom';
import { ArrowRight, Stethoscope, Play } from "lucide-react";
import RoleSelector from "../components/RoleSelector";

function LandingPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === 'doctor') {
      navigate('/doctor-login');
    } else if (role === 'patient') {
      navigate('/patient-login');
    } else {
      navigate(`/${role}`);
    }
  };

  return (
    <div className="space-y-12">
      <RoleSelector onSelectRole={handleSelectRole} />
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Your Bridge to Better Health
              <br />
              Start Your Journey Today
            </h2>
            <p className="text-gray-600">
              Navigating health together. Your Trusted Medical Resource.
              Medicine Meets Technology Your Choice Health Hub.
            </p>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: "#B3C8FF" }}
              >
                Our working process
              </button>
              <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-[#93BDF7] hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition">
                <Play className="w-6 h-6 text-white ml-1" />
              </button>
            </div>
          </div>

          {/* Middle Column - Our Clients */}
          <div className="bg-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Our Clients
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: "#B3C8FF" }}
              ></div>
              <div className="w-12 h-12 rounded-full -ml-4 bg-gradient-to-br from-white to-[#93BDF7]/50"></div>
              <div className="w-12 h-12 bg-purple-300 rounded-full -ml-4"></div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-800">12K+</div>
              <div className="text-gray-600">happy clients</div>
            </div>
            <a
              href="#testimonials"
              className="flex items-center gap-2 transition hover:opacity-80"
              style={{ color: "#B3C8FF" }}
            >
              View testimonials
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column - Healing Success */}
          <div className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#93BDF7"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${352 * 0.84} ${352}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">84%</span>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Healing Success
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
