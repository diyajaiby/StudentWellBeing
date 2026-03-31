import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import SelfCareList from "../components/SelfCareList";
import "../selfcare.css";

export default function SelfCareHome() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 FETCH categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // 🔖 SAVED VIEW
  if (showSaved) {
    return (
      <SelfCareList
        fetchUrl="http://localhost:3000/api/saved"
        isSavedView
        onBack={() => setShowSaved(false)}
      />
    );
  }

  // 📂 CATEGORY VIEW
  if (selectedCategory) {
    return (
      <SelfCareList
        fetchUrl={`http://localhost:3000/api/selfcare?category=${selectedCategory}`}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  // 🔍 SEARCH FILTER
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="selfcare-page">
      
      <h2 className="selfcare-title">🌸 Self Care</h2>

      {/* 🔥 TOP CONTROLS */}
      <div className="top-controls">
        
        <button
          className="saved-btn"
          onClick={() => setShowSaved(true)}
        >
          📌 Saved
        </button>

        <input
          type="text"
          placeholder="Search categories..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* 🔥 CATEGORY GRID */}
      <div className="category-grid">
        {filteredCategories.map(cat => (
          <CategoryCard
            key={cat._id}
            label={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
          />
        ))}
      </div>

    </div>
  );
}