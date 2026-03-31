import { useEffect, useState } from "react";
import "./CategoryGrid.css";

export default function CategoryGrid({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched categories:", data);
        setCategories(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="category-card"
          onClick={() => onSelect(cat.name)}
        >
          {cat.image && (
            <img
              src={`http://localhost:5173${cat.image}`}
              alt={cat.name}
              className="category-image"
            />
          )}
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
