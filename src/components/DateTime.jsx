import React from "react";

const DateTime = ({ value, onChange, className = "" }) => {
  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#037389] 
                  focus:border-[#037389] ${className}`}
    />
  );
};

export default DateTime;