import { useState, useEffect } from 'react';

export const useUrlParams = () => {
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    // Get initial params
    const urlParams = new URLSearchParams(window.location.search);
    setParams(urlParams);

    // Listen for URL changes
    const handlePopState = () => {
      const newParams = new URLSearchParams(window.location.search);
      setParams(newParams);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getParam = (key: string): string | null => {
    return params.get(key);
  };

  return { getParam, params };
};