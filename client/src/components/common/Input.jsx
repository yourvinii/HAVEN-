import React from "react";

const Input = ({ label, type, placeholder, name, value, onChange }) => {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        className=" border border-gray-500 rounded-lg px-3 py-2 outline-none focus:outline-black"
      />
    </div>
  );
};

export default Input;
