import { isUndefined } from "../validations";

export async function handleTry<T = any>(
  promise: Promise<T> | any
): Promise<[T | null, any | null]> {
  try {
    const _ = promise.toPromise();
    if (!isUndefined(_)) {
      promise = promise.toPromise();
    }
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
