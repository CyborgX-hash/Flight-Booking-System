import { useState } from "react";
import { airports } from "../utils/airports";
import "./AirportInput.css";

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
    <div className="airport-input-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        required
      />

      {suggestions.length > 0 && (
        <div className="airport-dropdown">
          {suggestions.map((a) => (
            <div
              key={a.code}
              className="airport-dropdown-item"
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

export default AirportInput;
