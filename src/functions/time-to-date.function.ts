import * as dayjs from "dayjs";
import { REGEX_TIME } from "./../regex/time.regex";

export function timeToDate(time: string): string {
  if (time) {
    const validTime = time.match(REGEX_TIME) !== null;

    return validTime
      ? dayjs().format(`YYYY-MM-DDT${time}Z`)
      : dayjs().format(`YYYY-MM-DDTHH:mm:ssZ`);
  }
  return time;
}
