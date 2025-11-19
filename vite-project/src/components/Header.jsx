import { Link } from "react-router-dom";
import docFavicon from "../assets/doc_favicon.png";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (
    <header className="container mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" onClick={() => navigate("/")}>
          <img src={docFavicon} alt="Medi3Buddy logo" className="w-12 h-12" />
        </div>
        <span className="text-2xl font-bold text-gray-800">Medi3Buddy</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/doctor-register"
          className="px-4 py-2 rounded-lg border border-[#1B5A4F] text-[#1B5A4F] font-semibold hover:bg-[#1B5A4F]/10 transition"
        >
          Register as Doctor
        </Link>
        <Link
          to="/patient-register"
          className="px-4 py-2 rounded-lg bg-[#93BDF7] text-black font-semibold hover:bg-[#7CB0F3] transition"
        >
          Register as Patient
        </Link>
      </div>
    </header>
  );
}

export default Header;
