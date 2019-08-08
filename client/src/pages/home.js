import React from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <p>{user.name}</p>
          <p>{user.bio}</p>
          <Link to={`/edit/${user.id}`}>
            <FaEdit color="green" />
          </Link>
          <FaTrash
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(user.id)}
          />
        </li>
      ))}
    </ul>
  );
}
