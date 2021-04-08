import { useState, useEffect } from 'react';

export const getJson = async (url, options = null) => {
  const response = await fetch(url, { ...options, 'method': 'GET' });
  return await response.json();
}

export const useFetch = (url, options = null) => {
  const [response, setResponse] = useState(null);
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setResponse(response);
        setJson(json);
      } catch (error) {
        setError(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { response, json, error };
};
