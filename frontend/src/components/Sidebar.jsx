import "./Sidebar.css";

function Sidebar({ setSection, section }) {
  return (
    <div className="sidebar">
      
      <div>
        <h2>SelfCare</h2>

        {/* ✅ ONLY THESE TWO */}

        <div
          className={`sidebar-item ${section === "selfcare" ? "active" : ""}`}
          onClick={() => setSection("selfcare")}
        >
          🌸 Self Care
        </div>

        <div
          className={`sidebar-item ${section === "adminSelfcare" ? "active" : ""}`}
          onClick={() => setSection("adminSelfcare")}
        >
          Admin SelfCare
        </div>

      </div>

      <button className="logout-btn">Logout</button>
    </div>
  );
}

export default Sidebar;