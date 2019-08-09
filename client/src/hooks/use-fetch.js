import React from "react";
import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "REQUEST_START": {
      return {
        ...state,
        isLoading: true
      };
    }
    case "REQUEST_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    }
    case "REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

export default function useFetch({ verb = "get", url, payload, options } = {}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [fetchCount, setFetchCount] = React.useState(0);

  React.useEffect(() => {
    axios[verb](url, payload, options)
      .then(res => {
        dispatch({ type: "REQUEST_SUCCESS", payload: res.data });
      })
      .catch(err => {
        const payload = err.response && err.response.data;
        console.log(payload);
        dispatch({ type: "REQUEST_FAILURE" });
      });
  }, [options, payload, url, verb, fetchCount]);

  return {
    data: state.data,
    loading: state.isLoading,
    error: state.error,
    refetch: () => setFetchCount(c => c + 1)
  };
}
