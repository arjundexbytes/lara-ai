import { useState } from 'react';
import { apiService } from '@/src/api/apiService';

export function useAIQuery() {
  const [loading, setLoading] = useState(false);

  const query = async (prompt: string, conversationId: string) => {
    setLoading(true);
    try {
      return await apiService.askAI(prompt, conversationId);
    } finally {
      setLoading(false);
    }
  };

  return { loading, query };
}
