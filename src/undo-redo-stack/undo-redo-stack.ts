import { IUndoRedo } from "./undo-redo-stack.type";

export function undoRedoStack(maxAmount = 100): UndoRedoStack {
  return new UndoRedoStack(maxAmount);
}

export class UndoRedoStack {
  private _stack: IUndoRedo[] = [];

  /**
   * @private
   * @description Posição atual na pilha */
  private _current: number;

  /**
   * @private
   * @description Quantidade maxima de undo redo */
  private _maxAmount: number;

  /**
   * @public
   * @description Faz a verificação se esta fazia a pilha de refazer */
  public get isEmptyRedo(): boolean {
    return this._current >= 0 && this._current === this.length - 1;
  }

  /**
   * @public
   * @description Faz a verificação se esta fazia a pilha de desfazer */
  public get isEmpty(): boolean {
    return this._current === -1;
  }

  public get length(): number {
    return this._stack.length;
  }

  constructor(maxAmount = 100) {
    this._current = -1;
    this._maxAmount = maxAmount;
  }

  /**
   * @public
   * @description Executa de desfazer e decrementa o contador */
  public undo(): boolean {
    if (!this.isEmpty) {
      const item = this._stack[this._current];
      item.undo.call(this, item.data);
      this._current--;
      return true;
    }
    return false;
  }

  /**
   * @public
   * @description Executa de refazer e incrementa o contador caso exista um desfazer */
  public redo(): boolean {
    const item = this._stack[this._current + 1];
    if (item) {
      item.redo.call(this, item.data);
      this._current++;
      return true;
    }
    return false;
  }

  /**
   * @public
   * @description Ira fazer a adição das funções de desfazer e refazer no topo da pilha
   * e verificar se ja atingiu o máximo, caso que sim ele ira remover o item da da base da pilha */
  public push(...perform: IUndoRedo[]): number {
    if (this._maxAmount === this._current) {
      this._current--;
      this._stack.shift();
    }
    this._current++;
    this._stack.splice(this._current);

    return this._stack.push(...perform);
  }

  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */
  public clear(): IUndoRedo[] {
    return this._stack.splice(0);
  }
}

export const isUndoRedoStack = (prop: unknown): prop is UndoRedoStack =>
  prop instanceof UndoRedoStack;

undoRedoStack.isUndoRedoStack = isUndoRedoStack;
