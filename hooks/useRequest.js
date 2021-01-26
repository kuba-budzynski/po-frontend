import {useState} from "react";

const DEFAULT_ERROR = 'Przepraszamy, operacja nie powiodła się. Prosimy spróbować ponownie poźniej.';

const useRequest = (promise = async () => {}) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = (...args) =>
    new Promise(async (resolve, reject) => {
      if (isLoading) return;

      setLoading(true)
      setError(null)
      try {
        const data = await promise(...args);
        resolve(data);
      } catch (e) {
        const errorMessage = (e?.response?.data?.message ?? e?.message) || DEFAULT_ERROR;
        reject(errorMessage);
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    });

  return [request, { isRequestLoading: isLoading, requestError: error }];
};

export default useRequest;
