import { Subject } from "rxjs";

const symbol = Symbol("eventemitter"); // just to be sure there won't be collisions
const eventemitterMap = new Map<string, Subject<any>>();

export const OnEvent = (event: string) => {
  return function (target: any, propertyKey: string) {
    target[symbol] = target[symbol] || new Map();
    target[symbol].set(propertyKey, event);
  };
};

export const EventEmitter = (constructor: any): any => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const target = constructor.prototype;

      if (!target.eventEmitterDestroy) {
        target.eventEmitterDestroy = () => {
          for (const event in target.__recycleEventemitter) {
            target.__recycleEventemitter[event].unsubscribe();
            delete target.__recycleEventemitter[event];
          }
        };
        const original = target.ngOnDestroy;
        target.ngOnDestroy = function (...args: any) {
          target.eventEmitterDestroy();
          original?.call(this, ...args);
        };
      }

      const eventemitter = target[symbol];

      if (!target.__recycleEventemitter) {
        target.__recycleEventemitter = {};
      }

      if (eventemitter) {
        eventemitter.forEach((event: string, method: string) => {
          let eventemitter = eventemitterMap.get(event);
          if (!eventemitter) {
            eventemitter = new Subject();
            eventemitterMap.set(event, eventemitter);
          }
          target.__recycleEventemitter[event] = eventemitter.subscribe(({ data }: any) => {
            (this as any)[method](...data);
          });
        });
      }
    }
  };
};

DEventEmitter.emit = (event: string, ...data: any) => {
  const eventemitter = eventemitterMap.get(event);
  if (eventemitter) {
    eventemitter.next({ data });
  }
};
