import { Heart } from "lucide-react";

function Header() {
  return (
    <header className="container mx-auto px-6 py-6 flex items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800">Medi3Buddy</span>
      </div>
    </header>
  );
}

export default Header;
