import { Search } from "lucide-react";
import "./searchbar.css";

const SearchBar = ({ value, onChange, placeholder = "Cari..." }) => {
  return (
    <div className="searchbar-wrapper">
      <Search size={20} className="searchbar-icon" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
