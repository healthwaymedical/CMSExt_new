import {
    DB_FULL_DATE_FORMAT,
    DB_FULL_DATE_TIMEZONE_Z,
  } from './../constants/app.constants';
  import * as moment from 'moment';
  
  export interface Appointment {
    id: string;
    patientId: string;
    startDate:string;
    clinicId: string;
    preferredDoctor: string;
    referringDoctorId: string;
    referringClinicId: string;
    purposeOfVisit: string;
    remarks: string;
    reminderDate: Date;
    visitDate: Date;
    duration: number;
    status: string;
    patientName: string;
    userId: UserId;
    gender: string;
    dob: string;
  
  
    contactNumber: ContactNumber;
    emailAddress: string;
    address: Address;
    patientSources: any;
    paymentReference?: string;
    idType?:string;
    name?:string;
    idNumber?:string;
    patientIdentifier?:string;
    phoneType?:string;
    phoneNumber?:string;
    preRegistration:PreRegistration
  }
  
  export interface UserId {
    idType: string;
    number: string;
  }
  
  export function createUserId(idType?: string, number?: string): UserId {
    return <UserId>{
      idType: idType || '',
      number: number || '',
    };
  }
  
  export interface Address {
    address: string;
    country: string;
    postalCode: string;
  }
  
  export interface ContactNumber {
    number: string;
  }
  
  export interface PreRegistration {
    purposeOfVisit: string;
    clinicCode: string;
    type: string;
    expectedArrivalTime: string;
  
  }
  
  
  export class DoctorColorMap {
    doctorId: string;
    color: string;
  
    constructor(doctorId: string, color: string) {
      this.doctorId = doctorId || '';
      this.color = color || '';
    }
  
    getDoctorId() {
      return this.doctorId;
    }
  
    setDoctorId(id) {
      this.doctorId = id;
    }
  
    getColor() {
      return this.color;
    }
  
    setColor(color) {
      this.color = color;
    }
  }
  
  export class DoctorAvailableSlots {
    doctorId: string;
    dateTimeSlots: Array<DateTimeSlots>;
  
    constructor(doctorId: string, dateTimeSlots: Array<DateTimeSlots>) {
      this.doctorId = doctorId || '';
      this.dateTimeSlots =
        dateTimeSlots === undefined ? new Array<DateTimeSlots>() : dateTimeSlots;
    }
  
    getDoctorId() {
      return this.doctorId;
    }
  
    getTimeSlotsByDate(date) {
      let timeSlotFound = this.dateTimeSlots.find(
        (dateTimeSlot: DateTimeSlots) => {
          console.log('date; ', date);
          return dateTimeSlot.getDate() === date;
        }
      );
  
      if (timeSlotFound !== undefined) {
        return timeSlotFound.getAvailableTimeSlots();
      } else {
        return new Array<string>();
      }
    }
  }
  export class DateTimeSlots {
    date: string;
    availableTimeSlots: Array<string>;
  
    constructor(date?: string, availableTimeSlots?: Array<string>) {
      this.date = date || '';
      this.availableTimeSlots =
        availableTimeSlots === undefined
          ? new Array<string>()
          : availableTimeSlots;
    }
  
    getDate() {
      return this.date;
    }
  
    getAvailableTimeSlots() {
      return this.availableTimeSlots;
    }
  }
  
  export class CustomisedApptInput {
    preferredDoctor: string;
    purposeOfVisit: string;
    reminderDate: Date;
    visitDate: Date;
    dob: string;
    remarks: string;
  
    constructor(
      preferredDoctor: string = '',
      purposeOfVisit = '',
      reminderDate = null,
      visitDate = null,
      dob = '',
      remarks = ''
    ) {
      this.preferredDoctor = preferredDoctor;
      this.purposeOfVisit = purposeOfVisit;
      this.reminderDate = this.convertDateTimeStringToDateObject(reminderDate);
      this.visitDate = this.convertDateTimeStringToDateObject(visitDate);
      this.remarks = remarks;
      this.dob = dob;
    }
  
    convertDateTimeStringToDateObject(dateTime) {
      if (dateTime instanceof Date) {
        return dateTime;
      } else {
        return new Date(
          moment(dateTime, DB_FULL_DATE_FORMAT).format(DB_FULL_DATE_TIMEZONE_Z)
        );
      }
    }
  }
  