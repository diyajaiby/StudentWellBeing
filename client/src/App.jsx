import { Routes, Route } from "react-router-dom";

import Dashboard from "./modules/moodjournal/components/Dashboard";
import MoodTracker from "./modules/moodjournal/components/MoodTracker";
import MoodHistory from "./modules/moodjournal/components/MoodHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/mood" element={<MoodTracker />} />
      <Route path="/history" element={<MoodHistory />} />
    </Routes>
  );
}

export default App;