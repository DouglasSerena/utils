export function isEmpty<T = unknown>(item: T | Array<T>): boolean {
  if (!item) {
    return true;
  }
  if (item instanceof Array) {
    return item?.length === 0;
  }
  if (typeof item === "string") {
    return item.length === 0;
  }
  if (typeof item === "number") {
    return item === 0;
  }
  return Object.keys(item)?.length === 0;
}
