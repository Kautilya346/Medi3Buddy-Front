import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import DoctorLogin from '../pages/DoctorLogin';
import DoctorDashboard from '../pages/DoctorDashboard';
import PatientLogin from '../pages/PatientLogin';
import PatientPortal from '../pages/PatientPortal';
import DoctorRegister from '../pages/DoctorRegister';
import PatientRegister from '../pages/PatientRegister';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'doctor-login',
        element: <DoctorLogin />,
      },
      {
        path: 'doctor-register',
        element: <DoctorRegister />,
      },
      {
        path: 'doctor',
        element: <DoctorDashboard />,
      },
      {
        path: 'patient-login',
        element: <PatientLogin />,
      },
      {
        path: 'patient-register',
        element: <PatientRegister />,
      },
      {
        path: 'patient',
        element: <PatientPortal />,
      },
    ],
  },
]);

export default router;
