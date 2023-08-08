import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";

const useFetchData = (endpoint) => {
  // state for a fetched clocked in student
  const [data, setData] = useState([]);

  // loader state
  const [loading, setLoading] = useState(false);

  // function to make HTTP request to the server
  const fetchData = useCallback(
    () => {
      setLoading(true);
      fetch(baseUrl + endpoint)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [endpoint])

  // this helps run the fetch data when the component mounts
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    setData,
    fetchData
  };
};

export default useFetchData;
