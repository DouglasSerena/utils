import { validate } from "../../validations";

export function mergeObject<T = unknown>(objectMerge: unknown, ...objects: unknown[]): T {
  if (validate(objects).isFill()) {
    objects.forEach((object) => {
      if (validate(object).isFill()) {
        merge(objectMerge, object);
      }
    });
  }
  return objectMerge as T;
}

export function merge(objectMerge: unknown, object: unknown): unknown {
  return Object.keys(object).reduce((prev, key) => {
    if (validate(object[key]).isObject() && validate(object[key].name).isUndefined()) {
      prev[key] = merge(prev[key], object[key]);
    } else {
      prev[key] = object[key];
    }
    return prev;
  }, objectMerge || {});
}
