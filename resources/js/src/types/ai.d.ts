export type ChatContentType = 'text' | 'table' | 'json' | 'html' | 'document' | 'audio' | 'video';
export type ChatMessage = { id?: number | string; role: 'user' | 'assistant'; message: unknown; content_type?: ChatContentType; created_at?: string };
