import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  Lock,
  Phone,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Brain,
  Stethoscope,
} from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">Medi3Buddy</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-green-600 transition"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-green-600 transition"
          >
            About
          </a>
          <a
            href="#doctors"
            className="text-gray-700 hover:text-green-600 transition"
          >
            Doctors
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-green-600 transition"
          >
            Contact
          </a>
        </nav>

        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
          <Lock className="w-4 h-4" />
          Log in
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center gap-8">
          <a
            href="#home"
            className="text-2xl text-gray-700 hover:text-green-600"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-2xl text-gray-700 hover:text-green-600"
          >
            About
          </a>
          <a
            href="#doctors"
            className="text-2xl text-gray-700 hover:text-green-600"
          >
            Doctors
          </a>
          <a
            href="#contact"
            className="text-2xl text-gray-700 hover:text-green-600"
          >
            Contact
          </a>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg">
            <Lock className="w-5 h-5" />
            Log in
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-gray-200 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Empowering Lives Through Health
            </h1>
            <p className="text-gray-600 text-lg">
              Navigating health together. Your Trusted Medical Resource.
            </p>
            <button
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: "#B3C8FF" }}
            >
              <Phone className="w-5 h-5" />
              Book an Appointment
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div
              className="w-full max-w-md h-80 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#E1F3CB" }}
            >
              <div className="text-center">
                <Stethoscope className="w-32 h-32 text-green-500 mx-auto mb-4" />
                <div className="w-24 h-24 bg-green-200 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Section */}
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
              <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition">
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
              <div className="w-12 h-12 bg-green-300 rounded-full -ml-4"></div>
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
                  stroke="#10b981"
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

      {/* Services Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Comprehensive Medical Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Cardiology Card */}
          <div className="bg-gray-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Cardiology</h3>
            <p className="text-gray-600 text-sm">
              Navigating health Together Your Trusted Medical Resource Medicine
              Meets Technology Your Choice Health Hub.
            </p>
          </div>

          {/* Dentistry Card */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#E1F3CB" }}
          >
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
              <Stethoscope className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Dentistry</h3>
            <p className="text-gray-600 text-sm">
              Navigating health Together Your Trusted Medical Resource Medicine
              Meets Technology Your Choice Health Hub.
            </p>
          </div>

          {/* Neurology Card */}
          <div className="bg-gray-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Neurology</h3>
            <p className="text-gray-600 text-sm">
              Navigating health Together Your Trusted Medical Resource Medicine
              Meets Technology Your Choice Health Hub.
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition">
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
          <button className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition">
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-300/40 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-gray-600 tracking-wide text-sm">
            Made by{" "}
            <span className="font-medium text-gray-800">Aditya Karanwal</span>{" "}
            and{" "}
            <span className="font-medium text-gray-800">Prakkhar Prassun</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
