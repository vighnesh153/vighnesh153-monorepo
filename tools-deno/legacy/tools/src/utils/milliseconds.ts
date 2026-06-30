const millis_in_one = /* @__PURE__ */ {
  second: 1000,
  get minute() {
    return this.second * 60;
  },
  get hour() {
    return this.minute * 60;
  },
  get day() {
    return this.hour * 24;
  },
  get week() {
    return this.day * 7;
  },
  get year() {
    return this.day * 365;
  },
  get leap_year() {
    return this.day * 366;
  },
};

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
  millisecondsCount += (from.seconds ?? 0) * millis_in_one.second;
  millisecondsCount += (from.minutes ?? 0) * millis_in_one.minute;
  millisecondsCount += (from.hours ?? 0) * millis_in_one.hour;
  millisecondsCount += (from.days ?? 0) * millis_in_one.day;
  millisecondsCount += (from.weeks ?? 0) * millis_in_one.week;
  millisecondsCount += (from.years ?? 0) * millis_in_one.year;
  millisecondsCount += (from.leapYears ?? 0) * millis_in_one.leap_year;
  return millisecondsCount;
}
