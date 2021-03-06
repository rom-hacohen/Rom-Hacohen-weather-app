import { useState } from "react"

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) throw new Error('Request failed!');

      const data = await response.json();
      applyData(data);
    }
    catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }

  return {
    isLoading,
    sendRequest,
    error
  };
};

export default useHttp