import { useEffect, useState } from "react";
import SelfCareCard from "./SelfCareCard";
import StepsModal from "./StepsModal";

export default function SelfCareList({ fetchUrl, onBack, isSavedView = false }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!fetchUrl) return;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, [fetchUrl]);

  // 🔍 Filter items by title
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="selfcare-page">

      {/* 🔹 Back + Search Row */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={onBack}>← Back</button>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px"
          }}
        />
      </div>

      {filteredItems.length === 0 && (
        <p style={{ marginTop: "20px" }}>No items found</p>
      )}

      <div className="selfcare-grid">
        {filteredItems.map(item => (
          <SelfCareCard
            key={item._id}
            item={item}
            isSavedView={isSavedView}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      {selected && (
        <StepsModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
