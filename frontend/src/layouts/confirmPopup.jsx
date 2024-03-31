export default function ConfirmPopup({
  title = "Confirm",
  description = "Are you sure you want to confirm?",
  theme = "primary",
  onCancel = () => {},
  onConfirm = () => {},
}) {
  return (
    <div className="confirm-popup">
      <div className="title">{title}</div>
      <p className="description">{description}</p>

      <div className="buttons">
        <button className="btn" onClick={onCancel} autoFocus>
          Cancel
        </button>

        <button className={"btn btn--" + theme} onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
