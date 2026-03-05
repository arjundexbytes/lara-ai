import React from 'react';
import { useFetch } from '@/src/hooks/useFetch';
import { apiService } from '@/src/api/apiService';
import Card from '@/src/components/cards/Card';

export default function UserProfile({ id }: { id: number }) {
  const { data } = useFetch(() => apiService.userProfile(id), [id]);
  return <Card><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
