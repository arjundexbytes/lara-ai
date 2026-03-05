import { useEffect, useState } from 'react';

export function useFetch<T>(loader: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loader().then((v) => mounted && setData(v)).catch(() => mounted && setError('Request failed')).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, deps);

  return { data, error, loading, setData };
}
