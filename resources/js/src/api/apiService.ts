import axios from 'axios';
import { API_ENDPOINTS } from '@/src/utils/constants';
import { requireString } from '@/src/utils/validators';

const client = axios.create({ headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' } });

async function request<T>(fn: () => Promise<{ data: T }>): Promise<T> {
  try {
    const { data } = await fn();
    return data;
  } catch (error) {
    console.error('[apiService] request failed', error);
    throw error;
  }
}

export const apiService = {
  dashboard: () => request(() => client.get(API_ENDPOINTS.dashboardMetrics)),
  horizonMetrics: () => request(() => client.get('/api/horizon/metrics')),
  uploads: (params: Record<string, unknown>) => request(() => client.get('/api/uploads', { params })),
  uploadFile: (formData: FormData) => request(() => client.post('/api/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } })),
  deleteUpload: (id: number | string) => request(() => client.delete(`/api/uploads/${id}`)),
  status: () => request(() => client.get(API_ENDPOINTS.systemStatus)),
  users: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.users, { params })),
  userProfile: (id: number | string, params: Record<string, unknown> = {}) => request(() => client.get(`${API_ENDPOINTS.users}/${id}/profile`, { params })),
  roles: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.roles, { params })),
  permissions: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.permissions, { params })),
  products: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.products, { params })),
  orders: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.orders, { params })),
  documents: (params: Record<string, unknown>) => request(() => client.get(API_ENDPOINTS.documents, { params })),
  settings: () => request(() => client.get(API_ENDPOINTS.settings)),
  updateSettings: (payload: { ai_provider: string; vector_driver: string; rag_top_k: number }) => request(() => client.put(API_ENDPOINTS.settings, payload)),
  askAI: (query: string, conversationId: string) => request(() => client.post(API_ENDPOINTS.aiQuery, { query: requireString(query, 'query'), conversation_id: requireString(conversationId, 'conversation_id'), format: 'json' })),
};
