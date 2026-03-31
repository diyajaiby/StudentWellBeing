export default function SelfCareCard({ item, onClick, isSavedView }) {

  const saveItem = async (e) => {
    e.stopPropagation();
    await fetch("http://localhost:3000/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    alert("Saved ✅");
  };

  const unsaveItem = async (e) => {
    e.stopPropagation();
    await fetch(`http://localhost:3000/api/saved/${item._id}`, {
      method: "DELETE",
    });
    alert("Removed ❌");
    window.location.reload();
  };

  return (
    <div className="selfcare-card" onClick={onClick}>
      <img
  src={`http://localhost:3000${item.image}`}
  alt={item.title}
  className="card-image"
/>

      <button onClick={isSavedView ? unsaveItem : saveItem}>
        {isSavedView ? "❌ Unsave" : "🔖 Save"}
      </button>

      <h3>{item.title}</h3>
    </div>
  );
}
