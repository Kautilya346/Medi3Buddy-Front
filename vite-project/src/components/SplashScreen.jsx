function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5FAFF] to-white px-6">
      <div className="text-center space-y-8">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#1B5A4F] to-[#2D7A6B] flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#93BDF7] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#1B5A4F]/60 font-medium">
            Healthcare Platform
          </p>
          <h1 className="text-5xl font-bold text-[#1B5A4F] tracking-tight">
            Medi3Buddy
          </h1>
        </div>

        {/* Loading indicator */}
        <div className="space-y-3">
          <div className="flex justify-center gap-1.5">
            <div
              className="w-2 h-2 bg-[#1B5A4F] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#1B5A4F] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#1B5A4F] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Initializing secure connection...
          </p>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
