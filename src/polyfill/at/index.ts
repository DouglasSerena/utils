function at(index: number): any {
  // ToInteger() abstract op
  index = Math.trunc(index) || 0;
  // Allow negative indexing from the end
  if (index < 0) index += this.length;
  // OOB access is guaranteed to return undefined
  if (index < 0 || index >= this.length) return undefined;
  // Otherwise, this is just normal property access
  return this[index];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray] as FunctionConstructor[]) {
  Object.defineProperty(C.prototype, "at", {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
