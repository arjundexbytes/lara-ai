export const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export function requireString(value: unknown, field: string): string {
  if (!isNonEmptyString(value)) throw new Error(`${field} is required`);
  return value.trim();
}

export function requireArray<T>(value: unknown, field: string): T[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  return value as T[];
}
