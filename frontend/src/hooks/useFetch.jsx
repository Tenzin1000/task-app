import { useEffect, useReducer, useState } from "react";
import { fetchReducer, INITIAL_STATE } from "./fetchReducer";
export default function useFetch(url) {
  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);
  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    async function fetchData() {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        const processedData = responseJson.map(item => ({
          ...item,
          fullName: `${item.first_name} ${item.last_name}`,
          active: item.active === "1",
        }));
        dispatch({ type: "FETCH_SUCCESS", payload: processedData });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    }
    fetchData();
  }, [url]);
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
}
