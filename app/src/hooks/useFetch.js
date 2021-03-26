import { useState, useEffect } from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchHelper(url, options);
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    })();
  });

  return { response, error };
};

export const fetchHelper = async (url, options) => {
  const response = await fetch(url, options);
  return await response.json();
};
