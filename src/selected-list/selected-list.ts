export function selectedList<T = unknown>(): SelectedList {
  return new SelectedList<T>();
}

export class SelectedList<T = unknown> {
  private _list: T[] = [];

  get length(): number {
    return this._list.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  [Symbol.iterator](): { next: () => { value: T; done: boolean } } {
    let index = -1;
    const list = this._list;

    return {
      next: () => ({ value: list[++index], done: !(index in list) }),
    };
  }

  select(...value: T[]): number {
    return this._list.push(...value);
  }

  unselect(value: T | number): T[] {
    if (!(typeof value === "number")) {
      value = this._list.indexOf(value);
    }
    return this._list.splice(value, 1);
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    this._list = this._list.filter(predicate);
    return this._list;
  }

  map(predicate: (value: T, index: number, array: T[]) => T): T[] {
    this._list = this._list.map(predicate);
    return this._list;
  }

  forEach(predicate: (value: T, index: number, array: T[]) => T): void {
    this._list.forEach(predicate);
  }

  find(predicate: (value: T, index: number, array: T[]) => T): T | null {
    return this._list.find(predicate);
  }

  findIndex(predicate: (value: T, index: number, array: T[]) => T): number {
    return this._list.findIndex(predicate);
  }

  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */
  public clear(): T[] {
    return this._list.splice(0);
  }
}

export const isSelectedList = (prop: unknown): prop is SelectedList => prop instanceof SelectedList;
selectedList.isSelectedList = isSelectedList;
