import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

import SelfCareHome from "./selfcare/pages/SelfCareHome";
import AdminSelfCare from "./selfcare/pages/AdminSelfCare";


import "./selfcare/selfcare.css";
import "./App.css";


function App() {
  const [section, setSection] = useState("selfcare");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setSection={setSection} />

      <div style={{ padding: "20px", width: "100%" }}>

        {/* USER SELFCARE */}
        {section === "selfcare" && <SelfCareHome />}

        {/* ADMIN SELFCARE */}
        {section === "adminSelfcare" && <AdminSelfCare />}

      </div>
    </div>
  );
}
export default App;
