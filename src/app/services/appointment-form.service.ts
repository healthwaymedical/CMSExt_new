
//Objects
import { AppointmentValidators } from './../validators/appointmentValidators';

//Libraries
import * as moment from 'moment';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AppointmentFormService {
  private appointmentDetails: BehaviorSubject<any>;
  patientAppointmentConfirm = new Subject();
  availableTimesDropDownList = new Array<string>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.appointmentDetails = new BehaviorSubject<any>([]);
  }

  getPatientAppointmentConfirm() {
    return this.patientAppointmentConfirm.asObservable();
  }

  setPatientAppointmentConfirm() {
    this.patientAppointmentConfirm.next(true);
  }

  getDoublePatientAppointmentMsgConfirm(date) {
    let confirmMsg =
      'There is already an appointment registered for this patient on ' +
      date +
      '. Do you still want to proceed?';
    return confirm(confirmMsg);
  }



  getAvailableTimesDropDownList() {
    return this.availableTimesDropDownList;
  }

  getWithin1HourBookingConfirm(visitDate: AbstractControl) {
    const isWithin1Hour = this.within1HourBookingPeriod(visitDate);
    if (isWithin1Hour) {
      let confirmFwd = confirm(
        'The current timeslot selected is within the 1 hour booking period. Are you sure you want to proceed?'
      );
      if (confirmFwd) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  within1HourBookingPeriod(apptDate: AbstractControl) {
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

    return bookingNotValid;
  }


  createBlockedTimeFormGroup() {
    return this.fb.group({
      startDate: [new Date(), Validators.required],
      duration: [''],
      doctorId: ['', Validators.required],
      remarks: '',
    });
  }


  clickedWithinCalendar(eventInCalendar) {
    return eventInCalendar !== null ? true : false;
  }


  setMandatoryFields(appointmentForm: FormGroup) {
  
    const appointmentDate = appointmentForm.get('appointmentDate');
    const patientIdentifier = appointmentForm.get('patientIdentifier');

    // this.setRequired(name);
   this.setRequired(patientIdentifier);
    patientIdentifier.setValidators(AppointmentValidators.validateSerialHi());
  }

  setRequired(form: AbstractControl) {
    form.setValidators(Validators.required);
  }


  clearValidators(form: AbstractControl) {
    form.clearValidators();
  }

  









  setAppointmentDetails(formGroup: FormGroup) {
    this.appointmentDetails.next(formGroup);
  }

  getAppointmentDetails() {
    return this.appointmentDetails.asObservable();
  }

  appointmentIsExpired(visitDate: AbstractControl) {
    const currentDate = new Date();
    const appointmentDate = <Date>visitDate.value;
    return moment(appointmentDate).isSameOrBefore(currentDate);
  }

  withinAWindowPeriodFromCurrentTime(visitDate: AbstractControl, minutes) {
    const currentDate = new Date();
    const appointmentDate = <Date>visitDate.value;

    return (
      moment(appointmentDate).isAfter(currentDate) &&
      (appointmentDate.getTime() - currentDate.getTime()) / 60000 < minutes
    );
  }

  alertSuccessfulAppointment() {
    let msg = 'Appointment updated successfully.';
    alert(msg);
  }

}
