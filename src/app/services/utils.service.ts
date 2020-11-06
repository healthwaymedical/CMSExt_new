import { RRule } from 'rrule';
import { DatePipe } from '@angular/common';
import {
  DISPLAY_DATE_TIME_NO_SECONDS_FORMAT,
  DB_FULL_DATE_FORMAT_NO_SECOND,
  DB_FULL_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  DB_FULL_DATE_TIMEZONE_Z,
} from './../constants/app.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilsService {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: FormBuilder
  ) {}

  ////////////////////////////     String Helper Functions     ////////////////////////////
  textTruncate(str: String, max: number) {
    let truncatedStr = '';
    if (str && str.length > max) {
      truncatedStr = str.substring(0, max) + '...';
      return truncatedStr;
    } else {
      return str;
    }
  }

  convertToTitleCase(data) {
    let tempString: string = data + '';
    tempString = tempString
      .split('_')
      .map(word => {
        const length = word.length;
        return (
          word.charAt(0).toUpperCase() + word.slice(1, length).toLowerCase()
        );
      })
      .join(' ');
    return tempString;
  }

  formatToE164PhoneNumber(number: string) {
    if (!number || number === '+') {
      return '';
    } else {
      return number;
    }
  }

  replaceHyphenWithSpace(str: string) {
    return str.replace('_', ' ');
  }

  convertToTitleCaseUsingSpace(data) {
    let tempString: string = data + '';

    // If data is delimiter-separated ('_')
    tempString = tempString
      .split(' ')
      .map(word => {
        const length = word.length;
        return (
          word.charAt(0).toUpperCase() + word.slice(1, length).toLowerCase()
        );
      })
      .join(' ');

    // For other naming conventions or data types in future, add accordingly
    return tempString;
  }

  round(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  ////////////////////////////    Time / Date Helper Functions      ////////////////////////////
  getDBDate(inputDate) {
    let date = moment(Date.now());
    if (inputDate) {
      date = moment(inputDate);
    }
    return date.format('DD-MM-YYYYTHH:mm:ss');
  }

  getDBDateOnly(inputDate) {
    let date = moment(Date.now());
    if (inputDate) {
      date = moment(inputDate);
    }
    return date.format('DD-MM-YYYY');
  }

  validateDates(startDate: moment.Moment, endDate: moment.Moment) {
    return startDate.isSameOrBefore(endDate, 'day');
  }

  addMinutes(startDateTime: Date, duration) {
    const endTime = new Date(startDateTime.getTime() + duration * 60000);
    return endTime;
  }

  createDateTimeString(date, time) {
    return moment(date).format(DISPLAY_DATE_FORMAT) + 'T' + time;
  }

  convertDateToTimeFormat(dateTime: Date) {
    return new DatePipe(this.locale).transform(
      dateTime,
      'DD-MM-YYYYThh:mm a',
      this.locale
    );
  }

  convertDateToTime(dateTime: Date) {
    return new DatePipe(this.locale).transform(dateTime, 'HH:mm', this.locale);
  }

  convertUnixDateToDashFormat(date) {
    return moment.unix(date).format('DD-MM-YYYY');
  }

  roundTimeUpToNearest(date: Date, minuteInterval) {
    const time = date.getTime();
    const minuteIntervalMS = minuteInterval * 60000;
    const roundedTimeMS = Math.ceil(time / minuteIntervalMS) * minuteIntervalMS;
    const roundedUpDate = new Date(roundedTimeMS);
    return roundedUpDate;
  }

  convertDateTimeStringToDateObject(dateTime: string) {
    return new Date(
      moment(dateTime, DB_FULL_DATE_FORMAT).format(DB_FULL_DATE_TIMEZONE_Z)
    );
  }

  setTime30MinAfter(startDateTime: Date = null) {
    const dateTime = startDateTime ? startDateTime : new Date();
    dateTime.setMinutes(dateTime.getMinutes() + 30);

    return dateTime;
  }

  increaseTimeByInterval(startDateTime: Date = null, minuteInterval) {
    const dateTime = startDateTime ? startDateTime : new Date();
    dateTime.setMinutes(dateTime.getMinutes() + minuteInterval);

    return dateTime;
  }

  decreaseTimeByInterval(startDateTime: Date = null, minuteInterval) {
    const dateTime = startDateTime ? startDateTime : new Date();
    dateTime.setMinutes(dateTime.getMinutes() - minuteInterval);

    return dateTime;
  }

  calculateDuration(startDateTime, endDateTime) {
    // This will give difference in milliseconds
    const difference = endDateTime.getTime() - startDateTime.getTime();
    const resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  isWithin24Hours(consultationDateTime) {
    const dayBeforeToday = moment()
      .subtract(1, 'day')
      .format(DB_FULL_DATE_FORMAT);

    const dateA = moment(
      consultationDateTime,
      DISPLAY_DATE_TIME_NO_SECONDS_FORMAT
    );
    const dateB = moment(dayBeforeToday, DISPLAY_DATE_TIME_NO_SECONDS_FORMAT);

    if (dateA.isSameOrAfter(dateB)) {
      return true;
    } else {
      return false;
    }
  }

  formatToDateTimeString(date: string, time: string) {
    if (date && date !== '') {
      return date + 'T' + time;
    } else {
      return '';
    }
  }

  getDayOfWeekForRRule(day) {
    switch (day) {
      case 'MONDAY':
        return RRule.MO;
      case 'TUESDAY':
        return RRule.TU;
      case 'WEDNESDAY':
        return RRule.WE;
      case 'THURSDAY':
        return RRule.TH;
      case 'FRIDAY':
        return RRule.FR;
      case 'SATURDAY':
        return RRule.SA;
      case 'SUNDAY':
        return RRule.SU;
    }
  }

  ////////////////////////////     Array Helper Functions      ////////////////////////////
  mapToDisplayOptions(array) {
    return array.map(data => {
      return {
        value: data,
        label: this.convertToTitleCase(data),
      };
    });
  }

  convertStringArrayToMenuOptions(array) {
    const menu = array.map(data => {
      return {
        value: data,
        label: this.convertToTitleCase(data),
      };
    });
    return menu;
  }

  mergeArray(array1, array2) {
    const resultArray = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while (len--) {
      const item = arr[len];

      if (!assoc[item]) {
        resultArray.unshift(item);
        assoc[item] = true;
      }
    }
    return resultArray.sort();
  }

  pick(obj: Object, keys): Object {
    return Object.keys(obj)
      .filter(key => keys.includes(key))
      .reduce((pickedObj, key) => {
        pickedObj[key] = obj[key];
        return pickedObj;
      }, {});
  }

  /**
   *
   * @param list Array
   * @param props keyword to groupBy
   */
  groupBy(list, props) {
    return list.reduce((a, b) => {
      (a[b[props]] = a[b[props]] || []).push(b);
      return a;
    }, {});
  }

  getPatientRegistryStartTime() {
    const todayTwelveAm = moment().startOf('day');
    const todayEnd = moment()
      .startOf('day')
      .add(2, 'hour');

    if (moment().isBetween(todayTwelveAm, todayEnd, null, '[]')) {
      return moment()
        .startOf('day')
        .subtract(1, 'day')
        .format(DB_FULL_DATE_FORMAT);
    }

    return moment()
      .startOf('day')
      .format(DB_FULL_DATE_FORMAT);
  }

  ////////////////////////////     FormGroup Helper Functions      ////////////////////////////
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

  maskText(text: string, lastDigitsToRemain: number) {
    const regex = new RegExp('\\w(?=\\w{' + lastDigitsToRemain + '})', 'gm');
    // const maskedText = text.replace(/\w(?=\w{4})/gm, '*');
    const maskedText = text.replace(regex, '*');
    return maskedText;
  }
}
