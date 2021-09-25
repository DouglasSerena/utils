export function coerceArray<T = unknown>(params: T | T[]): T[] {
  return Array.isArray(params) ? params : [params];
}
