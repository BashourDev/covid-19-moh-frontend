import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserContext from "./contexts/userContext";
import { useEffect, useState } from "react";
import { getUser } from "./api/user";
import PatientForm from "./components/forms/PatientForm";
import Patients from "./pages/Patients";
import Hospitals from "./pages/Hospitals";
import HospitalForm from "./components/forms/HospitalForm";
import HospitalReports from "./pages/HospitalReports";
import HospitalReportForm from "./components/forms/HospitalReportForm";
import AllReports from "./pages/AllReports";
import Statistics from "./pages/Statistics";

function App() {
  const [user, setUser] = useState(() => {
    if (!getUser()) {
      return {};
    }

    return getUser();
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
      return;
    }
    if (user?.role === 0 && location.pathname === "/") {
      navigate("/dashboard/statistics");
    } else if (user?.role === 1 && location.pathname === "/") {
      navigate("/dashboard/monitor-patients");
    } else if (user?.role === 2 && location.pathname === "/") {
      navigate("/dashboard/monitor-hospitals");
    }
  }, [user]);

  return (
    <div className="overflow-y-hidden">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <ToastContainer className={"z-50"} rtl autoClose={5000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="statistics" element={<Statistics />} />
            <Route path="hospitals">
              <Route path="public" element={<Hospitals />} />
              <Route path="private" element={<Hospitals />} />
              <Route path="add" element={<HospitalForm />} />
              <Route path="edit/:hid" element={<HospitalForm />} />
            </Route>
            <Route path="reports" element={<AllReports />} />
            <Route path="monitor-hospital" element={<HospitalReports />} />
            <Route
              path="monitor-hospital/add"
              element={<HospitalReportForm />}
            />
            <Route path="monitor-patients" element={<Patients />} />
            <Route path="monitor-patients/add" element={<PatientForm />} />
            <Route
              path="monitor-patients/complete/:pid"
              element={<PatientForm />}
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
