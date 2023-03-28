import { useCallback, useState } from 'react';

function useFetch(initialValueData = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState(initialValueData);

  const fetchData = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        const newError = await response.json();
        throw newError.message;
      }

      const json = await response.json();
      setData(json);
    } catch (e) {
      setErrors(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, errors, data, fetchData];
}

export default useFetch;
