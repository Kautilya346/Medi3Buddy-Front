import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientPortal from "./pages/PatientPortal";
import { useUserRole } from "./hooks/useAuth";

function App() {
  const [userRole, setUserRole] = useUserRole();

  const handleSelectRole = (role) => {
    setUserRole(role);
  };

  const handleBackHome = () => {
    setUserRole(null);
  };

  return (
    <MainLayout>
      {!userRole ? (
        <LandingPage onSelectRole={handleSelectRole} />
      ) : userRole === "doctor" ? (
        <DoctorDashboard onBackHome={handleBackHome} />
      ) : (
        <PatientPortal onBackHome={handleBackHome} />
      )}
    </MainLayout>
  );
}

export default App;
