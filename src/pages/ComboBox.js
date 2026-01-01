// ComboBox.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ComboBox = ({ endpoint, value, onSelectChange, labelField, valueField }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(endpoint);
        setOptions(res.data);
      } catch (err) {
        console.error("Failed to fetch options:", err);
      }
    };
    fetchOptions();
  }, [endpoint]);

  return (
    <select value={value} onChange={(e) => onSelectChange(e.target.value)}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option[valueField]} value={option[valueField]}>
          {option[labelField]}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
