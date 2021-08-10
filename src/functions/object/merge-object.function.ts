import { isFill, isObject, isUndefined } from "../../validations/common/common.validation";

export function mergeObject<T = unknown>(objectMerge: unknown, ...objects: unknown[]): T {
  if (isFill(objects)) {
    objects.forEach((object) => {
      if (isFill(object)) {
        merge(objectMerge, object);
      }
    });
  }
  return objectMerge as T;
}

export function merge(objectMerge: unknown, object: unknown): unknown {
  return Object.keys(object).reduce((prev, key) => {
    if (isObject(object[key]) && isUndefined(object[key].name)) {
      prev[key] = merge(prev[key], object[key]);
    } else {
      prev[key] = object[key];
    }
    return prev;
  }, objectMerge || {});
}
