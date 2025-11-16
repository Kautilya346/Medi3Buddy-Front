// API service for backend integration
// Replace with your actual backend URL

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Doctor APIs
export const doctorAPI = {
  // Get all patients
  getPatients: () => apiCall("/api/doctor/patients"),

  // Get patient by ID
  getPatientById: (id) => apiCall(`/api/doctor/patients/${id}`),

  // Search patients
  searchPatients: (query) =>
    apiCall(`/api/doctor/patients/search?q=${query}`),

  // Add notes to patient
  addNotes: (patientId, notes) =>
    apiCall(`/api/doctor/patients/${patientId}/notes`, {
      method: "POST",
      body: JSON.stringify({ notes }),
    }),
};

// Patient APIs
export const patientAPI = {
  // Get patient's own records
  getRecords: () => apiCall("/api/patient/records"),

  // Add new medical record
  addRecord: (recordData) =>
    apiCall("/api/patient/records", {
      method: "POST",
      body: JSON.stringify(recordData),
    }),

  // Update medical record
  updateRecord: (recordId, recordData) =>
    apiCall(`/api/patient/records/${recordId}`, {
      method: "PUT",
      body: JSON.stringify(recordData),
    }),

  // Delete medical record
  deleteRecord: (recordId) =>
    apiCall(`/api/patient/records/${recordId}`, {
      method: "DELETE",
    }),

  // Get patient profile
  getProfile: () => apiCall("/api/patient/profile"),

  // Update patient profile
  updateProfile: (profileData) =>
    apiCall("/api/patient/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

// Auth APIs (for future use)
export const authAPI = {
  // Doctor login
  doctorLogin: (email, password) =>
    apiCall("/api/auth/doctor/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Patient login
  patientLogin: (email, password) =>
    apiCall("/api/auth/patient/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Logout
  logout: () =>
    apiCall("/api/auth/logout", {
      method: "POST",
    }),
};
