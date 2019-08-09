import React from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import Title from "../components/title";

export default function Home({ users, refetch }) {
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      refetch();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <Title>Home Page</Title>
      <ul className="max-w-3xl w-10/12 mx-auto flex flex-col items-center">
        {users.map(user => (
          <li
            className="w-full flex flex-col shadow-md items-center bg-gray-200 my-3 py-5"
            key={user.id}
          >
            <p className="uppercase text-xl font-sans">{user.name}</p>
            <p>{user.bio}</p>
            <div className="flex justify-end w-full px-4">
              <Link to={`/edit/${user.id}`}>
                <FaEdit className="mx-4 text-green-500 hover:text-green-600" />
              </Link>
              <FaTrash
                className="mx-4 text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() => handleDelete(user.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
