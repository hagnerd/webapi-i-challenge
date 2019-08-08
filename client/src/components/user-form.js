import React from "react";

export default function UserForm({ name = "", bio = "", onSubmit }) {
  const [values, setValues] = React.useState({ name, bio });

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
      />

      <label htmlFor="bio">Bio</label>
      <input
        id="bio"
        type="text"
        name="bio"
        value={values.bio}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
