import { useState } from "react";
import { Menu, X, Heart, Lock } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
    </header>
  );
}

export default Header;
