import { useEffect, useState } from "react";
import SelfCareCard from "../components/SelfCareCard";

export default function SavedContent() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/selfcare/saved?userId=1")
      .then(res => res.json())
      .then(setSaved);
  }, []);

  return (
    <div className="selfcare-grid">
      {saved.map(item => (
        <SelfCareCard
          key={item._id}
          {...item}
          saved={true}
        />
      ))}
    </div>
  );
}
