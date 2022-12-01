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
import SetupInterceptors from "./api/SetupInterceptors";
import api from "./api/api";
import WindowContext from "./contexts/windowContext";
import ProvincialAdmins from "./pages/ProvincialAdmins";
import Provinces from "./pages/Provinces";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Requests from "./pages/Requests";

function NavigateFunctionComponent(props) {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (api.interceptors.response.handlers.length === 0) {
      SetupInterceptors(navigate, location);
    }
  }, []);
  return <></>;
}

function App() {
  const [user, setUser] = useState(() => {
    if (!getUser()) {
      return {};
    }

    return getUser();
  });
  const [windowWidth, setWindowWidth] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (Object.keys(user).length === 0) {
    //   navigate("/login");
    //   return;
    // }
    // if ((user?.role === 0 || user?.role === 3) && location.pathname === "/") {
    //   navigate("/dashboard/statistics");
    // } else if (user?.role === 1 && location.pathname === "/") {
    //   navigate("/dashboard/monitor-patients");
    // } else if (user?.role === 2 && location.pathname === "/") {
    //   navigate("/dashboard/monitor-hospital");
    // }
  }, [user]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <div
      dir="rtl"
      className="overflow-y-hidden font-droid-kufi bg-light min-h-screen"
    >
      <NavigateFunctionComponent />
      <WindowContext.Provider value={{ width: windowWidth }}>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <ToastContainer
            className={"z-50"}
            rtl
            autoClose={4000}
            position={"top-center"}
          />
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
              <Route path="states" element={<Provinces />} />
              <Route path="state-admins" element={<ProvincialAdmins />} />
              <Route path="requests" element={<Requests />} />
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

            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </WindowContext.Provider>
    </div>
  );
}

export default App;
