import { DB_FULL_DATE_FORMAT_NO_SECOND } from './../constants/app.constants';
import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import * as moment from 'moment';
// Array Validators
export class AppointmentValidators {
  public static validateAppointmentTime(
    apptDate: AbstractControl
  ): ValidatorFn {
    return (control: AbstractControl) => {
      const date = apptDate.value;
      const appointmentNotValid = moment(date).isSameOrBefore(moment());

      if (appointmentNotValid) {
        return {
          appointmentTimeNotValid: {
            value: control.value,
          },
        };
      } else {
        return null;
      }
    };
  }

  public static validateBookingPeriod(apptDate: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      const appointmentDate = <Date>apptDate.value;
      const bookingDate = new Date();
      const bookingPeriodInMinutes = 60;
      const userActionBufferTime = 0;
      const finalBookingPeriodInMinutes =
        bookingPeriodInMinutes - userActionBufferTime;

      let bookingNotValid = false;
      bookingNotValid =
        moment(appointmentDate).isAfter(bookingDate) &&
        (appointmentDate.getTime() - bookingDate.getTime()) / 60000 <
          finalBookingPeriodInMinutes
          ? true
          : false;
      if (bookingNotValid) {
        return {
          appointmentBookingPeriodNotValid: {
            value: control.value,
          },
        };
      } else {
        return null;
      }
    };
  }

  public static validateReminderTime(apptDate: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      const reminderDateTime = <Date>control.value;
      const appointmentDate = <Date>apptDate.value;
      const reminderPeriodInMinutes = 60;

      const reminderTimeBeyondPeriod =
        moment(reminderDateTime, DB_FULL_DATE_FORMAT_NO_SECOND).isAfter(
          appointmentDate
        ) ||
        (appointmentDate.getTime() - reminderDateTime.getTime()) / 60000 <
          reminderPeriodInMinutes
          ? true
          : false;

      const reminderTimeBeforeToday = moment(
        reminderDateTime,
        DB_FULL_DATE_FORMAT_NO_SECOND
      ).isBefore(new Date())
        ? true
        : false;
      if (reminderTimeBeyondPeriod) {
        return {
          reminderDateTimeNotValid: {
            value: control.value,
          },
        };
      } else {
        return null;
      }
    };
  }

  public static reminderTimeBeforeToday(): ValidatorFn {
    return (control: AbstractControl) => {
      const reminderDateTime = <Date>control.value;

      const reminderTimeBeforeToday = moment(
        reminderDateTime,
        DB_FULL_DATE_FORMAT_NO_SECOND
      ).isBefore(new Date())
        ? true
        : false;

      if (reminderTimeBeforeToday) {
        return {
          reminderDateTimeBeforeToday: {
            value: control.value,
          },
        };
      }
    };
  }

  public static validateDuration(): ValidatorFn {
    return (control: AbstractControl) => {
      const duration = control.value;

      const minimumPeriod = 15;

      const durationNotValid = duration < minimumPeriod ? true : false;

      if (durationNotValid) {
        return {
          durationTimeNotValid: {
            value: control.value,
          },
        };
      } else {
        return null;
      }
    };
  }

    public static validateSerialHi(): ValidatorFn {
      return (control: AbstractControl) => {
      const SerialHi = control.value;
      if (SerialHi==null || SerialHi=="" || SerialHi.length!=8 || ((SerialHi.slice(-2)!="11")&& (SerialHi.slice(-2)!="61"))) {
    
        return {
          serialHiNotValid: {
            value: control.value,
          },
        };
      } else {
   
        return null;
      }
    };
  }
}
