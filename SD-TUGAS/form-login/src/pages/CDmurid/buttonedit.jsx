import "./buttonedit.css";

function Buttonedit({ onClick, label = "Edit Data" }) {

  return (
    <button className="button-edit" onClick={onClick}>
      {label}
    </button>
  );
}
export default Buttonedit;