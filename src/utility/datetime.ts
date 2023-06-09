import * as Dayjs from 'dayjs';
import * as Utc from 'dayjs/plugin/utc';
import * as Timezone from 'dayjs/plugin/timezone';
import * as IsoWeek from 'dayjs/plugin/isoWeek';
import * as Duration from 'dayjs/plugin/duration';

Dayjs.extend(IsoWeek);
Dayjs.extend(Utc); // timezone dependent on utc plugin
Dayjs.extend(Timezone);
Dayjs.extend(Duration);

type DateTimeUnit = Dayjs.ManipulateType;

export const T_DATE = 'YYYY-MM-DD';
export const T_DATETIME = 'YYYY-MM-DD HH:mm:ss';

export class DateTime {
  private dayjs: Dayjs.Dayjs;

  constructor(date?: string | Date | number | Dayjs.Dayjs) {
    this.dayjs = Dayjs(date);
  }

  format(template = '') {
    return this.dayjs.format(template);
  }

  add(v: number, unit?: DateTimeUnit) {
    const dayjs = this.dayjs.add(v, unit);

    return new DateTime(dayjs);
  }

  toDate(): Date {
    return this.dayjs.toDate();
  }

  tz(timezone = 'Asia/Taipei') {
    return this.dayjs.tz(timezone);
  }
}
