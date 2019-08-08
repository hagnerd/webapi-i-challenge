import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useFetch } from "./hooks";

import Home from "./pages/home";
import NewUserForm from "./pages/new-user-form";
import EditUserForm from "./pages/edit-user-form";

function App() {
  const { data, loading, error, refetch } = useFetch({
    url: "http://localhost:4000/api/users"
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route
          path="/new"
          render={props => <NewUserForm refetch={refetch} {...props} />}
        />
        <Route
          path="/edit/:id"
          render={props => (
            <EditUserForm
              users={data ? data.users : []}
              refetch={refetch}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          render={() => (
            <Home users={data ? data.users : []} refetch={refetch} />
          )}
        />
      </Switch>
    </>
  );
}

export default App;
