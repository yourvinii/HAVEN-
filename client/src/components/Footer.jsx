import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          © 2026 KDRent. All rights reserved.
        </p>

        <p className="text-sm text-gray-500">
          Find a place that feels like home.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

