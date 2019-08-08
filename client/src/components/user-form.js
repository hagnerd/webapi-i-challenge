import React from "react";

function Input(props) {
  return (
    <input
      className="border border-green-600 bg-green-200 text-green-800 shadow-md py-1 px-2"
      {...props}
    />
  );
}

function Label({ children, ...props }) {
  return (
    <label
      className="uppercase mt-2 text-gray-800 font-medium tracking-wide text-sm"
      {...props}
    >
      {children}
    </label>
  );
}

export default function UserForm({
  name = "",
  bio = "",
  onSubmit,
  submitText = "Submit",
  formTitle
}) {
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
    <>
      <h1 className="text-center my-4 text-2xl font-sans text-gray-800">
        {formTitle}
      </h1>
      <form
        className="flex flex-col shadow w-full items-center bg-gray-200 py-8"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />

        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          type="text"
          name="bio"
          value={values.bio}
          onChange={handleChange}
        />
        <button
          className="bg-green-200 border border-green-600 py-1 px-3 my-6 hover:bg-green-400 text-gray-800"
          type="submit"
        >
          {submitText}
        </button>
      </form>
    </>
  );
}
