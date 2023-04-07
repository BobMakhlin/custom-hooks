import { useCallback, useState } from "react";

export class RequestConfig {
    constructor({ method, headers, body }) {
        this.method = method ?? 'GET';
        this.headers = headers ?? {};
        this.body = body ? JSON.stringify(body) : null;
    };
}

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, config = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendRequest, isLoading, error };
};

export default useHttpRequest;
