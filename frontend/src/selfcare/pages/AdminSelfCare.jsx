import { useEffect, useState } from "react";
import "./AdminSelfCare.css";
import StepsModal from "../components/StepsModal";

export default function AdminSelfCare() {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    title: "",
    image: null,   // ✅ FIXED
    category: "",
    steps: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {

    fetch("http://localhost:3000/api/selfcare")
      .then(res => res.json())
      .then(data => setItems(data));

    fetch("http://localhost:3000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  // ================= CATEGORY =================

  const addCategory = async () => {

    if (!newCategory) {
      alert("Enter category name");
      return;
    }

    await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newCategory })
    });

    setNewCategory("");
    fetchData();
  };

  const deleteCategory = async (id) => {

    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "DELETE"
    });

    fetchData();
  };

  // ================= DELETE SELFCARE =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this item?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/selfcare/${id}`, {
      method: "DELETE"
    });

    fetchData();
  };

  // ================= SAVE =================

  const handleSave = async () => {

  if (!form.title || !form.category) {
    alert("Please fill required fields");
    return;
  }

  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("category", form.category);
  formData.append(
    "steps",
    JSON.stringify(form.steps.split(",").map(s => s.trim()))
  );

  if (form.image) {
    formData.append("image", form.image);
  }

  // ✅ DEBUG
  console.log("SENDING DATA...");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  let res;

  if (editingId) {
    res = await fetch(`http://localhost:3000/api/selfcare/${editingId}`, {
      method: "PUT",
      body: formData
    });
  } else {
    res = await fetch("http://localhost:3000/api/selfcare", {
      method: "POST",
      body: formData
    });
  }

  // ✅ CHECK RESPONSE
  const data = await res.json();
  console.log("RESPONSE:", data);

  setEditingId(null);

  setForm({
    title: "",
    image: null,
    category: "",
    steps: ""
  });

  fetchData();
};
  // ================= EDIT =================

  const handleEdit = (item) => {

    setEditingId(item._id);

    setForm({
      title: item.title,
      image: null,   // ✅ VERY IMPORTANT FIX
      category: item.category,
      steps: item.steps.join(", ")
    });
  };

  const cancelEdit = () => {

    setEditingId(null);

    setForm({
      title: "",
      image: null,
      category: "",
      steps: ""
    });
  };

  // ================= FILTER =================

  const filteredItems = items
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item =>
      filterCategory ? item.category === filterCategory : true
    );

  // ================= UI =================

  return (

    <div className="admin-container">

      <h1 className="admin-title">SelfCare Admin Dashboard</h1>

      {/* CATEGORY */}

      <div className="card">

        <h2>Add Category</h2>

        <div className="row">

          <input
            type="text"
            placeholder="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button className="btn-primary" onClick={addCategory}>
            Add
          </button>

        </div>

        <div style={{ marginTop: "20px" }}>

          <h3>Existing Categories</h3>

          {categories.map(cat => (

            <div key={cat._id} className="list-item">

              <span>{cat.name}</span>

              <button
                className="btn-delete"
                onClick={() => deleteCategory(cat._id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* ADD / EDIT */}

      <div className="card">

        <h2>{editingId ? "Edit SelfCare" : "Add New SelfCare"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        {/* ✅ IMAGE PREVIEW */}
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            style={{ width: "120px", marginTop: "10px" }}
            alt="preview"
          />
        )}

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >

          <option value="">Select Category</option>

          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}

        </select>

        <textarea
          placeholder="Steps (comma separated)"
          value={form.steps}
          onChange={(e) =>
            setForm({ ...form, steps: e.target.value })
          }
        />

        <div style={{ display: "flex", gap: "10px" }}>

          <button className="btn-success" onClick={handleSave}>
            {editingId ? "Update SelfCare" : "Add SelfCare"}
          </button>

          {editingId && (
            <button className="btn-delete" onClick={cancelEdit}>
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* LIST */}

      <div className="card">

        <h2>All SelfCare Items</h2>

        <div className="filter-bar">

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

        </div>

        {filteredItems.map(item => (

          <div key={item._id} className="list-item">

            <div>
              <strong>{item.title}</strong>
              <span className="category-tag">{item.category}</span>
            </div>

            <div>

              <button onClick={() => setSelectedItem(item)}>View</button>

              <button onClick={() => handleEdit(item)}>Edit</button>

              <button onClick={() => handleDelete(item._id)}>Delete</button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {selectedItem && (
        <StepsModal
          data={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </div>
  );
}