export function selectedList(): SelectedList {
  return new SelectedList();
}

export class SelectedList<T = unknown> extends Array<T> {
  get isEmpty(): boolean {
    return this.length === 0;
  }

  constructor() {
    super();
  }

  select(...value: T[]): number {
    return super.push(...value);
  }

  unselect(value: T | number): T[] {
    if (!(typeof value === "number")) {
      value = this.indexOf(value);
    }
    return super.splice(value, 1);
  }

  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */
  public clear(): void {
    this.splice(0);
  }
}

export const isSelectedList = (prop: unknown): prop is SelectedList => prop instanceof SelectedList;
selectedList.isSelectedList = isSelectedList;
