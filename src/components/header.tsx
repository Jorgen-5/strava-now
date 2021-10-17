import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";

function Header() {
  return (
    <div>
      <div className="py-2 shadow ">
        <ul className="menu items-stretch px-1 horizontal ">
          <li>
            <Link to={"/"}> Home </Link>
          </li>
          <li>
            <Link to={"/data"}> Workouts </Link>
          </li>
        </ul>
      </div>
      <div className="h-3"></div>
    </div>
  );
}

export default Header;
