import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  htmlFor,
  id,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
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
