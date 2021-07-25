export function getNode<T = unknown>(object: unknown, keys: string[] | string): T {
  if (typeof keys === "string") {
    keys = keys?.split(".");
  }
  keys = keys?.filter((key) => key);

  if (keys?.length === 0) {
    return object as T;
  }

  const key = keys[0];
  keys?.shift();

  if (keys?.length === 0) {
    return object?.[key];
  } else {
    return getNode(object?.[key], keys);
  }
}
