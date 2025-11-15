import { useState } from 'react';
import { Menu, X, Shield, Database, Activity } from 'lucide-react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Hamburger Menu */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8">
          <a href="#home" className="text-2xl text-gray-700 hover:text-teal-600">Home</a>
          <a href="#about" className="text-2xl text-gray-700 hover:text-teal-600">About</a>
          <a href="#services" className="text-2xl text-gray-700 hover:text-teal-600">Services</a>
          <a href="#contact" className="text-2xl text-gray-700 hover:text-teal-600">Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Empowering Lives Through Health
            </h1>
            <p className="text-gray-600 text-lg">
              Revolutionizing patient care with blockchain and IoT for secure, transparent medical records
            </p>
            <button className="px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition shadow-lg">
              Get Started
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-teal-100 to-blue-100 rounded-3xl flex items-center justify-center">
              <Activity className="w-32 h-32 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">12K+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">94%</h3>
            <p className="text-gray-600">Healing Success</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">100%</h3>
            <p className="text-gray-600">Data Security</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Medical Solutions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Blockchain Security</h3>
            <p className="text-gray-600">
              Your medical records are secured with immutable blockchain technology
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">IoT Monitoring</h3>
            <p className="text-gray-600">
              Real-time health tracking through connected IoT devices
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Care</h3>
            <p className="text-gray-600">
              Round-the-clock access to your health data and medical support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;