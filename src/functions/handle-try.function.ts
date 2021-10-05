import { firstValueFrom, Observable } from "rxjs";

export async function handleTry<T = unknown>(
  promise: Promise<T> | Observable<T>
): Promise<[T | null, any | null]> {
  try {
    if (promise instanceof Observable) {
      promise = firstValueFrom(promise);
    }
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
