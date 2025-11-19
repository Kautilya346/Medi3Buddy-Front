import { useRef, useState } from "react";

function AddReportModal({ isOpen, onClose, onSubmit, isUploading }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0] ?? null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      await onSubmit(file);
      setFile(null);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to upload file");
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isUploading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#1B5A4F]">
            Add Report
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            Upload Medical Document
          </h2>
          <p className="text-sm text-gray-500">
            Share lab results, prescriptions, or any supporting files.
          </p>
        </div>

        <div
          className="border-2 border-dashed border-[#93BDF7] rounded-2xl p-6 text-center cursor-pointer hover:bg-[#F8FBFF] transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
          />
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[#1B5A4F]">
              {file ? file.name : "+ Add Report"}
            </div>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, JPG, PNG, DOC (max 10 MB)
            </p>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="flex-1 py-3 rounded-lg font-semibold bg-[#1B5A4F] text-white hover:bg-[#15473F] transition disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReportModal;

