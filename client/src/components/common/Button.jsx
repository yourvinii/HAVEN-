import React from "react";

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-black
        text-white
        rounded-lg
        px-3
        py-2
        w-auto

        ${className}
    `}
    >
      {text}
    </button>
  );
};

export default Button;
