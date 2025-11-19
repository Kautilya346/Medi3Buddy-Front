// API service for backend integration
// Replace with your actual backend URL

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Doctor APIs
export const doctorAPI = {
  // Get all patients for a doctor
  getAllPatients: (doctorId) => apiCall("/api/get-all-patients", {
    method: "POST",
    data: { doctorId },
  }),

  // Get medical history for a patient
  getMedicalHistory: (patientId) => apiCall("/api/get-medical-history", {
    method: "POST",
    data: { patientId },
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
