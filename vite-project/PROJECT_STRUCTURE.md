# Medi3Buddy - Medical Records Management Platform

A modern healthcare application that allows doctors to view patient medical records and patients to manage their own health data.

## 🎯 Features

### For Doctors:
- ✅ View list of all patients
- ✅ Search patients by name or email
- ✅ Access patient medical records
- ✅ View detailed patient information
- ✅ Add notes to patient records

### For Patients:
- ✅ Add new medical records
- ✅ Edit existing records
- ✅ Delete records
- ✅ View medical history
- ✅ Track health metrics
- ✅ Health tips and recommendations

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Header.jsx          # Navigation header
│   ├── Footer.jsx          # Footer component
│   └── RoleSelector.jsx    # Role selection cards
├── pages/                  # Full page components
│   ├── LandingPage.jsx    # Home page with role selection
│   ├── DoctorDashboard.jsx # Doctor's main interface
│   └── PatientPortal.jsx   # Patient's main interface
├── layouts/                # Layout wrappers
│   └── MainLayout.jsx      # Main layout wrapper
├── hooks/                  # Custom React hooks
│   └── useAuth.js         # Authentication and state management
├── services/               # API integration
│   └── api.js             # API client and endpoints
├── utils/                  # Utility functions
│   └── helpers.js         # Helper functions and validators
├── styles/                 # CSS files
│   └── (future styling)
├── App.jsx                # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Medi3Buddy
```

## 📚 API Integration

The `services/api.js` file contains pre-configured API endpoints:

### Doctor APIs:
- `doctorAPI.getPatients()` - Get all patients
- `doctorAPI.getPatientById(id)` - Get patient details
- `doctorAPI.searchPatients(query)` - Search patients
- `doctorAPI.addNotes(patientId, notes)` - Add doctor notes

### Patient APIs:
- `patientAPI.getRecords()` - Get patient's records
- `patientAPI.addRecord(data)` - Add new medical record
- `patientAPI.updateRecord(id, data)` - Update record
- `patientAPI.deleteRecord(id)` - Delete record
- `patientAPI.getProfile()` - Get patient profile
- `patientAPI.updateProfile(data)` - Update profile

### Auth APIs:
- `authAPI.doctorLogin(email, password)` - Doctor login
- `authAPI.patientLogin(email, password)` - Patient login
- `authAPI.logout()` - Logout

## 🎨 Technologies Used

- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool
- **Tailwind CSS 4.1.17** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS processing

## 📋 Record Types

Patients can track various health metrics:
- Blood Pressure
- Blood Sugar
- Heart Rate
- Weight
- Temperature
- Oxygen Level
- Custom records

## 🔐 Data Storage

Currently using localStorage for demo purposes. Replace with backend API calls in production.

### Local Storage Keys:
- `userRole` - Stores the user's role (doctor/patient)
- Other data managed through API calls

## 📱 Responsive Design

- ✅ Mobile-friendly interface
- ✅ Tablet optimized
- ✅ Desktop experience
- ✅ Responsive navigation

## 🛣️ Routing & Navigation

- Landing Page (role selection)
- Doctor Dashboard (view patients and records)
- Patient Portal (manage personal records)
- Back to home available from any page

## 🚧 Future Enhancements

- [ ] User authentication system
- [ ] Real backend integration
- [ ] Data export (PDF/CSV)
- [ ] Appointment booking
- [ ] Prescription management
- [ ] Lab results integration
- [ ] Telemedicine features
- [ ] Notifications system
- [ ] Dark mode
- [ ] Multi-language support

## 📞 Support

Made by:
- **Aditya Karanwal**
- **Prakkhar Prassun**

## 📄 License

This project is private. All rights reserved.

---

**Happy Coding! 🏥💚**
