export interface IUndoRedo {
  undo(data?: unknown): void;
  redo(data?: unknown): void;
  data?: unknown;
}
