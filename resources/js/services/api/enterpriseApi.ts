import apiClient from './client';

const ensureNonEmpty = (value: string, field: string): string => {
  const normalized = String(value || '').trim();
  if (!normalized) throw new Error(`${field} is required`);
  return normalized;
};


export const enterpriseApi = {
  getSystemStatus: () => apiClient.get('/system/status').then((r) => r.data),
  getDashboardMetrics: () => apiClient.get('/dashboard/metrics').then((r) => r.data),
  getAnalytics: () => apiClient.get('/analytics').then((r) => r.data),
  getHorizonMetrics: () => apiClient.get('/horizon/metrics').then((r) => r.data),
  askAi: (payload: { query: string; format: string; conversation_id: string }) => {
    const query = ensureNonEmpty(payload.query, 'query');
    const conversation_id = ensureNonEmpty(payload.conversation_id, 'conversation_id');

    return apiClient.post('/ai-v2/query', { ...payload, query, conversation_id }).then((r) => r.data);
  },

  getUsers: (params: Record<string, unknown>) => apiClient.get('/users', { params }).then((r) => r.data),
  getUserProfile: (id: number | string, params: Record<string, unknown> = {}) => apiClient.get(`/users/${id}/profile`, { params }).then((r) => r.data),
  deleteUser: (id: number | string) => apiClient.delete(`/users/${id}`).then((r) => r.data),
  assignUserPermissions: (id: number | string, permissions: string[]) => apiClient.post(`/users/${id}/permissions`, { permissions }).then((r) => r.data),

  getRoles: (params: Record<string, unknown>) => apiClient.get('/roles', { params }).then((r) => r.data),
  createRole: (name: string) => apiClient.post('/roles', { name: ensureNonEmpty(name, 'name') }).then((r) => r.data),
  deleteRole: (id: number | string) => apiClient.delete(`/roles/${id}`).then((r) => r.data),
  syncRolePermissions: (id: number | string, permissions: string[]) => apiClient.post(`/roles/${id}/permissions`, { permissions }).then((r) => r.data),

  getPermissions: (params: Record<string, unknown>) => apiClient.get('/permissions', { params }).then((r) => r.data),
  createPermission: (name: string) => apiClient.post('/permissions', { name: ensureNonEmpty(name, 'name') }).then((r) => r.data),
  deletePermission: (id: number | string) => apiClient.delete(`/permissions/${id}`).then((r) => r.data),

  getProducts: (params: Record<string, unknown>) => apiClient.get('/products', { params }).then((r) => r.data),
  getOrders: (params: Record<string, unknown>) => apiClient.get('/orders', { params }).then((r) => r.data),
  getDocuments: (params: Record<string, unknown>) => apiClient.get('/documents', { params }).then((r) => r.data),
  getChats: (params: Record<string, unknown>) => apiClient.get('/chats', { params }).then((r) => r.data),


  getVectorDatabases: () => apiClient.get('/vector-databases').then((r) => r.data),
  getCampaigns: (params: Record<string, unknown>) => apiClient.get('/campaigns', { params }).then((r) => r.data),
  getUploads: (params: Record<string, unknown>) => apiClient.get('/uploads', { params }).then((r) => r.data),
  uploadFile: (formData: FormData) => apiClient.post('/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  deleteUpload: (id: number | string) => apiClient.delete(`/uploads/${id}`).then((r) => r.data),
  createCampaign: (payload: { name: string; status: string; description?: string; metadata?: Record<string, unknown> }) => apiClient.post('/campaigns', payload).then((r) => r.data),
  updateCampaign: (id: number | string, payload: { name: string; status: string; description?: string; metadata?: Record<string, unknown> }) => apiClient.put(`/campaigns/${id}`, payload).then((r) => r.data),
  deleteCampaign: (id: number | string) => apiClient.delete(`/campaigns/${id}`).then((r) => r.data),

  getSettings: () => apiClient.get('/settings').then((r) => r.data),
  updateSettings: (payload: { ai_provider: string; vector_driver: string; rag_top_k: number; active_vector_db: string; llm_provider: string }) => apiClient.put('/settings', payload).then((r) => r.data),
};
