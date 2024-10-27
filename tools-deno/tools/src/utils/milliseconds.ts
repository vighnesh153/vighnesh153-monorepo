const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;
const weekInMs = dayInMs * 7;
const yearInMs = dayInMs * 365;
const leapYearInMs = dayInMs * 366;

export interface MillisecondsFromProps {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  years?: number;
  leapYears?: number;
}

/**
 * Converts the time to milliseconds
 *
 * @param from
 */
export function milliseconds(from: MillisecondsFromProps | number): number {
  if (typeof from === "number") {
    return from;
  }
  let millisecondsCount = 0;
  millisecondsCount += from.milliseconds ?? 0;
  millisecondsCount += (from.seconds ?? 0) * secondInMs;
  millisecondsCount += (from.minutes ?? 0) * minuteInMs;
  millisecondsCount += (from.hours ?? 0) * hourInMs;
  millisecondsCount += (from.days ?? 0) * dayInMs;
  millisecondsCount += (from.weeks ?? 0) * weekInMs;
  millisecondsCount += (from.years ?? 0) * yearInMs;
  millisecondsCount += (from.leapYears ?? 0) * leapYearInMs;
  return millisecondsCount;
}
