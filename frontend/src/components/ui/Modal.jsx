import Button from "./Button";

export default function Modal({ open, title, text, onClose, actions }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title ? <h3>{title}</h3> : null}
        <p>{text}</p>
        <div className="modal-actions">
          {actions || <Button onClick={onClose}>확인</Button>}
        </div>
      </div>
    </div>
  );
}
