import "./buttonedit.css";

function Buttonedit({ onClick, label = "Edit Data" }) {

  return (
    <div className="tomboledit">
      <button className="button-edit" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
export default Buttonedit;