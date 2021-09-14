export function selectedList<T = unknown>(): SelectedList {
  return new SelectedList<T>();
}

export class SelectedList<T = unknown> {
  public list: T[] = [];

  get length(): number {
    return this.list.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  [Symbol.iterator](): { next: () => { value: T; done: boolean } } {
    let index = -1;
    const list = this.list;

    return {
      next: () => ({ value: list[++index], done: !(index in list) }),
    };
  }

  select(...value: T[]): number {
    return this.list.push(...value);
  }

  unselect(value: T | number): T[] {
    if (!(typeof value === "number")) {
      value = this.list.indexOf(value);
    }
    return this.list.splice(value, 1);
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    this.list = this.list.filter(predicate);
    return this.list;
  }

  map(predicate: (value: T, index: number, array: T[]) => T): T[] {
    this.list = this.list.map(predicate);
    return this.list;
  }

  forEach(predicate: (value: T, index: number, array: T[]) => T): void {
    this.list.forEach(predicate);
  }

  find(predicate: (value: T, index: number, array: T[]) => T): T | null {
    return this.list.find(predicate);
  }

  findIndex(predicate: (value: T, index: number, array: T[]) => T): number {
    return this.list.findIndex(predicate);
  }

  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */
  public clear(): T[] {
    return this.list.splice(0);
  }
}

export const isSelectedList = (prop: unknown): prop is SelectedList => prop instanceof SelectedList;
selectedList.isSelectedList = isSelectedList;
