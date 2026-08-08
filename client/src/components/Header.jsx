import React from "react";
import { Link } from "react-router-dom";
import {FaSearch} from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between max-w-7xl mx-auto  items-center py-3">
        <div>
          <Link to={"/"} className="font-bold text-sm sm:text-2xl ">
            Real<span className="text-slate-600">Estate</span>
          </Link>
        </div>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search...."
            className=" bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch className="text-slate-600"/>
        </form>
        <div className="flex gap-5 font-semibold text-lg mr-5">
          <Link className=" text-slate-600 hidden sm:inline hover:underline" to={"/"}>Home</Link>
          <Link className=" text-slate-600 hidden sm:inline hover:underline" to={"/about"}>About</Link>
          <Link className=" text-slate-600 hover:underline" to={"/sign-in"}>Sign In</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
