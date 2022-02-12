import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserContext from "./contexts/userContext";
import { useState } from "react";
import { getUser } from "./api/user";
import PatientForm from "./components/forms/PatientForm";

function App() {
  const [user, setUser] = useState({ user: getUser() });

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <ToastContainer className={"z-50"} autoClose={5000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="statistics" element={null} />
          <Route path="hospitals" element={null}>
            <Route path="public" element={null} />
            <Route path="private" element={null} />
          </Route>
          <Route path="monitor-hospitals" element={null} />
          <Route path="monitor-patients" element={<PatientForm />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
