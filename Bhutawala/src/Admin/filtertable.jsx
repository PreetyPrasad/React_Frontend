import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext"; // Import InputText for search bar

// Custom hook to debounce input value
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Main component
export default function FilterTable() {
  const [globalFilter, setGlobalFilter] = useState(""); // State for search input
  const debouncedGlobalFilter = useDebounce(globalFilter, 500); // 500ms delay for debounce

  return (
    <div className="col-md-4 offset-8 mb-2">
      <InputText
        style={{ width: "100%" }}
        type="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search Categories"
        className="form-control"
        // Apply the debounced global filter
      />
    </div>
  );
}
