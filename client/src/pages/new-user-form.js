import React from "react";
import axios from "axios";

import UserForm from "../components/user-form";

export default function NewUserForm({ refetch, history }) {
  return (
    <div className="mx-auto md:w-full lg:w-1/2">
      <UserForm
        formTitle="Create User Form"
        submitText="Create User"
        onSubmit={async values => {
          try {
            await axios.post("http://localhost:4000/api/users", values);
            refetch();
            history.push("/");
          } catch (e) {
            console.error(e.message);
          }
        }}
      />
    </div>
  );
}
