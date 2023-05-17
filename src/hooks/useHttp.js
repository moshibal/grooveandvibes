import { useState } from "react";
import axios from "axios";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendHttp = async (requestConfig) => {
    setIsLoading(true);
    try {
      const response = await axios.post(requestConfig.url, requestConfig.body);
      if (response.status === 201) {
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message || "something went wrong.");
    }
  };
  return { isLoading, error, sendHttp, setError };
};

export default useHttp;
