import "./StepsModal.css";

export default function StepsModal({ data, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card large" onClick={e => e.stopPropagation()}>

        <button className="close-icon" onClick={onClose}>✕</button>

        <h2 className="modal-title">{data.title}</h2>

        <img
  src={`http://localhost:3000${data.image}`}
  className="modal-image"
/>
       

        <h3 className="steps-title">🌸 Steps</h3>

        <div className="steps-scroll">
          <ul>
            {data.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
