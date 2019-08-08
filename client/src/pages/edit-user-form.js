import React from "react";
import axios from "axios";

import UserForm from "../components/user-form";

export default function EditUserForm({ match, history, users, refetch }) {
  const { id } = match.params;
  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return <p>No user found with that ID</p>;
  }

  return (
    <UserForm
      {...user}
      onSubmit={async values => {
        try {
          await axios.put(`http://localhost:4000/api/users/${id}`, values);
          refetch();
          history.push("/");
        } catch (e) {
          console.error(e.message);
        }
      }}
    />
  );
}
