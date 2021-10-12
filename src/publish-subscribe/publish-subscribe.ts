import { Observable, Subject } from "rxjs";
import { Global } from "../global/global";

Global.defined("PUBLISH_SUBSCRIBE", new Map<string, Subject<any>>());

export function onEvent<T = unknown>(event: string): Observable<T> {
  const publish = Global.get("PUBLISH_SUBSCRIBE").get(event);
  if (!publish) {
    Global.get("PUBLISH_SUBSCRIBE").set(event, new Subject());
  }
  return Global.get("PUBLISH_SUBSCRIBE").get(event);
}
export function publish(event: string, data: { [key: string]: any }): void {
  const publish = Global.get("PUBLISH_SUBSCRIBE").get(event);
  if (publish) {
    publish.next(data);
  }
}
