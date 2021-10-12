import { isUndefined } from "../validations/common/common.validation";

export async function handleTry<T = unknown>(
  promise: Promise<T> | any
): Promise<[T | null, any | null]> {
  try {
    const _ = promise?.toPromise;
    if (!isUndefined(_)) {
      promise = promise.toPromise?.();
    }
    const data = (await promise) as T;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
