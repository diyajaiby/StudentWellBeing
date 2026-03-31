import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    counselors: 0,
  });

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/stats");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>System Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Users</p>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div className="stat-card">
          <p>Students</p>
          <h1>{stats.students}</h1>
        </div>

        <div className="stat-card">
          <p>Counselors</p>
          <h1>{stats.counselors}</h1>
        </div>
      </div>
    </div>
  );
}
