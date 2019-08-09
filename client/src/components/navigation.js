import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-green-200 w-full">
      <ul className="flex justify-around mx-auto py-3 items-center max-w-6xl w-full">
        <li>
          <Link
            className="text-green-800 font-semibold cursor-pointer hover:text-green-900"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="text-green-800 font-semibold cursor-pointer hover:text-green-900"
            to="/new"
          >
            New
          </Link>
        </li>
      </ul>
    </nav>
  );
}
