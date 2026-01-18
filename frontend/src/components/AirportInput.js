import { useState } from "react";
import { airports } from "../utils/airports";

const AirportInput = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = airports.filter(
      (a) =>
        a.city.toLowerCase().includes(value.toLowerCase()) ||
        a.code.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSelect = (airport) => {
    setQuery(`${airport.city} (${airport.code})`);
    setSuggestions([]);
    onSelect(airport.code); // IMPORTANT
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        required
      />

      {suggestions.length > 0 && (
        <div style={styles.dropdown}>
          {suggestions.map((a) => (
            <div
              key={a.code}
              style={styles.item}
              onClick={() => handleSelect(a)}
            >
              {a.city} – {a.name} ({a.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    border: "1px solid #ccc",
    background: "#fff",
    zIndex: 10,
  },
  item: {
    padding: "8px",
    cursor: "pointer",
  },
};

export default AirportInput;
