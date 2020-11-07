
//Objects
import { AppointmentValidators } from './../validators/appointmentValidators';

//Libraries
import * as moment from 'moment';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppointmentsFactoryService } from './appointment-factory.service';
import { AppointmentRequest } from '../requests/appointmentRequest';
import { DISPLAY_DATE_FORMAT } from '../constants/app.constants';
import { ApiAppointmentService } from './api-appointment.service';


@Injectable({
  providedIn: 'root',
})
export class AppointmentFormService {
  private appointmentDetails: BehaviorSubject<any>;
  patientAppointmentConfirm = new Subject();
  availableTimesDropDownList = new Array<string>();

  constructor(
    private fb: FormBuilder,
    private apptFactory: AppointmentsFactoryService,
    private apiAppointmentsService :ApiAppointmentService
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

  setAppointmentForApi(input, isReferral?) {
    let appointment = input;
    if (input instanceof FormGroup) {
      appointment = this.apptFactory.createAppointment(input, 'FORMGROUP');
    }
    //
    let appointmentRequest: AppointmentRequest = new AppointmentRequest(
      appointment
    );

    // Set doctor id, if any
    appointmentRequest.setDoctor(appointment.preferredDoctor);

    return appointmentRequest;
  }


  validateAppointmentCreation(appointmentsFormGroup: FormGroup) {
    let date = moment(appointmentsFormGroup.get('appointmentDate').value).format(
      DISPLAY_DATE_FORMAT
    );
    let filter = {
      CLINIC_ID_LIST: [appointmentsFormGroup.get('clinicId').value],
    };
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

}
