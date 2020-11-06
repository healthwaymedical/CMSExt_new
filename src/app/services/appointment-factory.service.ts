
import {
  APPOINTMENT,
  DOCTOR_BLOCKED_TIME,
  DOCTOR_LEAVE,
  CLINIC_HOLIDAY,
  noPreferredDoctorColorCode,
  locumColorCode,
  doctorColorCode,
  DB_FULL_DATE_FORMAT_NO_SECOND,
} from './../constants/app.constants';

import { UtilsService } from './utils.service';
import { CustomisedApptInput, DoctorColorMap } from '../modals/appointment';


import { Injectable } from '@angular/core';
import {
  Appointment,
  UserId,
  ContactNumber,
  Address,
  PreRegistration
} from '../modals/appointment';
import * as moment from 'moment';


let doctorColorMap: Array<DoctorColorMap>;
@Injectable({
  providedIn: 'root',
})
export class AppointmentsFactoryService {
  constructor(
    private utilsService: UtilsService
  ) { }



 



 

  createAppointment(
    input?,
    format?,
    clinicId?
  ) {
    let appointment: Appointment = {
      id: '',
      patientId: '',
      clinicId: '',
      preferredDoctor: null,
      referringDoctorId: '',
      referringClinicId: '',
      purposeOfVisit: null,
      remarks: '',
      reminderDate: null,
      visitDate: null,
      duration: 0,
      status: 'PENDING',
      patientName: '',
      userId: <UserId>{
        idType: '',
        number: '',
      },
      gender: '',
      dob: '',
      contactNumber: <ContactNumber>{
        number: '',
      },
      emailAddress: '',
      address: <Address>{
        address: '',
        country: '',
        postalCode: '',
      },
      patientSources: {},
      idType:'',
      name:'',
      idNumber:'',
      patientIdentifier:'',
      phoneType:'',
      phoneNumber:'',
      preRegistration:<PreRegistration>{
        purposeOfVisit: '',
        clinicCode: '',
        type: '',
        expectedArrivalTime: ''
      },
    };

    if (input && format) {
      this.setValues(appointment, input, format);
    }

    return appointment;
  }

  setValues(appt: Appointment, input, format) {

   let cliniccode= localStorage.getItem('clinicCode');
    let apptValues;
    let customisedInput: CustomisedApptInput;

    if (format === 'OBJECT') {
      apptValues = Object.assign(input);
      customisedInput = new CustomisedApptInput(
        apptValues.doctorId,
        apptValues.appointmentPurpose,
        apptValues.reminderDate,
        apptValues.startDate,
        apptValues.dob,
        apptValues.remark
      );
    } else if (format === 'FORMGROUP') {
      apptValues = <Appointment>input.getRawValue();
      customisedInput = new CustomisedApptInput(
        apptValues.preferredDoctor,
        apptValues.purposeOfVisit,
        apptValues.reminderDate,
        apptValues.visitDate,
        apptValues.dob,
        apptValues.remarks,
      );
    }

    appt.id = apptValues.id;
    appt.patientId = apptValues.patientId;
    appt.clinicId = apptValues.clinicId;
    appt.preferredDoctor = customisedInput.preferredDoctor;
    appt.referringDoctorId = apptValues.referringDoctorId;
    appt.referringClinicId = apptValues.referringClinicId;
    appt.purposeOfVisit = customisedInput.purposeOfVisit;
    appt.remarks = customisedInput.remarks;
    appt.reminderDate = customisedInput.reminderDate;
    appt.visitDate = customisedInput.visitDate;
    appt.duration = apptValues.duration;
    appt.status = apptValues.status;
    appt.patientName = apptValues.patientName;
    appt.gender = apptValues.gender;
    appt.dob = apptValues.dob;
    appt.contactNumber = apptValues.contactNumber;
    appt.emailAddress = apptValues.emailAddress;
    appt.address = apptValues.address;
    appt.remarks = customisedInput.remarks;
    appt.patientSources = apptValues.patientSources;

    // Payment Reference will be provided only via online bookings
    // hence will be populated directly in appointment list and not
    // created newly from calendar
    if(apptValues.paymentReference){
      appt.paymentReference = apptValues.paymentReference;
    }

    appt.idType = apptValues.idType;
    appt.name = apptValues.name;
    appt.idNumber = apptValues.idNumber;
    appt.patientIdentifier = apptValues.patientIdentifier;
    appt.phoneType = apptValues.phoneType;
    appt.phoneNumber = apptValues.phoneNumber;
    appt.contactNumber = apptValues.contactNumber
    appt.userId.idType=apptValues.idType;
    appt.userId.number=apptValues.idNumber;
    appt.preRegistration.purposeOfVisit = "Mobile Consultation";
    appt.preRegistration.type = "APPOINTMENT";
    appt.preRegistration.clinicCode = cliniccode;
    appt.preRegistration.expectedArrivalTime = moment(customisedInput.visitDate).format(DB_FULL_DATE_FORMAT_NO_SECOND);
    
    
    

    
  console.log("form for registration", JSON.stringify(appt));
  }




  decreaseTimeByInterval(startDateTime: Date = null, minuteInterval) {
    const dateTime = startDateTime ? startDateTime : new Date();
    dateTime.setMinutes(dateTime.getMinutes() - minuteInterval);

    return dateTime;
  }

  calculateDuration(startDateTime, endDateTime) {
    var difference = endDateTime.getTime() - startDateTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  initDoctorColorMap() {
    doctorColorMap = new Array<DoctorColorMap>();
    doctorColorCode.forEach(color => {
      const map: DoctorColorMap = new DoctorColorMap('', color);
      doctorColorMap.push(map);
    });
  }


}
