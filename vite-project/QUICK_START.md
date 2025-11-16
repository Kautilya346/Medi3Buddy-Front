# 🚀 Quick Start Guide - Medi3Buddy

## What's New in v1.0?

Your project has been completely restructured with a professional folder organization and clean component separation!

## 📂 New Folder Structure

```
src/
├── components/    → Reusable components (Header, Footer, RoleSelector)
├── pages/         → Full-page components (Landing, Doctor, Patient)
├── layouts/       → Layout wrapper (MainLayout)
├── hooks/         → Custom React hooks (useAuth, useForm, useFetch)
├── services/      → API integration (api.js)
├── utils/         → Helper functions (helpers.js)
└── styles/        → CSS and styling
```

## ✨ Features Implemented

### 🔷 Doctor Dashboard
- View list of all patients
- Search patients by name or email
- Click patient to see detailed records
- View medical history
- Add notes to patients

### 🟢 Patient Portal
- Add new medical records
- Track vital signs (BP, Blood Sugar, HR, etc.)
- Edit existing records
- Delete old records
- View all records in one place

### 🎯 Landing Page
- Role selection (Doctor or Patient)
- Beautiful role cards with descriptions
- Why Choose Medi3Buddy section
- Services overview
- Responsive design

## 🎮 How to Use

### Starting the App
```bash
npm run dev
```

### Step 1: Choose Your Role
- Click "I'm a Doctor" → View patient records
- Click "I'm a Patient" → Manage your health

### Step 2: Interact with Dashboard
**For Doctors:**
1. View patient list on the left
2. Click patient to view their records
3. Add notes if needed

**For Patients:**
1. Click "Add Record" button
2. Fill in date, type, value, and notes
3. Click "Add Record"
4. Manage records (edit/delete)

### Step 3: Return to Home
Click "Back to Home" button to switch roles

## 🔌 Backend Integration (Next Steps)

Replace mock data with real API calls:

### Doctor API Example:
```javascript
import { doctorAPI } from './services/api';

// Get real patients from backend
const patients = await doctorAPI.getPatients();
```

### Patient API Example:
```javascript
import { patientAPI } from './services/api';

// Add real record to backend
await patientAPI.addRecord({
  date: '2024-11-15',
  type: 'Blood Pressure',
  value: '120/80',
  notes: 'Normal'
});
```

## 📝 Key Files to Modify

1. **`src/services/api.js`** - Update API endpoints with your backend URL
2. **`src/pages/DoctorDashboard.jsx`** - Replace mockPatients with API call
3. **`src/pages/PatientPortal.jsx`** - Replace localStorage with API calls
4. **`.env`** - Set your backend URL

## 🎨 Tailwind Configuration

Tailwind CSS v4 is already configured with:
- Responsive utilities
- Custom fonts (TT Firs Neue)
- Proper color scheme
- Grid and flexbox layouts

## 🔐 LocalStorage Management

User's role is saved in localStorage:
```javascript
// Automatically saved/loaded via useUserRole hook
const [userRole, setUserRole] = useUserRole();
```

## 🧪 Testing Tips

1. **Test Doctor Flow:**
   - Select "I'm a Doctor" role
   - Search for patients
   - Click patients to view records

2. **Test Patient Flow:**
   - Select "I'm a Patient" role
   - Add some test records
   - Try editing and deleting
   - Refresh page (records persist!)

3. **Test Responsive:**
   - Use DevTools (F12)
   - Toggle device toolbar
   - Test on mobile, tablet, desktop

## 📚 Useful Utilities

### Date Formatting:
```javascript
import { formatDate, formatDateTime } from './utils/helpers';
formatDate('2024-11-15'); // "Nov 15, 2024"
```

### Validation:
```javascript
import { isValidEmail, isValidPhoneNumber } from './utils/helpers';
```

### LocalStorage:
```javascript
import { setLocalData, getLocalData, removeLocalData } from './utils/helpers';
```

## 🎯 Development Tips

1. **Hot Module Replacement** - Changes auto-reload in browser
2. **ESLint** - Run `npm run lint` to check code quality
3. **Component Props** - All components accept clean props, easy to test
4. **Reusable Components** - Header, Footer, RoleSelector are plug-and-play

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Tailwind Classes Not Working
- Make sure you're using Tailwind v4 syntax
- Check tailwind.config.js content paths
- Restart dev server after config changes

## 📞 Need Help?

Check these files for examples:
- **Component Structure** → `src/components/Header.jsx`
- **Page Setup** → `src/pages/LandingPage.jsx`
- **API Integration** → `src/services/api.js`
- **Custom Hooks** → `src/hooks/useAuth.js`
- **Utilities** → `src/utils/helpers.js`

---

**You're all set! Happy building! 🚀**
