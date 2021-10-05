import { Subject, Subscription } from "rxjs";

const emittersMap = new Map<string, Subject<any>>();

export function eventEmitter(event: string, listener: (...data) => void): EventEmitter {
  return new EventEmitter(event, listener);
}

export class EventEmitter {
  private ref: Subscription;

  constructor(event: string, listener: (...data) => void) {
    let emitter = emittersMap.get(event);
    if (!emitter) {
      emitter = new Subject();
      emittersMap.set(event, emitter);
    }
    this.ref = emitter.subscribe(({ data }) => listener(...data));
  }

  destroy(): void {
    this.ref.unsubscribe();
  }

  static emit(event: string, ...data: any): void {
    eventEmitter.emit(event, ...data);
  }
}

eventEmitter.emit = (event: string, ...data: any) => {
  const eventemitter = emittersMap.get(event);
  if (eventemitter) {
    eventemitter.next({ data });
  }
};
