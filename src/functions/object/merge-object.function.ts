import { isEmpty } from "../../validations";

export function mergeObject(objectMerge: object, ...objects: object[]): object {
  if (!isEmpty(objects)) {
    objects.forEach((object) => {
      if (!isEmpty(object)) {
        merge(objectMerge, object);
      }
    });
  }
  return objectMerge;
}

export function merge(objectMerge: object, object: object): object {
  return Object.keys(object).reduce((prev, key) => {
    if (object[key]?.constructor === Object) {
      prev[key] = merge(objectMerge[key], object[key]);
    } else {
      prev[key] = object[key];
    }
    return prev;
  }, objectMerge || {});
}
