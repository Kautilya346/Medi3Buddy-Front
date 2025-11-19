import { Link } from "react-router-dom";
import docFavicon from "../assets/doc_favicon.png";

function Header() {
  return (
    <header className="container mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <img src={docFavicon} alt="Medi3Buddy logo" className="w-12 h-12" />
        </div>
        <span className="text-2xl font-bold text-gray-800">Medi3Buddy</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/doctor-register"
          className="px-4 py-2 rounded-lg border border-[#93BDF7] text-[#1F3A66] font-semibold hover:bg-[#F0F6FF] transition"
        >
          Register as Doctor
        </Link>
        <Link
          to="/patient-register"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-white to-[#93BDF7] text-[#0F1F2E] font-semibold hover:from-[#F8FBFF] hover:to-[#7CB0F3] transition"
        >
          Register as Patient
        </Link>
      </div>
    </header>
  );
}

export default Header;
