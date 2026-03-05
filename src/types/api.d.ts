export type ApiResult<T> = { data: T; message?: string };
export type Paginated<T> = { data: T[]; current_page: number; per_page: number; total: number };
