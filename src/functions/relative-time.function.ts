import _relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(_relativeTime);

export function relativeTime(
  value: string | Date | dayjs.Dayjs,
  time: "last" | "future" = "future"
): string {
  value = dayjs(value);
  if (time === "future") {
    return dayjs(Date.now()).to(value);
  }
  return dayjs(value).to(Date.now());
}
